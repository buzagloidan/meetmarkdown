"use client";

import { useState } from "react";
import Link from "next/link";
import { encodeShareContent } from "@/lib/share";
import { ToolPageShell } from "@/components/shared/ToolPageShell";

type Category =
  | "Flowchart"
  | "Sequence"
  | "Class"
  | "ER Diagram"
  | "State"
  | "Gantt"
  | "Mindmap"
  | "Git";

interface Template {
  title: string;
  description: string;
  category: Category;
  code: string;
}

const templates: Template[] = [
  // ── Flowcharts ──────────────────────────────────────────────
  {
    title: "User Authentication Flow",
    description:
      "Login, registration, and password reset flow with validation and error handling paths.",
    category: "Flowchart",
    code: `flowchart TD
    Start([User visits app]) --> HasAccount{Has account?}
    HasAccount -->|Yes| Login[Enter credentials]
    HasAccount -->|No| Register[Fill registration form]

    Login --> Validate{Valid credentials?}
    Validate -->|Yes| Dashboard[Redirect to dashboard]
    Validate -->|No| Retry{Attempts < 3?}
    Retry -->|Yes| Login
    Retry -->|No| Locked[Account locked]
    Locked --> ResetFlow

    Login --> Forgot[Forgot password?]
    Forgot --> ResetFlow[Enter email]
    ResetFlow --> SendEmail[Send reset link]
    SendEmail --> NewPassword[Set new password]
    NewPassword --> Login

    Register --> ValidateForm{Valid input?}
    ValidateForm -->|No| Register
    ValidateForm -->|Yes| VerifyEmail[Send verification email]
    VerifyEmail --> Confirmed{Email confirmed?}
    Confirmed -->|Yes| Dashboard
    Confirmed -->|No| Resend[Resend email]
    Resend --> VerifyEmail`,
  },
  {
    title: "CI/CD Pipeline",
    description:
      "Build, test, and deploy pipeline with parallel jobs, staging, and production gates.",
    category: "Flowchart",
    code: `flowchart LR
    Push([Git Push]) --> Lint[Lint & Format Check]
    Push --> Unit[Unit Tests]
    Push --> Build[Build Application]

    Lint --> Gate1{All passed?}
    Unit --> Gate1
    Build --> Gate1

    Gate1 -->|No| Fail1[Notify & Fail]
    Gate1 -->|Yes| Integration[Integration Tests]
    Integration --> E2E[E2E Tests]

    E2E --> Gate2{Tests passed?}
    Gate2 -->|No| Fail2[Notify & Fail]
    Gate2 -->|Yes| DockerBuild[Build Docker Image]
    DockerBuild --> PushRegistry[Push to Registry]

    PushRegistry --> DeployStaging[Deploy to Staging]
    DeployStaging --> SmokeTest[Smoke Tests]
    SmokeTest --> Gate3{Staging OK?}
    Gate3 -->|No| Rollback[Rollback Staging]
    Gate3 -->|Yes| Approval{Manual Approval}
    Approval -->|Approved| DeployProd[Deploy to Production]
    Approval -->|Rejected| Stop([Pipeline Stopped])
    DeployProd --> Monitor[Monitor & Alert]`,
  },
  // ── Sequence Diagrams ───────────────────────────────────────
  {
    title: "REST API Request/Response",
    description:
      "Client, API gateway, backend service, and database interaction with auth and caching.",
    category: "Sequence",
    code: `sequenceDiagram
    actor Client
    participant Gateway as API Gateway
    participant Auth as Auth Service
    participant API as Backend API
    participant Cache as Redis Cache
    participant DB as PostgreSQL

    Client->>Gateway: GET /api/products?page=1
    Gateway->>Auth: Validate JWT token
    Auth-->>Gateway: Token valid (user_id: 42)

    Gateway->>API: Forward request + user context
    API->>Cache: Check cache key "products:page:1"
    alt Cache hit
        Cache-->>API: Return cached data
    else Cache miss
        API->>DB: SELECT * FROM products LIMIT 20 OFFSET 0
        DB-->>API: Return rows
        API->>Cache: SET "products:page:1" EX 300
    end

    API-->>Gateway: 200 OK { data, pagination }
    Gateway-->>Client: 200 OK { data, pagination }`,
  },
  {
    title: "OAuth 2.0 Authorization Code Flow",
    description:
      "Complete OAuth 2.0 authorization code grant with PKCE, token exchange, and refresh.",
    category: "Sequence",
    code: `sequenceDiagram
    actor User
    participant App as Client App
    participant AuthServer as Authorization Server
    participant Resource as Resource Server

    User->>App: Click "Sign in with Provider"
    App->>App: Generate code_verifier & code_challenge (PKCE)
    App->>AuthServer: GET /authorize?response_type=code<br/>&client_id=abc<br/>&redirect_uri=https://app/callback<br/>&code_challenge=xyz<br/>&scope=openid profile email

    AuthServer->>User: Show login & consent screen
    User->>AuthServer: Enter credentials & approve
    AuthServer->>App: 302 Redirect to callback?code=AUTH_CODE

    App->>AuthServer: POST /token<br/>grant_type=authorization_code<br/>&code=AUTH_CODE<br/>&code_verifier=original_verifier
    AuthServer-->>App: { access_token, refresh_token, id_token, expires_in }

    App->>Resource: GET /api/userinfo<br/>Authorization: Bearer access_token
    Resource-->>App: { sub, name, email }

    Note over App,AuthServer: When access_token expires...
    App->>AuthServer: POST /token<br/>grant_type=refresh_token<br/>&refresh_token=REFRESH_TOKEN
    AuthServer-->>App: { new access_token, new refresh_token }`,
  },
  // ── Class Diagrams ──────────────────────────────────────────
  {
    title: "E-Commerce Domain Model",
    description:
      "Product, Order, Customer, and Payment classes with relationships and methods.",
    category: "Class",
    code: `classDiagram
    class Customer {
        +String id
        +String name
        +String email
        +Address shippingAddress
        +placeOrder(items) Order
        +getOrderHistory() Order[]
    }

    class Order {
        +String id
        +Date createdAt
        +OrderStatus status
        +OrderItem[] items
        +Payment payment
        +calculateTotal() Decimal
        +cancel() void
        +ship(trackingNumber) void
    }

    class OrderItem {
        +Product product
        +int quantity
        +Decimal unitPrice
        +getSubtotal() Decimal
    }

    class Product {
        +String id
        +String name
        +String description
        +Decimal price
        +int stockQuantity
        +Category category
        +isInStock() bool
        +reserve(qty) bool
    }

    class Payment {
        +String id
        +Decimal amount
        +PaymentMethod method
        +PaymentStatus status
        +Date processedAt
        +charge() bool
        +refund() bool
    }

    class Category {
        +String id
        +String name
        +Category parent
        +getProducts() Product[]
    }

    Customer "1" --> "*" Order : places
    Order "1" --> "*" OrderItem : contains
    Order "1" --> "1" Payment : has
    OrderItem "*" --> "1" Product : references
    Product "*" --> "1" Category : belongs to
    Category "0..1" --> "*" Category : parent of`,
  },
  // ── ER Diagrams ─────────────────────────────────────────────
  {
    title: "Blog Database Schema",
    description:
      "Users, Posts, Comments, and Tags with a many-to-many tagging relationship.",
    category: "ER Diagram",
    code: `erDiagram
    USERS {
        uuid id PK
        varchar name
        varchar email UK
        varchar password_hash
        text bio
        varchar avatar_url
        timestamp created_at
        timestamp updated_at
    }

    POSTS {
        uuid id PK
        uuid author_id FK
        varchar title
        varchar slug UK
        text content
        varchar status "draft | published | archived"
        timestamp published_at
        timestamp created_at
        timestamp updated_at
    }

    COMMENTS {
        uuid id PK
        uuid post_id FK
        uuid author_id FK
        uuid parent_id FK "nullable, for nested replies"
        text body
        timestamp created_at
    }

    TAGS {
        uuid id PK
        varchar name UK
        varchar slug UK
    }

    POST_TAGS {
        uuid post_id FK
        uuid tag_id FK
    }

    USERS ||--o{ POSTS : writes
    USERS ||--o{ COMMENTS : authors
    POSTS ||--o{ COMMENTS : has
    COMMENTS ||--o{ COMMENTS : "replies to"
    POSTS ||--o{ POST_TAGS : ""
    TAGS ||--o{ POST_TAGS : ""`,
  },
  {
    title: "SaaS Multi-Tenant Schema",
    description:
      "Tenants, Users, Roles, Subscriptions, and Invoices for a multi-tenant SaaS platform.",
    category: "ER Diagram",
    code: `erDiagram
    TENANTS {
        uuid id PK
        varchar name
        varchar slug UK
        varchar plan "free | pro | enterprise"
        timestamp created_at
    }

    USERS {
        uuid id PK
        uuid tenant_id FK
        varchar name
        varchar email
        varchar role "owner | admin | member"
        boolean is_active
        timestamp last_login_at
        timestamp created_at
    }

    SUBSCRIPTIONS {
        uuid id PK
        uuid tenant_id FK
        varchar stripe_subscription_id UK
        varchar status "active | past_due | canceled | trialing"
        varchar plan_id
        int quantity
        timestamp current_period_start
        timestamp current_period_end
        timestamp canceled_at
    }

    INVOICES {
        uuid id PK
        uuid tenant_id FK
        uuid subscription_id FK
        varchar stripe_invoice_id UK
        int amount_cents
        varchar currency
        varchar status "draft | open | paid | void"
        timestamp due_date
        timestamp paid_at
    }

    API_KEYS {
        uuid id PK
        uuid tenant_id FK
        uuid created_by FK
        varchar key_hash UK
        varchar label
        timestamp last_used_at
        timestamp expires_at
    }

    TENANTS ||--o{ USERS : "has members"
    TENANTS ||--o{ SUBSCRIPTIONS : "subscribes"
    TENANTS ||--o{ INVOICES : "billed"
    TENANTS ||--o{ API_KEYS : "owns"
    SUBSCRIPTIONS ||--o{ INVOICES : "generates"
    USERS ||--o{ API_KEYS : "creates"`,
  },
  // ── State Diagrams ──────────────────────────────────────────
  {
    title: "Order Lifecycle",
    description:
      "Order states from creation through payment, shipping, delivery, and cancellation paths.",
    category: "State",
    code: `stateDiagram-v2
    [*] --> Created : Customer places order

    Created --> PaymentPending : Proceed to checkout
    Created --> Cancelled : Customer cancels

    PaymentPending --> PaymentFailed : Payment declined
    PaymentPending --> Paid : Payment successful

    PaymentFailed --> PaymentPending : Retry payment
    PaymentFailed --> Cancelled : Max retries exceeded

    Paid --> Processing : Begin fulfillment
    Paid --> Refunded : Customer requests refund

    Processing --> Shipped : Handed to carrier
    Processing --> Refunded : Item unavailable

    Shipped --> OutForDelivery : Arrived at local facility
    Shipped --> Returned : Delivery failed

    OutForDelivery --> Delivered : Successfully delivered
    OutForDelivery --> Returned : Customer refused

    Delivered --> ReturnRequested : Customer requests return
    ReturnRequested --> Returned : Return received
    Returned --> Refunded : Refund processed

    Refunded --> [*]
    Delivered --> [*]
    Cancelled --> [*]`,
  },
  {
    title: "Pull Request Workflow",
    description:
      "PR states from draft through review, approval, CI checks, and merge or close.",
    category: "State",
    code: `stateDiagram-v2
    [*] --> Draft : Open draft PR

    Draft --> Open : Mark ready for review
    Open --> InReview : Reviewer assigned

    InReview --> ChangesRequested : Reviewer requests changes
    InReview --> Approved : Reviewer approves

    ChangesRequested --> InReview : Push new commits
    ChangesRequested --> Closed : Author closes

    Approved --> CIRunning : CI pipeline triggered
    CIRunning --> CIFailed : Tests fail
    CIRunning --> ReadyToMerge : All checks pass

    CIFailed --> InReview : Push fixes
    ReadyToMerge --> Merged : Merge PR

    Open --> Closed : Author or maintainer closes
    Draft --> Closed : Author closes

    Merged --> [*]
    Closed --> Open : Reopen PR
    Closed --> [*]`,
  },
  // ── Gantt Charts ────────────────────────────────────────────
  {
    title: "Sprint Planning",
    description:
      "Two-week sprint with design, development, testing, and release phases.",
    category: "Gantt",
    code: `gantt
    title Two-Week Sprint Plan
    dateFormat  YYYY-MM-DD
    axisFormat  %b %d

    section Design
    User research & requirements  :des1, 2025-01-06, 2d
    UI/UX wireframes              :des2, after des1, 2d
    Design review & sign-off      :milestone, after des2, 0d

    section Development
    API endpoints                 :dev1, after des2, 3d
    Frontend components           :dev2, after des2, 4d
    Integration & state mgmt      :dev3, after dev1, 2d

    section Testing
    Unit tests                    :test1, after dev1, 2d
    E2E tests                     :test2, after dev3, 2d
    QA regression testing         :test3, after test2, 1d

    section Release
    Staging deployment            :rel1, after test3, 1d
    Stakeholder demo              :milestone, after rel1, 0d
    Production release            :rel2, after rel1, 1d
    Post-release monitoring       :rel3, after rel2, 1d`,
  },
  // ── Mindmaps ────────────────────────────────────────────────
  {
    title: "Project Architecture",
    description:
      "Frontend, backend, and infrastructure breakdown for a modern web application.",
    category: "Mindmap",
    code: `mindmap
  root((Project Architecture))
    Frontend
      React / Next.js
        Pages & routing
        Server components
        Client components
      State Management
        Server state (React Query)
        Client state (Zustand)
      Styling
        Tailwind CSS
        Component library
      Testing
        Vitest (unit)
        Playwright (E2E)
    Backend
      API Layer
        REST endpoints
        WebSocket connections
        Rate limiting
      Business Logic
        Services
        Domain models
        Validation
      Data Layer
        PostgreSQL
        Redis cache
        S3 file storage
    Infrastructure
      Cloud (AWS / Vercel)
        CDN
        Edge functions
        Auto-scaling
      CI/CD
        GitHub Actions
        Docker builds
        Preview deploys
      Observability
        Logging
        Metrics
        Error tracking`,
  },
  // ── Git Graphs ──────────────────────────────────────────────
  {
    title: "Git Flow Branching",
    description:
      "Main, develop, feature, release, and hotfix branches following the Git Flow model.",
    category: "Git",
    code: `gitGraph
    commit id: "Initial commit"
    branch develop
    checkout develop
    commit id: "Project setup"
    commit id: "Add base config"

    branch feature/auth
    checkout feature/auth
    commit id: "Add login page"
    commit id: "Add JWT middleware"
    commit id: "Add registration"
    checkout develop
    merge feature/auth id: "Merge auth feature"

    branch feature/dashboard
    checkout feature/dashboard
    commit id: "Dashboard layout"
    commit id: "Add charts"
    checkout develop
    merge feature/dashboard id: "Merge dashboard"

    branch release/1.0
    checkout release/1.0
    commit id: "Bump version 1.0"
    commit id: "Fix release bug"
    checkout main
    merge release/1.0 id: "Release v1.0" tag: "v1.0"
    checkout develop
    merge release/1.0 id: "Merge release back"

    checkout main
    branch hotfix/1.0.1
    commit id: "Critical security fix"
    checkout main
    merge hotfix/1.0.1 id: "Hotfix v1.0.1" tag: "v1.0.1"
    checkout develop
    merge hotfix/1.0.1 id: "Merge hotfix"`,
  },
];

const categories: Category[] = [
  "Flowchart",
  "Sequence",
  "Class",
  "ER Diagram",
  "State",
  "Gantt",
  "Mindmap",
  "Git",
];

const categoryColors: Record<Category, string> = {
  Flowchart: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
  Sequence: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300",
  Class: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  "ER Diagram": "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
  State: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
  Gantt: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300",
  Mindmap: "bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-300",
  Git: "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300",
};

export function MermaidTemplatesClient() {
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");

  const filtered =
    activeCategory === "All"
      ? templates
      : templates.filter((t) => t.category === activeCategory);

  return (
    <ToolPageShell
      title="Mermaid Diagram Templates"
      description="Ready-to-use Mermaid diagram templates. Pick a template and open it directly in the live editor."
      href="/templates/mermaid"
    >
      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveCategory("All")}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            activeCategory === "All"
              ? "bg-foreground text-background"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              activeCategory === cat
                ? "bg-foreground text-background"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Template grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((template) => (
          <div
            key={template.title}
            className="border border-border rounded-lg p-5 flex flex-col gap-3 bg-card hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-2">
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryColors[template.category]}`}
              >
                {template.category}
              </span>
            </div>
            <h3 className="font-semibold text-base leading-tight">{template.title}</h3>
            <p className="text-sm text-muted-foreground flex-1">{template.description}</p>
            <Link
              href={`/mermaid-editor#${encodeShareContent(template.code)}`}
              className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-medium h-9 px-4 hover:bg-primary/90 transition-colors mt-auto"
            >
              Open in Editor
            </Link>
          </div>
        ))}
      </div>
    </ToolPageShell>
  );
}
