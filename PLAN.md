# NotebookLM-Style MERN Clone: Data Model Plan

## Problem and proposed approach

Design the MongoDB/Mongoose data model for a NotebookLM-style knowledge workspace. The model should support uploading and processing reference sources, retrieval-augmented conversations with citations, generated artifacts and notes, sharing and permissions, subscriptions, and measurable AI/storage usage.

Use separate collections for high-volume or independently changing entities. Keep durable source metadata and extracted content separate from processing jobs and vector chunks. Store denormalized display snapshots only where they protect historical correctness (for example, citation text and subscription plan snapshots).

## Planned collections and schema responsibilities

### 1. `users`

- Identity: `email`, `emailNormalized`, `passwordHash` (nullable for OAuth-only accounts), `displayName`, `avatarUrl`
- Authentication: `authProviders[]` with provider, provider subject, and timestamps; email verification and password-reset fields
- Preferences: locale, timezone, theme, notification preferences
- Lifecycle: status (`active`, `suspended`, `deleted`), last login, created/updated timestamps
- Security: token version, failed-login counters, lockout expiry
- Indexes: unique `emailNormalized`; unique compound provider/providerSubject; status and created-at index

### 2. `workspaces`

- Tenant boundary for a user's personal or team knowledge base
- `name`, `slug`, `ownerId`, `avatarUrl`, `description`, settings, status, created/updated timestamps
- Plan-facing counters kept as cache only: notebook count, member count, storage bytes
- Indexes: owner plus updated-at; unique owner/slug; status

### 3. `workspaceMembers`

- Access control join collection between users and workspaces
- `workspaceId`, `userId`, role (`owner`, `admin`, `editor`, `viewer`), invitation status, invited email, invited by, accepted/expired timestamps
- Optional per-member notification settings
- Indexes: unique workspace/user; workspace/role; pending invitation email

### 4. `folders`

- Optional workspace organization tree
- `workspaceId`, `parentId`, `name`, `color`, `sortOrder`, created/updated timestamps
- Enforce parent and workspace consistency in service validation
- Indexes: workspace/parent/name; workspace/sortOrder

### 5. `notebooks`

- Main user-facing knowledge workspace
- `workspaceId`, `folderId`, `title`, `description`, `icon`, `coverImageUrl`, `visibility`, `status`, owner/created-by IDs
- Notebook configuration: default model, embedding model, retrieval top-K, system prompt, citation behavior
- Cached counters: source count, conversation count, note count, storage bytes
- Soft deletion and archive timestamps
- Indexes: workspace/folder/updated-at; workspace/status; text index for title/description

### 6. `notebookMembers`

- Optional notebook-level access overrides for shared notebooks
- `notebookId`, `userId`, role (`owner`, `editor`, `commenter`, `viewer`), granted by, timestamps
- Unique notebook/user index

### 7. `sources`

- One uploaded/imported reference item attached to a notebook
- `notebookId`, `workspaceId`, `type` (`file`, `url`, `text`, `youtube`, `googleDrive`, `web`), `title`, `author`, `sourceUrl`
- Storage metadata: object key, MIME type, byte size, checksum, page count, language
- Processing state (`queued`, `processing`, `ready`, `failed`, `deleted`), failure code/message, version, timestamps
- Ownership and deletion fields
- Keep raw binary data outside MongoDB (object storage); retain only references and extracted metadata
- Indexes: notebook/status; workspace/created-at; checksum per workspace; source type

### 8. `sourceContents`

- Extracted, normalized source text and structure
- `sourceId`, `sourceVersion`, pages/sections with headings and character offsets, extracted text location or compressed text reference
- Parser metadata, extraction warnings, language, token count, created-at
- One current content record per source version; older versions can be retained for reproducibility
- Indexes: source/version unique; source/created-at

### 9. `sourceChunks`

- Retrieval units generated from `sourceContents`
- `sourceId`, `notebookId`, `sourceVersion`, chunk index, text, token count, page/section reference, character offsets
- `embeddingProvider`, `embeddingModel`, `embeddingDimensions`, `embeddingVector` (or external vector-store ID), status
- Use a vector database/vector index for production-scale retrieval; MongoDB may store the chunk metadata and external vector ID
- Indexes: notebook/source/version/chunk index; source/version; external vector ID

### 10. `processingJobs`

- Async ingestion, parsing, OCR, chunking, embedding, and re-indexing jobs
- `workspaceId`, `notebookId`, `sourceId`, job type, status, priority, attempts, progress, worker ID, error details, started/completed timestamps
- Idempotency key and input source version
- Indexes: status/priority/created-at; source/status; unique active idempotency key

### 11. `conversations`

- A chat thread scoped to a notebook
- `notebookId`, `workspaceId`, `userId`, title, model settings snapshot, status, last-message timestamp, archived/deleted timestamps
- Cached message count and token totals
- Indexes: notebook/updated-at; user/updated-at; workspace/status

### 12. `messages`

- Individual user, assistant, system, or tool messages
- `conversationId`, notebook/workspace IDs, role, content parts, sequence number, parent message ID
- Generation metadata: model, provider, temperature, latency, prompt/completion tokens, finish reason, request ID
- Assistant retrieval metadata and error state
- Indexes: conversation/sequence unique; conversation/created-at; request ID

### 13. `citations`

- Evidence links attached to assistant messages
- `messageId`, `conversationId`, `sourceId`, `sourceChunkId`, source version, rank, relevance score
- Historical snapshot: quoted text, page/section label, source title, source URL
- Indexes: message/rank; source/message; notebook/source

### 14. `notes`

- User-authored notes and AI-generated study artifacts
- `notebookId`, `workspaceId`, `authorId`, type (`note`, `summary`, `studyGuide`, `faq`, `timeline`, `briefing`, `quiz`), title, structured content, markdown/plain-text representation
- Source message/conversation IDs when generated, generation metadata, version, status, pinned/archived timestamps
- Indexes: notebook/updated-at; notebook/type; author/updated-at

### 15. `noteVersions`

- Immutable history for collaborative or generated note revisions
- `noteId`, version number, content snapshot, changed by, change reason, generated-from message ID, created-at
- Unique note/version index

### 16. `invitations`

- Workspace and notebook invitations
- Target email, inviter, resource type/resource ID, proposed role, secure token hash, status, expiry, accepted-by and accepted-at
- Never store the raw invitation token
- Indexes: token hash unique; target email/status; resource/status

### 17. `subscriptions`

- Billing provider subscription state for a workspace
- `workspaceId`, provider, customer ID, subscription ID, plan ID, plan snapshot, status, billing interval, seat count
- Period start/end, cancel-at-period-end, cancellation timestamp, provider timestamps
- Unique provider subscription ID and workspace/provider indexes

### 18. `plans`

- Versioned product entitlements
- `key`, `version`, display name, currency, monthly/yearly price, feature flags, limits
- Limits include notebooks, sources, storage bytes, members, monthly AI tokens, embedding tokens, and retention
- Unique key/version index; active plan index

### 19. `usageRecords`

- Append-only metering events for billable or quota-controlled activity
- `workspaceId`, actor/user ID, subscription ID, metric (`llmInputTokens`, `llmOutputTokens`, `embeddingTokens`, `storageBytes`, `sourceCount`, `messages`, `processingMinutes`), quantity, unit, provider/model, related resource IDs
- Event timestamp, billing period, idempotency key, metadata
- Unique workspace/idempotency key; workspace/metric/period; timestamp TTL only if policy permits

### 20. `usageAggregates`

- Fast quota and billing reads, derived from usage events
- `workspaceId`, billing period, metric totals, last recalculated event timestamp, plan limit snapshot
- Unique workspace/period; period/status index

### 21. `auditLogs`

- Security and compliance trail
- Actor, workspace, action, resource type/ID, outcome, request ID, IP/user-agent hash, before/after summary, timestamp
- Append-only; do not log passwords, raw tokens, source contents, or full prompts by default
- Indexes: workspace/timestamp; actor/timestamp; resource/timestamp

### 22. `refreshTokens`

- Revocable session records
- User ID, token hash, device metadata, issued/last-used/expiry/revoked timestamps, replacement token ID
- Unique token hash; user/active expiry index

## Relationship rules

- A `workspace` owns folders, notebooks, sources, conversations, notes, billing, usage, and audit records.
- A `notebook` belongs to exactly one workspace and is the parent of sources, conversations, notes, and notebook-specific members.
- A `source` has versioned extracted content; each content version produces chunks and processing jobs.
- Messages belong to conversations; citations belong to assistant messages and point to immutable source/chunk snapshots.
- Deleting a workspace/notebook should be a service-level workflow: revoke access, cancel jobs, remove object/vector storage, then soft-delete metadata.
- All tenant-scoped reads must include `workspaceId` (and resource ownership checks); never trust client-supplied workspace membership.

## Mongoose implementation conventions

- Add `createdAt` and `updatedAt` timestamps to mutable collections.
- Use `ObjectId` references for relations; use enums and validation for statuses/roles/types.
- Use `select: false` for password hashes, token hashes, and sensitive provider fields.
- Use optimistic versioning for notes and source versions; use idempotency keys for jobs and usage events.
- Prefer soft deletion for user-visible entities and retention-aware hard deletion workers for binary/vector data.
- Keep embedding vectors out of the primary MongoDB document unless the selected vector index and document size remain appropriate.
- Validate quota-consuming operations transactionally with a usage aggregate or a reservation record to prevent race-condition overuse.

## API and migration deliverables

1. Add a shared schema/types package containing enums, DTOs, and Mongoose schemas.
2. Add indexes and validation rules listed above.
3. Implement source-ingestion job state transitions and source-version immutability.
4. Implement conversation/message/citation persistence with token and latency metering.
5. Implement workspace/notebook permission checks and invitation acceptance.
6. Implement subscription synchronization from the billing provider and plan snapshots.
7. Implement append-only usage events plus idempotent aggregation and quota checks.
8. Add seed data for development plans and a sample workspace/notebook.
9. Add schema tests for uniqueness, tenant isolation, role checks, idempotency, and soft deletion.
10. Add retention and deletion workers for object storage, vector records, refresh tokens, and audit/usage data according to policy.

## Notes and decisions

- The project repository currently uses a workspace/monorepo layout; schema code should be placed in a dedicated backend or shared package when implementation begins rather than adding models to the frontend.
- MongoDB is the system of record for metadata and text; object storage is the system of record for uploaded binaries; a vector store is recommended for embeddings.
- Billing and usage records are intentionally append-only or snapshot-based so historical invoices and quota decisions remain explainable.
- Plan limits and names must be versioned/snapshotted; changing a plan must not rewrite historical subscription or usage meaning.
- The initial implementation should not store raw OAuth secrets, invitation tokens, refresh tokens, passwords, or full sensitive prompts in logs.
