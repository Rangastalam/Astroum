# Brahmo Context Composition Agent

## Overview

Brahmo Context Composition Agent is a budget-aware context assembly system designed to simulate how enterprise AI assistants dynamically construct prompts from organizational knowledge.

The system retrieves organizational knowledge nodes, applies intelligent compression strategies, assembles context blocks, and ensures that the final prompt remains within a specified token budget.

The project demonstrates:

* Dynamic context construction
* Token budget management
* Multi-level content compression
* Human override detection
* Structured prompt engineering
* Full-stack integration with Supabase

---

## Problem Statement

Large Language Models have limited context windows. In enterprise environments, organizational knowledge can easily exceed the available token budget.

The challenge is:

* Preserve critical information
* Compress less important information
* Stay within a strict token budget
* Explain every compression decision
* Escalate to humans when automatic compression is insufficient

This project addresses that challenge through a context composition pipeline.

---

## Architecture

```text
                ┌──────────────────┐
                │    Supabase      │
                └────────┬─────────┘
                         │
                         ▼
              ┌────────────────────┐
              │ Compose Controller │
              └────────┬───────────┘
                       │
                       ▼
            ┌──────────────────────┐
            │ Composition Engine   │
            └────────┬─────────────┘
                     │
                     ▼
    ┌─────────────────────────────────┐
    │ Block Assignment                │
    │ Default Compression             │
    │ Budget Fitting                  │
    │ Context Assembly                │
    │ Prompt Generation               │
    └─────────────────────────────────┘
                     │
                     ▼
              Final Context
```

---

## Tech Stack

### Frontend

* React
* Tailwind CSS
* Fetch API

### Backend

* Node.js
* Express.js

### Database

* Supabase (PostgreSQL)

---

## Database Tables

### Users

Stores information about system users.

| Field      | Description     |
| ---------- | --------------- |
| id         | User identifier |
| name       | User name       |
| role       | User role       |
| department | Department      |

---

### Patients

Stores patient metadata.

| Field      | Description        |
| ---------- | ------------------ |
| id         | Patient identifier |
| name       | Patient name       |
| conditions | Medical conditions |

---

### Candidate Nodes

Stores organizational knowledge.

| Field                   | Description                                 |
| ----------------------- | ------------------------------------------- |
| id                      | Node identifier                             |
| type                    | FACT / DECISION / CONSTRAINT / ANTI_PATTERN |
| zone                    | Context zone                                |
| content_full            | Full representation                         |
| content_compressed      | Compressed representation                   |
| content_constraint_only | Minimal representation                      |
| injection_weight        | Compression priority                        |
| distance_from_entry     | Relevance distance                          |
| status                  | ACTIVE / REVIEW_REQUIRED                    |

---

## Composition Pipeline

### Step 1: Load Candidate Nodes

Knowledge nodes are retrieved from Supabase.

---

### Step 2: Block Assignment

Nodes are assigned to context blocks.

| Block              | Purpose                         |
| ------------------ | ------------------------------- |
| ROLE               | User and patient context        |
| GLOBAL_CONSTRAINTS | Critical organizational rules   |
| RECENT_DECISIONS   | Historical decisions            |
| ACTIVE_CONSTRAINTS | Current operational constraints |
| SESSION_CONTEXT    | Facts and anti-patterns         |
| STALE_FLAGS        | Review-required nodes           |
| SESSION_BOUNDARIES | Memory capture instructions     |

---

### Step 3: Default Compression

Each node receives an initial compression level.

#### FULL

Complete node content.

#### COMPRESSED

Summarized representation.

#### CONSTRAINT_ONLY

Minimal constraint representation.

Compression is determined by:

* Node type
* Distance from entry

---

### Step 4: Budget Fitting

The engine calculates total token usage.

If the budget is exceeded:

1. Find the lowest injection-weight non-constraint node
2. Downgrade its compression level
3. Recalculate token usage
4. Repeat until the budget is satisfied

This process is logged for transparency.

---

### Step 5: Human Override Detection

Human override is triggered when:

```text
Actual Token Usage > Budget
```

even after all possible compression strategies have been exhausted.

This indicates that automatic optimization is no longer sufficient.

---

### Step 6: Context Assembly

The engine constructs the final context string.

Example:

```text
=== ROLE ===

You are assisting Dr. Vikram...

=== GLOBAL_CONSTRAINTS ===

...

=== RECENT_DECISIONS ===

...

=== ACTIVE_CONSTRAINTS ===

...

=== SESSION_CONTEXT ===

...
```

---

### Step 7: Prompt Generation

The context is injected into a structured system prompt.

The resulting prompt becomes the context provided to the LLM.

---

## Compression Strategy

The project uses a three-level compression hierarchy.

```text
FULL
   ↓
COMPRESSED
   ↓
CONSTRAINT_ONLY
```

Compression decisions are based on:

* Injection weight
* Node type
* Token budget pressure

Constraints are protected from aggressive compression.

---

## Human Override Logic

Automatic compression continues until one of two conditions is met:

### Budget Satisfied

```text
Actual Tokens <= Budget
```

Result:

```text
Human Override = NO
```

---

### Budget Not Satisfied

```text
Actual Tokens > Budget
```

Result:

```text
Human Override = YES
```

This indicates that human review is required.

---

## Frontend Features

### Context Controls

* User selection
* Patient selection
* Budget selection

---

### Budget Dashboard

Displays:

* Budget
* Used tokens
* Remaining tokens
* Token utilization

---

### Block Panel

Displays nodes grouped by context block.

---

### Compression Log

Displays:

* Compression passes
* Compression transitions
* Tokens saved
* Compression rationale

---

### Context Viewer

Displays the final assembled context.

---

### Composition Rationale

Explains:

* Budget utilization
* Compression activity
* Human override status

---

## Running the Project

### Backend

```bash
cd backend

npm install

npm run dev
```

---

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## Environment Variables

```env
SUPABASE_URL=your_supabase_url

SUPABASE_ANON_KEY=your_supabase_key

TOKEN_BUDGET=4000
```

---

## Future Improvements

* User-role based node filtering
* Department-specific context selection
* Retrieval ranking layer
* Semantic search integration
* Context diff visualization
* Compression simulation mode
* Analytics dashboard

---

## Key Learnings

This project demonstrates how enterprise AI systems can:

* Manage limited context windows
* Prioritize critical information
* Compress knowledge intelligently
* Maintain transparency in decision-making
* Escalate to humans when automation reaches its limits

The result is a scalable framework for budget-aware context engineering.
