# Blog Posts

This folder contains all blog posts in Markdown format. Each `.md` file represents a single blog post.

## How to Add a New Blog

1. Create a new `.md` file in this folder (e.g., `04-my-new-blog.md`)
2. Add frontmatter at the top of the file with required metadata
3. Write your blog content below the frontmatter

## Frontmatter Format

Each blog post must start with YAML frontmatter between `---` delimiters:

```markdown
---
id: 4
date: "Feb 14, 2026"
title: "Your Blog Title Here"
summary: "A brief one-line summary of your blog post."
---

Your blog content goes here...

Second paragraph goes here...
```

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | number | Unique identifier for sorting (higher numbers appear first if you want newest first) |
| `date` | string | Display date (e.g., "Feb 14, 2026") |
| `title` | string | Blog post title |
| `summary` | string | Brief description shown on the blog card |

## Content Format

- Separate paragraphs with blank lines
- Each paragraph will be rendered as a separate `<p>` element
- Keep paragraphs focused and readable

## Example

```markdown
---
id: 4
date: "Feb 14, 2026"
title: "Understanding Digital Signatures in Financial Documents"
summary: "How digital signatures are transforming document authentication in the financial sector."
---

Digital signatures have revolutionized the way financial documents are authenticated...

The legal framework in India, governed by the IT Act 2000...

For organizations looking to implement digital signatures...
```

## File Naming Convention

Use the format: `{number}-{slug}.md`
- `01-ai-forensic-audits.md`
- `02-gst-saas-companies.md`
- `03-cybersecurity-balance-sheet.md`

This helps keep files organized and easy to identify.
