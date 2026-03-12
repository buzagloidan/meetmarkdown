"use client";

import Link from "next/link";
import { encodeShareContent } from "@/lib/share";

/* ---------------------------------------------------------------------------
 * Helpers
 * --------------------------------------------------------------------------- */

function CodeBlock({ code, label }: { code: string; label?: string }) {
  const encoded = encodeShareContent(code);
  return (
    <div className="relative my-4">
      {label && (
        <span className="mb-1 block text-xs font-medium text-muted-foreground">
          {label}
        </span>
      )}
      <pre className="rounded-lg border bg-muted/20 p-4 font-mono text-sm overflow-x-auto whitespace-pre">
        {code}
      </pre>
      <Link
        href={`/mermaid-editor#${encoded}`}
        className="mt-1.5 inline-block text-xs text-primary hover:underline"
      >
        Open in Editor &rarr;
      </Link>
    </div>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-4 rounded-lg border border-border/60 bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
      {children}
    </div>
  );
}

function SectionHeading({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      id={id}
      className="mt-16 mb-4 scroll-mt-24 text-2xl font-bold tracking-tight"
    >
      <a href={`#${id}`} className="hover:underline">
        {children}
      </a>
    </h2>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-8 mb-2 text-lg font-semibold tracking-tight">
      {children}
    </h3>
  );
}

/* ---------------------------------------------------------------------------
 * Table of contents data
 * --------------------------------------------------------------------------- */

const toc = [
  { id: "flowcharts", label: "Flowcharts" },
  { id: "sequence-diagrams", label: "Sequence Diagrams" },
  { id: "class-diagrams", label: "Class Diagrams" },
  { id: "state-diagrams", label: "State Diagrams" },
  { id: "er-diagrams", label: "ER Diagrams" },
  { id: "gantt-charts", label: "Gantt Charts" },
  { id: "pie-charts", label: "Pie Charts" },
  { id: "git-graphs", label: "Git Graphs" },
  { id: "mindmaps", label: "Mindmaps" },
  { id: "quick-reference", label: "Quick Reference" },
];

/* ---------------------------------------------------------------------------
 * Component
 * --------------------------------------------------------------------------- */

export function MermaidGuideContent() {
  return (
    <article className="prose-custom max-w-4xl">
      {/* ----- Table of contents ----- */}
      <nav className="mb-12 rounded-lg border bg-muted/20 p-5">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Contents
        </p>
        <ol className="columns-2 gap-x-8 text-sm leading-relaxed sm:columns-2">
          {toc.map((item, i) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="text-primary hover:underline"
              >
                {i + 1}. {item.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* =================================================================
       * 1. FLOWCHARTS
       * ================================================================= */}
      <SectionHeading id="flowcharts">1. Flowcharts</SectionHeading>
      <p className="text-muted-foreground">
        Flowcharts are the most commonly used Mermaid diagram. Use them to
        describe processes, decision trees, system architectures, or any
        step-by-step flow.
      </p>

      <SubHeading>Basic syntax</SubHeading>
      <p className="text-sm text-muted-foreground">
        A flowchart starts with <code>flowchart</code> followed by a direction:
        <code>TD</code> (top-down), <code>LR</code> (left-right),{" "}
        <code>BT</code> (bottom-top), or <code>RL</code> (right-left).
      </p>
      <CodeBlock
        label="Simple flowchart"
        code={`flowchart TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug]
    D --> B`}
      />

      <SubHeading>Node shapes</SubHeading>
      <CodeBlock
        label="All node shapes"
        code={`flowchart LR
    A[Rectangle]
    B(Rounded)
    C([Stadium])
    D[[Subroutine]]
    E[(Database)]
    F((Circle))
    G>Asymmetric]
    H{Diamond}
    I{{Hexagon}}
    J[/Parallelogram/]
    K[\\Parallelogram alt\\]
    L[/Trapezoid\\]
    M[\\Trapezoid alt/]`}
      />

      <SubHeading>Link types</SubHeading>
      <CodeBlock
        label="Different link styles"
        code={`flowchart LR
    A --> B
    A --- C
    A -.- D
    A -.-> E
    A ==> F
    A -- text --> G
    A -. dotted .-> H
    A == thick ==> I`}
      />

      <SubHeading>Subgraphs and styling</SubHeading>
      <CodeBlock
        label="Practical example with subgraphs"
        code={`flowchart TD
    subgraph Frontend
        A[React App] --> B[API Client]
    end
    subgraph Backend
        C[Express Server] --> D[(PostgreSQL)]
        C --> E[(Redis Cache)]
    end
    B --> C
    style A fill:#e1f5fe
    style D fill:#fff3e0`}
      />

      <Callout>
        <strong>Tips:</strong> Use <code>%%</code> for comments. Node IDs must
        be unique across the entire diagram, including across subgraphs. If you
        need special characters in labels, wrap them in quotes:{" "}
        <code>A[&quot;Node with (parens)&quot;]</code>.
      </Callout>

      {/* =================================================================
       * 2. SEQUENCE DIAGRAMS
       * ================================================================= */}
      <SectionHeading id="sequence-diagrams">
        2. Sequence Diagrams
      </SectionHeading>
      <p className="text-muted-foreground">
        Sequence diagrams show how objects or services interact over time. They
        are ideal for documenting API flows, authentication handshakes, or any
        request-response exchange.
      </p>

      <SubHeading>Basic syntax</SubHeading>
      <CodeBlock
        label="Simple request-response"
        code={`sequenceDiagram
    participant C as Client
    participant S as Server
    participant DB as Database
    C->>S: GET /users
    S->>DB: SELECT * FROM users
    DB-->>S: rows
    S-->>C: 200 OK (JSON)`}
      />

      <SubHeading>Message types</SubHeading>
      <CodeBlock
        label="All arrow types"
        code={`sequenceDiagram
    A->>B: Solid with arrowhead
    A-->>B: Dotted with arrowhead
    A-xB: Solid with cross
    A--xB: Dotted with cross
    A-)B: Solid with open arrow
    A--)B: Dotted with open arrow`}
      />

      <SubHeading>Activations, notes, loops, and alternatives</SubHeading>
      <CodeBlock
        label="Advanced sequence diagram"
        code={`sequenceDiagram
    actor U as User
    participant A as Auth Service
    participant API as API Gateway

    U->>A: Login (email, password)
    activate A
    A->>A: Validate credentials
    alt Valid credentials
        A-->>U: JWT token
        Note right of A: Token expires in 1h
        U->>API: Request + JWT
        activate API
        API->>A: Verify token
        A-->>API: Token valid
        API-->>U: 200 Response
        deactivate API
    else Invalid credentials
        A-->>U: 401 Unauthorized
    end
    deactivate A

    loop Every 55 minutes
        U->>A: Refresh token
        A-->>U: New JWT
    end`}
      />

      <Callout>
        <strong>Tips:</strong> Use <code>actor</code> instead of{" "}
        <code>participant</code> to render a stick-figure icon. Use{" "}
        <code>autonumber</code> after <code>sequenceDiagram</code> to
        automatically number each message. Notes can be placed{" "}
        <code>left of</code>, <code>right of</code>, or{" "}
        <code>over</code> participants.
      </Callout>

      {/* =================================================================
       * 3. CLASS DIAGRAMS
       * ================================================================= */}
      <SectionHeading id="class-diagrams">3. Class Diagrams</SectionHeading>
      <p className="text-muted-foreground">
        Class diagrams describe the structure of a system by showing classes,
        their attributes, methods, and relationships. Useful for OOP design and
        domain modelling.
      </p>

      <SubHeading>Basic syntax</SubHeading>
      <CodeBlock
        label="Defining classes"
        code={`classDiagram
    class Animal {
        +String name
        +int age
        +makeSound() void
    }
    class Dog {
        +String breed
        +fetch() void
    }
    class Cat {
        +bool isIndoor
        +purr() void
    }
    Animal <|-- Dog
    Animal <|-- Cat`}
      />

      <SubHeading>Relationship types</SubHeading>
      <CodeBlock
        label="All relationship arrows"
        code={`classDiagram
    classA <|-- classB : Inheritance
    classC *-- classD : Composition
    classE o-- classF : Aggregation
    classG <-- classH : Association
    classI -- classJ : Link (solid)
    classK <.. classL : Dependency
    classM <|.. classN : Realization
    classO .. classP : Link (dashed)`}
      />

      <SubHeading>Practical example with interfaces and multiplicity</SubHeading>
      <CodeBlock
        label="E-commerce domain model"
        code={`classDiagram
    class Order {
        +String id
        +Date createdAt
        +calculateTotal() float
        +cancel() void
    }
    class OrderItem {
        +String productId
        +int quantity
        +float unitPrice
    }
    class Customer {
        +String email
        +String name
        +placeOrder() Order
    }
    class Payment {
        <<interface>>
        +process() bool
        +refund() bool
    }
    class StripePayment {
        +String stripeId
        +process() bool
        +refund() bool
    }

    Customer "1" --> "*" Order : places
    Order "1" *-- "1..*" OrderItem : contains
    Payment <|.. StripePayment
    Order --> Payment : uses`}
      />

      <Callout>
        <strong>Tips:</strong> Visibility modifiers: <code>+</code> public,{" "}
        <code>-</code> private, <code>#</code> protected, <code>~</code>{" "}
        package/internal. Use <code>&lt;&lt;interface&gt;&gt;</code>,{" "}
        <code>&lt;&lt;abstract&gt;&gt;</code>, or{" "}
        <code>&lt;&lt;enumeration&gt;&gt;</code> as class annotations.
      </Callout>

      {/* =================================================================
       * 4. STATE DIAGRAMS
       * ================================================================= */}
      <SectionHeading id="state-diagrams">4. State Diagrams</SectionHeading>
      <p className="text-muted-foreground">
        State diagrams model the different states of an object and the
        transitions between them. Great for workflows, order lifecycles, or UI
        state machines.
      </p>

      <SubHeading>Basic syntax</SubHeading>
      <CodeBlock
        label="Simple state machine"
        code={`stateDiagram-v2
    [*] --> Idle
    Idle --> Processing : submit
    Processing --> Success : done
    Processing --> Error : fail
    Error --> Idle : retry
    Success --> [*]`}
      />

      <SubHeading>Composite states, notes, and forks</SubHeading>
      <CodeBlock
        label="Order lifecycle"
        code={`stateDiagram-v2
    [*] --> Pending

    state Pending {
        [*] --> Validating
        Validating --> Confirmed : valid
        Validating --> Rejected : invalid
    }

    Pending --> Processing : payment received
    Processing --> Shipped : dispatch

    state Shipped {
        [*] --> InTransit
        InTransit --> OutForDelivery
        OutForDelivery --> Delivered
    }

    Shipped --> Completed : delivered
    Completed --> [*]

    Processing --> Cancelled : cancel request
    Pending --> Cancelled : cancel request
    Cancelled --> [*]

    note right of Processing
        Payment must be confirmed
        before processing begins
    end note`}
      />

      <Callout>
        <strong>Tips:</strong> Always use <code>stateDiagram-v2</code> (not the
        legacy <code>stateDiagram</code>). The <code>[*]</code> symbol
        represents start and end states. Composite (nested) states are defined
        with <code>state Name &#123; ... &#125;</code>.
      </Callout>

      {/* =================================================================
       * 5. ER DIAGRAMS
       * ================================================================= */}
      <SectionHeading id="er-diagrams">5. ER Diagrams</SectionHeading>
      <p className="text-muted-foreground">
        Entity-Relationship diagrams describe database schemas. Use them to plan
        tables, columns, and the relationships between entities before writing
        migrations.
      </p>

      <SubHeading>Basic syntax</SubHeading>
      <CodeBlock
        label="Simple ER diagram"
        code={`erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE_ITEM : contains
    PRODUCT ||--o{ LINE_ITEM : "is in"`}
      />

      <SubHeading>Cardinality notation</SubHeading>
      <p className="text-sm text-muted-foreground mb-2">
        Left side of <code>--</code> describes cardinality from left entity;
        right side describes cardinality from right entity.
      </p>
      <div className="my-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 pr-4 font-semibold">Symbol</th>
              <th className="text-left py-2 font-semibold">Meaning</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b border-border/40">
              <td className="py-2 pr-4 font-mono">||</td>
              <td className="py-2">Exactly one</td>
            </tr>
            <tr className="border-b border-border/40">
              <td className="py-2 pr-4 font-mono">o|</td>
              <td className="py-2">Zero or one</td>
            </tr>
            <tr className="border-b border-border/40">
              <td className="py-2 pr-4 font-mono">|&#123;</td>
              <td className="py-2">One or more</td>
            </tr>
            <tr className="border-b border-border/40">
              <td className="py-2 pr-4 font-mono">o&#123;</td>
              <td className="py-2">Zero or more</td>
            </tr>
          </tbody>
        </table>
      </div>

      <SubHeading>Practical example with attributes</SubHeading>
      <CodeBlock
        label="Blog database schema"
        code={`erDiagram
    USER {
        int id PK
        string email UK
        string name
        datetime created_at
    }
    POST {
        int id PK
        string title
        text body
        datetime published_at
        int author_id FK
    }
    COMMENT {
        int id PK
        text content
        datetime created_at
        int post_id FK
        int user_id FK
    }
    TAG {
        int id PK
        string name UK
    }
    POST_TAG {
        int post_id FK
        int tag_id FK
    }

    USER ||--o{ POST : writes
    USER ||--o{ COMMENT : writes
    POST ||--o{ COMMENT : has
    POST ||--o{ POST_TAG : ""
    TAG ||--o{ POST_TAG : ""`}
      />

      <Callout>
        <strong>Tips:</strong> Attribute types are free-form strings (e.g.,{" "}
        <code>int</code>, <code>string</code>, <code>varchar(255)</code>).
        Append <code>PK</code>, <code>FK</code>, or <code>UK</code> to mark
        primary keys, foreign keys, and unique keys. Entity names are
        case-sensitive and cannot contain spaces.
      </Callout>

      {/* =================================================================
       * 6. GANTT CHARTS
       * ================================================================= */}
      <SectionHeading id="gantt-charts">6. Gantt Charts</SectionHeading>
      <p className="text-muted-foreground">
        Gantt charts visualize project schedules. Each task has a start date and
        duration, and you can model dependencies between tasks.
      </p>

      <SubHeading>Basic syntax</SubHeading>
      <CodeBlock
        label="Simple project timeline"
        code={`gantt
    title Project Launch Plan
    dateFormat YYYY-MM-DD

    section Planning
    Requirements     :a1, 2025-01-01, 14d
    Architecture     :a2, after a1, 7d

    section Development
    Backend API      :b1, after a2, 21d
    Frontend UI      :b2, after a2, 21d
    Integration      :b3, after b1, 7d

    section Launch
    QA Testing       :c1, after b3, 10d
    Deploy to prod   :milestone, c2, after c1, 0d`}
      />

      <SubHeading>Task states and advanced features</SubHeading>
      <CodeBlock
        label="Tasks with different states"
        code={`gantt
    title Sprint 12 Progress
    dateFormat YYYY-MM-DD
    excludes weekends

    section Auth
    Login page           :done,    auth1, 2025-03-01, 3d
    OAuth integration    :active,  auth2, after auth1, 4d
    2FA support          :         auth3, after auth2, 5d

    section Dashboard
    Layout               :done,    dash1, 2025-03-01, 2d
    Charts               :active,  dash2, after dash1, 4d
    Export feature       :crit,    dash3, after dash2, 3d

    section Testing
    Unit tests           :         test1, after auth3, 3d
    E2E tests            :         test2, after dash3, 3d`}
      />

      <Callout>
        <strong>Tips:</strong> Task states: <code>done</code>,{" "}
        <code>active</code>, <code>crit</code> (critical path). Use{" "}
        <code>excludes weekends</code> to skip Saturdays and Sundays. Use{" "}
        <code>milestone</code> with <code>0d</code> duration for milestones.
        Dependencies are declared with <code>after taskId</code>.
      </Callout>

      {/* =================================================================
       * 7. PIE CHARTS
       * ================================================================= */}
      <SectionHeading id="pie-charts">7. Pie Charts</SectionHeading>
      <p className="text-muted-foreground">
        Pie charts display proportional data. They are the simplest Mermaid
        diagram type — just a title and data slices.
      </p>

      <SubHeading>Basic syntax</SubHeading>
      <CodeBlock
        label="Simple pie chart"
        code={`pie title Browser Market Share (2025)
    "Chrome" : 65
    "Safari" : 19
    "Firefox" : 3
    "Edge" : 5
    "Other" : 8`}
      />

      <SubHeading>Practical example</SubHeading>
      <CodeBlock
        label="Time allocation"
        code={`pie showData title Weekly Time Allocation
    "Coding" : 20
    "Code Review" : 5
    "Meetings" : 8
    "Planning" : 3
    "Documentation" : 2
    "Learning" : 2`}
      />

      <Callout>
        <strong>Tips:</strong> Values are relative — Mermaid automatically
        calculates percentages. Add <code>showData</code> after{" "}
        <code>pie</code> to display raw values alongside the chart. Labels must
        be in double quotes.
      </Callout>

      {/* =================================================================
       * 8. GIT GRAPHS
       * ================================================================= */}
      <SectionHeading id="git-graphs">8. Git Graphs</SectionHeading>
      <p className="text-muted-foreground">
        Git graphs visualize branching and merging strategies. Use them to
        document your Git workflow, illustrate rebasing, or explain branching
        models.
      </p>

      <SubHeading>Basic syntax</SubHeading>
      <CodeBlock
        label="Simple Git flow"
        code={`gitGraph
    commit
    commit
    branch develop
    checkout develop
    commit
    commit
    checkout main
    merge develop
    commit`}
      />

      <SubHeading>Practical example — feature branch workflow</SubHeading>
      <CodeBlock
        label="Feature branch workflow"
        code={`gitGraph
    commit id: "init"
    commit id: "base setup"
    branch develop
    commit id: "dev config"

    branch feature/auth
    commit id: "login page"
    commit id: "OAuth"
    checkout develop
    merge feature/auth id: "merge auth"

    branch feature/dashboard
    commit id: "layout"
    commit id: "charts"
    checkout develop
    merge feature/dashboard id: "merge dashboard"

    checkout main
    merge develop id: "v1.0" tag: "v1.0"
    commit id: "hotfix"
    checkout develop
    cherry-pick id: "hotfix"`}
      />

      <Callout>
        <strong>Tips:</strong> Use <code>id: &quot;label&quot;</code> to name
        commits. Use <code>tag: &quot;v1.0&quot;</code> to add tags. The{" "}
        <code>cherry-pick</code> command references a commit by its{" "}
        <code>id</code>. Branch names cannot contain spaces.
      </Callout>

      {/* =================================================================
       * 9. MINDMAPS
       * ================================================================= */}
      <SectionHeading id="mindmaps">9. Mindmaps</SectionHeading>
      <p className="text-muted-foreground">
        Mindmaps visualize hierarchical information radiating from a central
        concept. They are great for brainstorming, topic overviews, and
        knowledge organization.
      </p>

      <SubHeading>Basic syntax</SubHeading>
      <p className="text-sm text-muted-foreground mb-2">
        Indentation defines the hierarchy. Each level is indented further with
        spaces.
      </p>
      <CodeBlock
        label="Simple mindmap"
        code={`mindmap
  root((Project))
    Planning
      Requirements
      Timeline
      Budget
    Development
      Frontend
      Backend
      Database
    Launch
      QA
      Deployment
      Monitoring`}
      />

      <SubHeading>Node shapes and practical example</SubHeading>
      <CodeBlock
        label="Technology overview"
        code={`mindmap
  root((Full Stack))
    Frontend
      React
        Next.js
        Remix
      Vue
        Nuxt
      Svelte
        SvelteKit
    Backend
      Node.js
        Express
        Fastify
      Python
        Django
        FastAPI
      Go
        Gin
        Echo
    Database
      SQL
        PostgreSQL
        MySQL
      NoSQL
        MongoDB
        Redis
    DevOps
      CI/CD
        GitHub Actions
        GitLab CI
      Cloud
        AWS
        Vercel`}
      />

      <Callout>
        <strong>Tips:</strong> Node shapes in mindmaps:{" "}
        <code>root((Circle))</code>, <code>id[Square]</code>,{" "}
        <code>id(Rounded)</code>, <code>id)Cloud(</code>,{" "}
        <code>{"id{{Hexagon}}"}</code>. Only the root node is required to have a
        shape. Indentation must be consistent (use spaces, not tabs).
      </Callout>

      {/* =================================================================
       * QUICK REFERENCE
       * ================================================================= */}
      <SectionHeading id="quick-reference">Quick Reference</SectionHeading>
      <p className="text-muted-foreground mb-4">
        Common patterns at a glance. Bookmark this section for day-to-day use.
      </p>

      <SubHeading>Diagram declarations</SubHeading>
      <div className="my-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 pr-4 font-semibold">Diagram</th>
              <th className="text-left py-2 font-semibold">Opening line</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            {[
              ["Flowchart", "flowchart TD"],
              ["Sequence", "sequenceDiagram"],
              ["Class", "classDiagram"],
              ["State", "stateDiagram-v2"],
              ["ER", "erDiagram"],
              ["Gantt", "gantt"],
              ["Pie", "pie title My Title"],
              ["Git Graph", "gitGraph"],
              ["Mindmap", "mindmap"],
            ].map(([diagram, syntax]) => (
              <tr key={diagram} className="border-b border-border/40">
                <td className="py-2 pr-4">{diagram}</td>
                <td className="py-2 font-mono">{syntax}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SubHeading>Flowchart directions</SubHeading>
      <div className="my-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 pr-4 font-semibold">Code</th>
              <th className="text-left py-2 font-semibold">Direction</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            {[
              ["TD / TB", "Top to bottom"],
              ["BT", "Bottom to top"],
              ["LR", "Left to right"],
              ["RL", "Right to left"],
            ].map(([code, dir]) => (
              <tr key={code} className="border-b border-border/40">
                <td className="py-2 pr-4 font-mono">{code}</td>
                <td className="py-2">{dir}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SubHeading>Flowchart node shapes</SubHeading>
      <div className="my-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 pr-4 font-semibold">Syntax</th>
              <th className="text-left py-2 font-semibold">Shape</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            {[
              ["A[text]", "Rectangle"],
              ["A(text)", "Rounded rectangle"],
              ["A([text])", "Stadium / pill"],
              ["A{text}", "Diamond / decision"],
              ["A{{text}}", "Hexagon"],
              ["A((text))", "Circle"],
              ["A[(text)]", "Cylinder / database"],
              ["A>text]", "Asymmetric / flag"],
              ["A[/text/]", "Parallelogram"],
              ["A[/text\\]", "Trapezoid"],
            ].map(([syntax, shape]) => (
              <tr key={syntax} className="border-b border-border/40">
                <td className="py-2 pr-4 font-mono">{syntax}</td>
                <td className="py-2">{shape}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SubHeading>Flowchart link types</SubHeading>
      <div className="my-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 pr-4 font-semibold">Syntax</th>
              <th className="text-left py-2 font-semibold">Description</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            {[
              ["A --> B", "Arrow"],
              ["A --- B", "Line (no arrow)"],
              ["A -.-> B", "Dotted arrow"],
              ["A ==> B", "Thick arrow"],
              ['A -- "text" --> B', "Arrow with label"],
              ["A --o B", "Circle end"],
              ["A --x B", "Cross end"],
              ["A <--> B", "Bidirectional"],
            ].map(([syntax, desc]) => (
              <tr key={syntax} className="border-b border-border/40">
                <td className="py-2 pr-4 font-mono">{syntax}</td>
                <td className="py-2">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SubHeading>Sequence diagram arrows</SubHeading>
      <div className="my-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 pr-4 font-semibold">Syntax</th>
              <th className="text-left py-2 font-semibold">Description</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            {[
              ["->>", "Solid line, arrowhead"],
              ["-->>", "Dotted line, arrowhead"],
              ["-x", "Solid line, cross"],
              ["--x", "Dotted line, cross"],
              ["-)", "Solid line, open arrow (async)"],
              ["--)", "Dotted line, open arrow (async)"],
            ].map(([syntax, desc]) => (
              <tr key={syntax} className="border-b border-border/40">
                <td className="py-2 pr-4 font-mono">{syntax}</td>
                <td className="py-2">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SubHeading>Class diagram relationships</SubHeading>
      <div className="my-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 pr-4 font-semibold">Syntax</th>
              <th className="text-left py-2 font-semibold">Relationship</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            {[
              ["<|--", "Inheritance"],
              ["*--", "Composition"],
              ["o--", "Aggregation"],
              ["<--", "Association"],
              ["<|..", "Realization"],
              ["<..", "Dependency"],
            ].map(([syntax, rel]) => (
              <tr key={syntax} className="border-b border-border/40">
                <td className="py-2 pr-4 font-mono">{syntax}</td>
                <td className="py-2">{rel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SubHeading>ER diagram cardinality</SubHeading>
      <div className="my-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 pr-4 font-semibold">Syntax</th>
              <th className="text-left py-2 font-semibold">Meaning</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            {[
              ["||--||", "One to one"],
              ["||--o{", "One to zero-or-more"],
              ["||--|{", "One to one-or-more"],
              ["o|--o{", "Zero-or-one to zero-or-more"],
            ].map(([syntax, meaning]) => (
              <tr key={syntax} className="border-b border-border/40">
                <td className="py-2 pr-4 font-mono">{syntax}</td>
                <td className="py-2">{meaning}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SubHeading>Common Mermaid directives</SubHeading>
      <div className="my-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 pr-4 font-semibold">Directive</th>
              <th className="text-left py-2 font-semibold">Purpose</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            {[
              ["%% comment", "Single-line comment"],
              ["%%{init: {...}}%%", "Configuration block (theme, look, etc.)"],
              ["style nodeId fill:#f9f", "Inline node styling"],
              ["classDef name fill:#f9f", "Define reusable style class"],
              ["class nodeId name", "Apply style class to node"],
              ["click nodeId href \"url\"", "Make node clickable"],
            ].map(([directive, purpose]) => (
              <tr key={directive} className="border-b border-border/40">
                <td className="py-2 pr-4 font-mono">{directive}</td>
                <td className="py-2">{purpose}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Back to top */}
      <div className="mt-16 mb-8 text-center">
        <a
          href="#"
          className="text-sm text-primary hover:underline"
        >
          Back to top
        </a>
      </div>
    </article>
  );
}
