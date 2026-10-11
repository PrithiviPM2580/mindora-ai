# Turborepo starter

This Turborepo starter is maintained by the Turborepo core team.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `@next/eslint-plugin-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended):

```sh
cd my-turborepo
turbo build
```

Without global `turbo`, use your package manager:

```sh
cd my-turborepo
npx turbo build
bun exec turbo build
bun exec turbo build
```

You can build a specific package by using a [filter](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters):

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed:

```sh
turbo build --filter=docs
```

Without global `turbo`:

```sh
npx turbo build --filter=docs
bun exec turbo build --filter=docs
bun exec turbo build --filter=docs
```

### Develop

To develop all apps and packages, run the following command:

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended):

```sh
cd my-turborepo
turbo dev
```

Without global `turbo`, use your package manager:

```sh
cd my-turborepo
npx turbo dev
bun exec turbo dev
bun exec turbo dev
```

You can develop a specific package by using a [filter](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters):

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed:

```sh
turbo dev --filter=web
```

Without global `turbo`:

```sh
npx turbo dev --filter=web
bun exec turbo dev --filter=web
bun exec turbo dev --filter=web
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended):

```sh
cd my-turborepo
turbo login
```

Without global `turbo`, use your package manager:

```sh
cd my-turborepo
npx turbo login
bun exec turbo login
bun exec turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed:

```sh
turbo link
```

Without global `turbo`:

```sh
npx turbo link
bun exec turbo link
bun exec turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turborepo.dev/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.dev/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.dev/docs/reference/configuration)
- [CLI Usage](https://turborepo.dev/docs/reference/command-line-reference)

my-mern-project/ ├── apps/ │ ├── web/ │ │ ├── src/ │ │ │ ├── components/ │ │ │ │ └── ui/ │ │ │ ├── features/ │ │ │ ├── hooks/ │ │ │ ├── layouts/ │ │ │ ├── lib/ │ │ │ ├── routes/ │ │ │ └── main.tsx │ │ ├── components.json │ │ ├── package.json │ │ └── vite.config.ts │ │ │ └── api/ │ ├── src/ │ │ ├── config/ │ │ ├── db/ │ │ ├── middleware/ │ │ ├── modules/ │ │ ├── app.ts │ │ └── server.ts │ ├── package.json │ └── tsconfig.json │ ├── packages/ │ ├── shared/ │ │ ├── src/ │ │ └── package.json │ └── config/ │ └── tsconfig.base.json │ ├── biome.json ├── package.json ├── bun.lock ├── turbo.json ├── .gitignore └── README.md This gives you a solid foundation without overengineering the project. As the application grows, you can add: packages/ui for shared shadcn components. packages/utils for genuinely shared utilities. packages/auth if authentication logic needs a reusable package. apps/admin if you introduce an admin dashboard. apps/worker if you need background jobs. One final recommendation: Since you're using shadcn/ui, consider its official monorepo setup if you already know you'll have multiple frontend apps. It scaffolds a shared UI workspace and configures the component CLI to place reusable components in the appropriate location. Otherwise, keeping shadcn components inside apps/web is perfectly reasonable. The best monorepo is not the one with the most packages. It's the one where each application owns its functionality and shared packages have clear, useful responsibilities.

express — creates the server and routes.
mongoose — connects to MongoDB.
passport — manages authentication strategies.
passport-local — authenticates using email and password.
passport-jwt — authenticates requests using JWTs.
express-session — manages login sessions.
connect-mongo — stores sessions in MongoDB.
bcryptjs — hashes passwords.
jsonwebtoken — generates JWTs.
dotenv — loads environment variables.

```table
| Model           | Purpose                                                             |
| --------------- | ------------------------------------------------------------------- |
| User            | Authentication, profile, plan/limits                                |
| Notebook        | A workspace containing sources, chats, notes, and outputs           |
| Source          | An uploaded PDF, URL, YouTube link, text, audio, etc.               |
| SourceChunk     | Small searchable pieces of a source, with vector embeddings for RAG |
| Conversation    | A chat session inside a notebook                                    |
| Message         | User/AI messages, including citations                               |
| Note            | Saved AI response or user-written note                              |
| GeneratedOutput | Study guide, briefing doc, FAQ, timeline, audio overview, etc.      |
| Collaborator    | Optional sharing/permissions for a notebook                         |
```table

3. User model

The User model stores account information and user preferences.

File: models/User.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    avatar: {
      type: String,
      default: null,
    },

    preferences: {
      theme: {
        type: String,
        enum: ["light", "dark", "system"],
        default: "system",
      },

      language: {
        type: String,
        default: "en",
      },
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    lastLoginAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);

Why do you need this model?

It allows you to:

    Register and authenticate users.
    Associate notebooks with their owners.
    Store basic user preferences.
    Control access to private notebooks and their sources.

Important: Hash passwords using bcrypt before saving them. Never store plain-text passwords.
4. Notebook model

This is one of the most important models in your application.

A notebook is the main workspace where users collect sources, ask questions, save notes, and generate AI content.

For example:

Notebook: Machine Learning Research

├── Sources
│   ├── research-paper.pdf
│   ├── machine-learning.pdf
│   └── https://example.com/ml-guide
│
├── Conversations
│   ├── What is supervised learning?
│   └── Explain neural networks.
│
├── Notes
│   └── Important ML concepts
│
└── Audio Overviews
    └── Machine Learning Discussion

File: models/Notebook.js

const mongoose = require("mongoose");

const notebookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    description: {
      type: String,
      default: "",
      maxlength: 2000,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    sources: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Source",
      },
    ],

    settings: {
      responseStyle: {
        type: String,
        enum: ["concise", "balanced", "detailed"],
        default: "balanced",
      },

      language: {
        type: String,
        default: "en",
      },
    },

    summary: {
      type: String,
      default: "",
    },

    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

notebookSchema.index({
  owner: 1,
  updatedAt: -1,
});

module.exports = mongoose.model("Notebook", notebookSchema);

Why reference sources from notebooks?

The sources field allows you to associate uploaded documents with a notebook.

However, for scalability, I recommend treating the Source collection as the authoritative record of source ownership by notebook. You can also query sources by notebookId instead of maintaining this array.

If you expect notebooks to contain many sources, I would remove the sources array from Notebook and query the Source collection directly. This avoids growing a single MongoDB document indefinitely.

The remaining models below use notebookId as the primary relationship.
5. Source model

The Source model represents every document or resource added to a notebook.

You should support multiple source types.

For example:

    PDF files
    DOCX files
    TXT files
    Website URLs
    Copied text
    Markdown documents
    YouTube transcripts, if you implement transcript extraction

A source is not just a file URL. It also needs metadata and processing information.

File: models/Source.js

const mongoose = require("mongoose");

const sourceSchema = new mongoose.Schema(
  {
    notebookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notebook",
      required: true,
      index: true,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: [
        "pdf",
        "docx",
        "txt",
        "url",
        "text",
        "markdown",
        "youtube",
      ],
      required: true,
    },

    originalName: {
      type: String,
      default: null,
    },

    mimeType: {
      type: String,
      default: null,
    },

    fileUrl: {
      type: String,
      default: null,
    },

    externalUrl: {
      type: String,
      default: null,
    },

    extractedText: {
      type: String,
      default: null,
      select: false,
    },

    contentHash: {
      type: String,
      default: null,
    },

    metadata: {
      pageCount: {
        type: Number,
        default: null,
      },

      wordCount: {
        type: Number,
        default: null,
      },

      fileSize: {
        type: Number,
        default: null,
      },

      author: {
        type: String,
        default: null,
      },
    },

    processingStatus: {
      type: String,
      enum: [
        "pending",
        "extracting",
        "chunking",
        "embedding",
        "ready",
        "failed",
      ],
      default: "pending",
    },

    processingError: {
      type: String,
      default: null,
    },

    processedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

sourceSchema.index({
  notebookId: 1,
  createdAt: -1,
});

module.exports = mongoose.model("Source", sourceSchema);

Example source document

{
  "_id": "671000000000000000000001",
  "notebookId": "671000000000000000000010",
  "uploadedBy": "671000000000000000000020",
  "title": "Introduction to Machine Learning",
  "type": "pdf",
  "originalName": "machine-learning.pdf",
  "fileUrl": "https://storage.example.com/files/ml.pdf",
  "processingStatus": "ready",
  "metadata": {
    "pageCount": 45,
    "wordCount": 12000,
    "fileSize": 2048000
  }
}

A note about document storage

For a real application, store uploaded files in object storage such as Amazon S3 or Cloudinary where appropriate.

Do not store large PDF files as ordinary fields in MongoDB.

Also, avoid embedding all extracted document text directly in the main source document. For large files, store the extracted text in object storage or another suitable storage layer and keep its reference in MongoDB.

The extractedText field above is useful for a small prototype, but it should not become the primary storage mechanism for large documents.
6. DocumentChunk model

This is the model that makes your application behave more like NotebookLM instead of a basic chatbot.

When a user uploads a PDF, your backend needs to:

    Extract the document's text.
    Divide the text into smaller chunks.
    Generate an embedding for each chunk.
    Store those chunks and their embeddings.
    Retrieve the most relevant chunks when the user asks a question.
    Give those chunks to the LLM to generate an answer.

This architecture is commonly called Retrieval-Augmented Generation (RAG).

For example, a document might be divided into:

Source: machine-learning.pdf

Chunk 1:
Introduction to machine learning...

Chunk 2:
Supervised learning is a type of machine learning...

Chunk 3:
Unsupervised learning discovers patterns...

Chunk 4:
Neural networks consist of interconnected nodes...

When the user asks, "What is supervised learning?", your backend retrieves the relevant chunks rather than sending the entire document to the LLM.

File: models/DocumentChunk.js

const mongoose = require("mongoose");

const documentChunkSchema = new mongoose.Schema(
  {
    sourceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Source",
      required: true,
      index: true,
    },

    notebookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notebook",
      required: true,
      index: true,
    },

    chunkIndex: {
      type: Number,
      required: true,
    },

    text: {
      type: String,
      required: true,
    },

    pageNumber: {
      type: Number,
      default: null,
    },

    sectionTitle: {
      type: String,
      default: null,
    },

    tokenCount: {
      type: Number,
      default: null,
    },

    embedding: {
      type: [Number],
      default: undefined,
      select: false,
    },

    metadata: {
      startOffset: {
        type: Number,
        default: null,
      },

      endOffset: {
        type: Number,
        default: null,
      },
    },
  },
  {
    timestamps: true,
  }
);

documentChunkSchema.index(
  {
    sourceId: 1,
    chunkIndex: 1,
  },
  {
    unique: true,
  }
);

documentChunkSchema.index({
  notebookId: 1,
  sourceId: 1,
});

module.exports = mongoose.model(
  "DocumentChunk",
  documentChunkSchema
);

Why is pageNumber important?

Suppose the AI responds:

    Supervised learning uses labeled training data to learn a mapping between inputs and outputs.

The user should be able to click a citation and navigate to the relevant page in the original PDF.

The pageNumber and sourceId fields help implement that feature.

For website sources, you might store a section heading or URL fragment instead.
What about the embeddings?

The schema includes an embedding field, but storing a vector in MongoDB does not automatically make semantic search work.

You need a vector search implementation, such as:

    MongoDB Atlas Vector Search.
    A dedicated vector database.
    Another retrieval system that supports similarity search.

For MongoDB Atlas Vector Search, configure an appropriate vector index and use its vector-search functionality to retrieve similar chunks.

Important: Ensure the vector index's dimensions and similarity configuration match your embedding model.

For a prototype, you can store embeddings alongside chunks. For a larger application, you should evaluate your database's vector-index limits, indexing costs, and expected document volume before settling on this design.
7. Conversation model

Users should be able to have multiple conversations within one notebook.

For example:

Notebook: Machine Learning Research

Conversations:
├── Understanding Supervised Learning
├── Neural Network Questions
└── Exam Preparation

Instead of putting every conversation directly inside the notebook document, create a separate collection.

File: models/Conversation.js

const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    notebookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notebook",
      required: true,
      index: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      default: "New conversation",
      trim: true,
    },

    isArchived: {
      type: Boolean,
      default: false,
    },

    lastMessageAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

conversationSchema.index({
  notebookId: 1,
  userId: 1,
  updatedAt: -1,
});

module.exports = mongoose.model(
  "Conversation",
  conversationSchema
);

Why separate conversations from notebooks?

Because a single notebook can have many conversations, and each conversation can contain many messages.

This structure makes it easier to:

    Display conversation history.
    Rename conversations.
    Delete individual conversations.
    Retrieve messages using pagination.
    Keep notebooks from becoming excessively large.

8. Message model

This model stores individual user questions and AI responses.

It also handles citations, which are critical for a NotebookLM-style experience.

File: models/Message.js

const mongoose = require("mongoose");

const citationSchema = new mongoose.Schema(
  {
    sourceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Source",
      required: true,
    },

    chunkId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DocumentChunk",
      default: null,
    },

    pageNumber: {
      type: Number,
      default: null,
    },

    quote: {
      type: String,
      default: null,
    },

    startOffset: {
      type: Number,
      default: null,
    },

    endOffset: {
      type: Number,
      default: null,
    },
  },
  {
    _id: true,
  }
);

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
      index: true,
    },

    notebookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notebook",
      required: true,
      index: true,
    },

    role: {
      type: String,
      enum: ["user", "assistant", "system"],
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    citations: {
      type: [citationSchema],
      default: [],
    },

    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "completed",
    },

    model: {
      type: String,
      default: null,
    },

    usage: {
      promptTokens: {
        type: Number,
        default: null,
      },

      completionTokens: {
        type: Number,
        default: null,
      },
    },

    errorMessage: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

messageSchema.index({
  conversationId: 1,
  createdAt: 1,
});

module.exports = mongoose.model("Message", messageSchema);

Example AI response with citations

{
  "conversationId": "671000000000000000000030",
  "notebookId": "671000000000000000000010",
  "role": "assistant",
  "content": "Supervised learning uses labeled data to train a model.",
  "citations": [
    {
      "sourceId": "671000000000000000000001",
      "chunkId": "671000000000000000000040",
      "pageNumber": 12,
      "quote": "Supervised learning uses labeled training examples..."
    }
  ],
  "status": "completed",
  "model": "your-selected-llm"
}

How citations should work

Your LLM should receive retrieved chunks with their source identifiers and location metadata.

For example:

const context = [
  {
    sourceId: "source123",
    chunkId: "chunk456",
    pageNumber: 12,
    text: "Supervised learning uses labeled training examples...",
  },
];

The AI generates an answer grounded in this context. Your backend then maps the model's citation references to the actual Source and DocumentChunk records.

Do not blindly trust arbitrary source IDs or page numbers generated by the model. Validate citations against the chunks you actually retrieved.

That way, users can click a citation and see the actual document passage that supports the answer.
9. Note model

A NotebookLM clone should allow users to save important information from their research.

For example:

    Personal notes.
    Important AI answers.
    Summaries.
    Study notes.
    Generated study guides.

File: models/Note.js

const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    notebookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notebook",
      required: true,
      index: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      default: "",
    },

    type: {
      type: String,
      enum: [
        "manual",
        "saved_answer",
        "summary",
        "study_guide",
        "outline",
      ],
      default: "manual",
    },

    sourceMessageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },

    sourceIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Source",
      },
    ],

    isPinned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

noteSchema.index({
  notebookId: 1,
  userId: 1,
  updatedAt: -1,
});

module.exports = mongoose.model("Note", noteSchema);

Why include sourceMessageId?

Suppose a user asks a question and receives a useful AI-generated explanation.

They click Save to Notes.

You can create a note containing that answer and associate it with the original message.

This gives you a connection between the original conversation and the saved note.
10. AudioOverview model

If you want to implement NotebookLM's podcast-style audio feature, you will need a model for generated audio files.

I recommend implementing this after your document ingestion and chat systems work.

File: models/AudioOverview.js

const mongoose = require("mongoose");

const audioOverviewSchema = new mongoose.Schema(
  {
    notebookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notebook",
      required: true,
      index: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      default: "Audio Overview",
    },

    format: {
      type: String,
      enum: ["single_speaker", "two_speakers"],
      default: "two_speakers",
    },

    status: {
      type: String,
      enum: [
        "pending",
        "generating_script",
        "generating_audio",
        "completed",
        "failed",
      ],
      default: "pending",
    },

    sourceIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Source",
      },
    ],

    script: {
      type: String,
      default: null,
    },

    audioUrl: {
      type: String,
      default: null,
    },

    durationSeconds: {
      type: Number,
      default: null,
    },

    language: {
      type: String,
      default: "en",
    },

    errorMessage: {
      type: String,
      default: null,
    },

    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

audioOverviewSchema.index({
  notebookId: 1,
  createdAt: -1,
});

module.exports = mongoose.model(
  "AudioOverview",
  audioOverviewSchema
);

Audio generation workflow

Your backend could use this workflow:

    Retrieve relevant source material.
    Generate a conversational script using an LLM.
    Generate speech using a text-to-speech service.
    Store the audio in object storage.
    Update audioUrl, durationSeconds, and status.
    Return the audio URL to the React frontend.

The database stores the audio metadata, not the audio binary itself.
11. How all the models connect

Here is the overall database relationship.

User
 │
 ├── owns ────────────────> Notebook
 │                             │
 │                             ├── contains ──> Source
 │                             │                   │
 │                             │                   └── contains ──> DocumentChunk
 │                             │
 │                             ├── contains ──> Conversation
 │                             │                   │
 │                             │                   └── contains ──> Message
 │                             │                                      │
 │                             │                                      └── citations
 │                             │                                           │
 │                             │                                           └── Source
 │                             │
 │                             ├── contains ──> Note
 │                             │
 │                             └── contains ──> AudioOverview

The primary relationships are:
Relationship	Type
User → Notebook	One-to-many
Notebook → Source	One-to-many
Source → DocumentChunk	One-to-many
Notebook → Conversation	One-to-many
Conversation → Message	One-to-many
Notebook → Note	One-to-many
Notebook → AudioOverview	One-to-many
Message → Source citations	Many-to-many conceptually

The relationships are implemented using MongoDB ObjectId references.

For larger collections, you should query the child collections using their indexed parent IDs rather than loading every related document into memory.
12. The most important part: RAG architecture

Creating the Mongoose models is only the database part.

The actual intelligence of your application comes from connecting document processing, embeddings, retrieval, and an LLM.

Here's the architecture I recommend:

                  REACT FRONTEND
                         |
                         v
                  EXPRESS API
                         |
             +-----------+-----------+
             |                       |
             v                       v
       MongoDB Atlas            File Storage
             |                       |
             |                  PDF / DOCX
             |                       |
             |                       v
             |                Text Extraction
             |                       |
             |                       v
             |                  Text Chunking
             |                       |
             |                       v
             |                   Embeddings
             |                       |
             +<----------------------+
             |
             v
        User asks a question
             |
             v
      Retrieve relevant chunks
             |
             v
       Build AI context
             |
             v
         Call the LLM
             |
             v
     Generate answer + citations
             |
             v
       Save Message to MongoDB
             |
             v
       Return answer to React

Example: What happens when a user uploads a PDF?

Suppose the user uploads machine-learning.pdf.

Your backend should:

    Create a Source document with processingStatus: "pending".
    Upload the PDF to object storage.
    Extract the PDF text.
    Split the text into manageable chunks.
    Generate embeddings for each chunk.
    Store each chunk as a DocumentChunk.
    Update the source status to "ready".

For larger documents, run these operations in a background job rather than blocking the upload request.

You can use a job queue such as BullMQ with Redis if you want reliable asynchronous processing and retry support.
Example: What happens when a user asks a question?

Suppose the user asks:

    Explain the difference between supervised and unsupervised learning.

Your backend should:

    Verify the user's access to the notebook.
    Save the user's question as a Message.
    Generate an embedding for the question.
    Search the current notebook's document chunks for relevant passages.
    Send the retrieved passages and question to your LLM.
    Generate an answer grounded in those passages.
    Associate citations with the retrieved chunks.
    Save the assistant response as a Message.
    Return the answer and citations to React.

Critical detail: Filter retrieval by the current notebook's authorized sources. Otherwise, a question in one notebook could accidentally retrieve content from another user's documents.

You should also validate notebook access on every API endpoint that reads, updates, or deletes notebook-related resources.
13. Should you create a separate Summary model?

For your initial version, I would not create a separate Summary model.

You can store a notebook-level summary in:

summary: {
  type: String,
  default: "",
}

inside Notebook.

For summaries of individual documents, you could add a field to Source:

summary: {
  type: String,
  default: "",
}

However, if you later want multiple generated summaries, versions, different summary styles, or summaries associated with particular source selections, a separate GeneratedContent model would be more appropriate.

For now, avoid creating models until you have a feature that needs them.
14. Recommended indexes

Indexes are important because you will frequently retrieve records by notebook, source, conversation, or user.

These are the main indexes to maintain:
Collection	Index	Purpose
User	email unique	Authentication
Notebook	owner, updatedAt	List notebooks by owner
Source	notebookId, createdAt	List notebook sources
DocumentChunk	sourceId, chunkIndex unique	Retrieve chunks in document order
DocumentChunk	Vector index, if applicable	Semantic retrieval
Conversation	notebookId, userId, updatedAt	List conversations
Message	conversationId, createdAt	Load chat history
Note	notebookId, userId, updatedAt	List notes
AudioOverview	notebookId, createdAt	List generated audio

Mongoose's unique: true option creates a MongoDB unique index; it is not a substitute for application-level validation. Handle duplicate-key errors appropriately.

For production, also consider compound indexes for your most common query patterns and review the query plans as your dataset grows.
15. An important improvement: support notebook sharing

If you want users to share notebooks, you should plan for that early.

Your Notebook model currently has an owner field, which works for private notebooks.

For sharing, you could add:

collaborators: [
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    role: {
      type: String,
      enum: ["viewer", "editor"],
      default: "viewer",
    },

    addedAt: {
      type: Date,
      default: Date.now,
    },
  },
],

This lets you implement:

    Viewer access: Read the notebook and its permitted content.
    Editor access: Add sources, create notes, and edit notebook content.
    Owner access: Manage collaborators and delete the notebook.

For a simple clone, you can skip this field until you need sharing.

If you later add public sharing links, represent them separately with a secure token, access permissions, expiration, and revocation controls rather than making notebooks publicly accessible by default.
16. Which models should you build first?

I would implement them in this order.
Phase 1: Basic application

Build these three models first:

    User
    Notebook
    Source

This gives you authentication, notebook creation, and document uploads.
Phase 2: AI-powered chat

Add:

    DocumentChunk
    Conversation
    Message

This is the most important phase because it enables users to ask questions about their documents.
Phase 3: NotebookLM-style productivity features

Add:

    Note
    AudioOverview

Then implement saved answers, summaries, and audio generation.
Phase 4: Advanced features

Consider adding:

    Notebook sharing and permissions.
    Source versioning.
    Background processing jobs.
    Document deduplication.
    Usage tracking and quotas.
    Generated study guides and quizzes.
    Source-level search and filtering.

You do not need to create a separate MongoDB model for every feature. Some features can be represented by fields or embedded subdocuments in existing models.
17. Final recommended database design

For your MERN NotebookLM clone, I recommend starting with these eight core models:
Model	Responsibility	Priority
User	Users and authentication	Essential
Notebook	Main workspace	Essential
Source	Uploaded documents and URLs	Essential
DocumentChunk	Text chunks and embeddings	Essential for RAG
Conversation	Chat sessions	Essential for chat history
Message	Questions, answers, and citations	Essential for chat
Note	Saved notes and answers	Useful
AudioOverview	Generated podcast-style audio	Optional initially

A few architectural decisions will make this much easier to maintain:

    Use MongoDB for application metadata and relationships.
    Use object storage for uploaded files and generated audio.
    Use a vector search system for retrieving relevant document chunks.
    Use a background worker for document extraction and embedding generation.
    Store citations as references to real sources and chunks.
    Enforce notebook permissions before every read and write operation.
    Avoid embedding unbounded arrays of messages, sources, or chunks inside a single notebook document.

One final recommendation: If you're building this as a portfolio project, focus first on the complete workflow of upload PDF → extract text → generate embeddings → ask questions → receive cited answers. Once that works reliably, the notes and audio features will be much easier to add.

That workflow is the foundation of a useful NotebookLM-style application.