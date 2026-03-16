# Plain Prophecy — CMS Build Plan for Claude Code

**Version:** 1.0  
**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind v4 · shadcn/ui · Convex · Vercel  
**Goal:** A robust, editor-friendly CMS that supports every content type on plainprophecy.com

---

## How to Use This Document

This plan is structured into **phases**. Each phase contains one or more **tasks**. Each task includes:
- What to build and why
- Exact files to create or modify
- A Claude Code prompt you can paste directly
- Gotchas and verification steps

Work through phases in order. Each phase assumes the previous one is complete.

---

## Current State Audit

### What Exists
| Feature | Status |
|---|---|
| Auth (email/password via Convex Auth) | ✅ Working |
| Route protection (middleware) | ✅ Working |
| CRUD: Prophecies, Blog, Evidence, Timelines, Studies, Doctrines | ✅ Working |
| Draft/published toggle | ✅ Working |
| Delete confirmation dialogs | ✅ Working |
| Sonner toasts | ✅ Working |
| AdminSidebar + AdminTopBar components | ✅ Working |

### What's Missing
| Gap | Priority |
|---|---|
| Pillars + Compare pages have no admin UI | 🔴 High |
| No search/filter on list pages | 🔴 High |
| No slug auto-generation | 🔴 High |
| No unsaved changes warning | 🟡 Medium |
| No content preview | 🟡 Medium |
| No image upload (URLs only) | 🟡 Medium |
| No SEO meta fields | 🟡 Medium |
| No revision history | 🟠 Later |
| No role-based access | 🟠 Later |
| No scheduled publishing | 🟠 Later |
| Rich text editor (Markdown only) | 🟠 Later |

---

## Phase 1 — Foundation Gaps (Do This First)

These are blockers. Quick wins that prevent data quality issues as content grows.

---

### Task 1.1 — Missing Admin Pages: Pillars + Compare

**Why first:** Two content types already exist in your Convex schema with no admin UI. Editors are blind to this content.

**Files to create:**
```
app/admin/pillars/page.tsx
app/admin/pillars/[id]/page.tsx
app/admin/compare/page.tsx
app/admin/compare/[id]/page.tsx
```

**Files to modify:**
```
components/admin/AdminSidebar.tsx  ← add nav links
```

**Claude Code prompt:**
```
Read the following files before starting:
- convex/pillars.ts
- convex/compareHighlights.ts
- convex/schema.ts
- app/admin/evidence/page.tsx (use as the list page pattern)
- app/admin/evidence/[id]/page.tsx (use as the edit page pattern)
- components/admin/AdminSidebar.tsx

Task: Create admin CRUD pages for two missing content types.

1. Pillars (app/admin/pillars/)
   - List page showing all pillars with title, order, published status
   - Edit/create page with fields matching the pillars schema
   - Follow the exact same component patterns as the evidence pages

2. Compare Highlights (app/admin/compare/)
   - List page showing all compare highlights
   - Edit/create page with fields matching the compareHighlights schema
   - Same patterns as above

3. Add sidebar links:
   - Add "Pillars" entry to the nav array in AdminSidebar.tsx (use Layers icon from lucide-react)
   - Add "Compare" entry (use GitCompare icon from lucide-react)
   - Insert them after "Doctrines" in the nav order

Do not create any new patterns. Mirror the evidence pages exactly for layout, toast usage, 
delete flow, and form structure. Use React Hook Form + shadcn/ui throughout.
```

**Verify:**
- Navigate to `/admin/pillars` — list renders
- Create, edit, delete a pillar
- Navigate to `/admin/compare` — same
- Both appear in sidebar

---

### Task 1.2 — Slug Auto-Generation

**Why:** Manual slug entry leads to inconsistency (spaces, caps, duplicates). This becomes a data integrity problem once you have dozens of posts.

**Files to modify:**
```
app/admin/blog/[id]/page.tsx
app/admin/doctrines/[id]/page.tsx
app/admin/studies/[courseId]/page.tsx   ← if courses have slugs
```

**Claude Code prompt:**
```
Read these files:
- app/admin/blog/[id]/page.tsx
- app/admin/doctrines/[id]/page.tsx
- convex/blog.ts
- convex/doctrines.ts

Task: Add slug auto-generation and validation to blog and doctrine edit forms.

Requirements:
1. Create a reusable utility at lib/slug.ts:
   - generateSlug(title: string): string
   - Converts title to lowercase, replaces spaces with hyphens, removes special chars
   - Example: "The 70 Weeks of Daniel" → "the-70-weeks-of-daniel"

2. In blog/[id]/page.tsx and doctrines/[id]/page.tsx:
   - On title field blur, if slug field is EMPTY, auto-populate it with generateSlug(title)
   - If slug already has a value, do NOT overwrite it (allow manual override)
   - Show a read-only preview below the slug input: "plainprophecy.com/blog/[slug-value]"
   - Add a "Regenerate" icon button next to the slug field that overwrites with fresh slug from title
   - Validate slug format on submit (only lowercase letters, numbers, hyphens)
   - Show inline error if slug contains invalid characters

3. Do NOT add a server-side uniqueness check yet — keep this task focused on client-side UX only.

Use the existing form patterns (React Hook Form) already in these files. Do not change any 
other fields or form logic.
```

**Verify:**
- Type a title, tab out → slug auto-fills
- Edit the slug manually → title blur no longer overwrites
- Click regenerate → slug updates from current title
- Try to submit with `My Slug Here` → validation error

---

### Task 1.3 — Search + Filter on All List Pages

**Why:** Once you have 20+ prophecies, 50+ blog posts, and 100+ lessons, unfiltered lists become unusable.

**Files to modify:**
```
app/admin/blog/page.tsx
app/admin/prophecies/page.tsx
app/admin/studies/page.tsx
app/admin/evidence/page.tsx
app/admin/timelines/page.tsx
app/admin/doctrines/page.tsx
app/admin/pillars/page.tsx        ← just created
app/admin/compare/page.tsx        ← just created
```

**Claude Code prompt:**
```
Read these files:
- app/admin/blog/page.tsx
- app/admin/prophecies/page.tsx
- convex/blog.ts
- convex/prophecies.ts

Task: Add client-side search and status filtering to all admin list pages.

Pattern to apply consistently to ALL 8 list pages:

1. Add a search bar above the table (shadcn/ui Input component):
   - Placeholder: "Search [content type]..."
   - Filters the displayed list by title (case-insensitive includes match)
   - Uses useState — client-side filtering only, do not modify Convex queries

2. Add a status filter (shadcn/ui Select component, placed next to search):
   - Options: "All", "Published", "Draft"
   - Filters by published boolean

3. Layout: 
   - Search and filter bar in a flex row, justified between the "New [Item]" button
   - Full width on mobile (stacked), row on desktop

4. Empty state:
   - If no results match, show: "No results for "[search term]"" with a clear button
   - If list is genuinely empty (no content created), keep existing empty state

5. Sort: Add a sort button (icon only) that toggles A→Z / Z→A by title. Default: most 
   recently created first (preserve existing default order from Convex).

Apply this pattern identically to all 8 list pages. Create a shared component 
components/admin/ListControls.tsx that accepts: 
  - value: string (search value)
  - onValueChange: (v: string) => void
  - statusFilter: "all" | "published" | "draft"
  - onStatusChange: (v: "all" | "published" | "draft") => void
  - sortOrder: "asc" | "desc"
  - onSortChange: () => void
  - newItemHref: string
  - newItemLabel: string

Then use ListControls in every list page.
```

**Verify:**
- Type in search → list filters live
- Switch to "Draft" → only drafts show
- Switch to "Published" → only published show
- Click sort → alphabetical order toggles

---

## Phase 2 — Editorial Quality of Life

These make the editing experience significantly better and prevent data loss.

---

### Task 2.1 — Unsaved Changes Warning

**Why:** Editors will accidentally navigate away mid-edit. This is a data loss issue.

**Files to modify:**
```
components/admin/AdminTopBar.tsx
app/admin/blog/[id]/page.tsx         ← and all other edit pages
```

**Claude Code prompt:**
```
Read these files:
- components/admin/AdminTopBar.tsx
- app/admin/blog/[id]/page.tsx
- app/admin/prophecies/[id]/page.tsx

Task: Add unsaved changes detection and warning across all edit form pages.

1. Create a custom hook at hooks/useUnsavedChanges.ts:
   - Accepts isDirty: boolean from React Hook Form's formState
   - When isDirty is true, adds a beforeunload event listener to warn on tab close
   - When isDirty is true and user tries to navigate (Next.js router), shows a confirm dialog
   - When form is submitted successfully, resets dirty state

2. Create a component components/admin/UnsavedBadge.tsx:
   - Shows an amber dot + "Unsaved changes" text when isDirty is true
   - Animates in/out with a fade transition
   - Designed to sit in the AdminTopBar's right side, left of the sign-out button

3. Update AdminTopBar.tsx to accept an optional isDirty prop:
   - When isDirty is true, render UnsavedBadge
   - Keep existing sign-out button

4. Apply useUnsavedChanges and pass isDirty to AdminTopBar in ALL edit form pages:
   - app/admin/blog/[id]/page.tsx
   - app/admin/prophecies/[id]/page.tsx
   - app/admin/doctrines/[id]/page.tsx
   - app/admin/evidence/[id]/page.tsx
   - app/admin/timelines/[id]/page.tsx
   - app/admin/studies/[courseId]/page.tsx
   - app/admin/studies/[courseId]/lessons/[lessonId]/page.tsx
   - app/admin/pillars/[id]/page.tsx
   - app/admin/compare/[id]/page.tsx

The warning dialog should use a simple window.confirm for the navigation case — do not 
add shadcn Dialog overhead for this feature.
```

**Verify:**
- Edit any field → "Unsaved changes" dot appears in top bar
- Try clicking sidebar link → browser confirm dialog appears
- Save form → dot disappears
- Refresh page with unsaved changes → browser warns

---

### Task 2.2 — Content Preview

**Why:** Editors need to see exactly how published content will look before they hit publish. Critical for prophecy pages with complex formatting.

**Files to create:**
```
app/preview/[type]/[id]/page.tsx
app/preview/layout.tsx
lib/preview-token.ts
```

**Files to modify:**
```
app/admin/blog/[id]/page.tsx       ← add Preview button
app/admin/prophecies/[id]/page.tsx ← add Preview button
convex/auth.ts (or wherever session is handled)
```

**Claude Code prompt:**
```
Read these files:
- app/admin/blog/[id]/page.tsx
- app/prophecy/[slug]/page.tsx    ← the live public page for prophecies
- app/blog/[slug]/page.tsx        ← the live public page for blog posts
- convex/blog.ts
- convex/prophecies.ts
- convex/auth.ts

Task: Implement a preview system for unpublished content.

1. lib/preview-token.ts:
   - Generate a signed preview token: btoa(JSON.stringify({ id, type, exp: Date.now() + 3600000 }))
   - Verify token and check it hasn't expired
   - This is a simple client-side approach, not JWT — acceptable for a non-sensitive CMS

2. app/preview/layout.tsx:
   - Show a yellow preview banner at the top: "You are previewing unpublished content"
   - Banner has a link "Back to admin" and "Publish now" action
   - Layout is otherwise identical to the public site

3. app/preview/[type]/[id]/page.tsx:
   - Accepts ?token= query param
   - Verify the token matches the id
   - Fetch the content (draft or published) by ID from Convex, bypassing published check
   - Render using the same components as the live public pages
   - If token invalid or expired: show "Preview expired" message

4. In all admin edit pages, add a "Preview" button (Eye icon, shadcn/ui Button variant="outline"):
   - Button generates a token and opens /preview/[type]/[id]?token=[token] in a new tab
   - Only enable this button when the item has been saved at least once (id exists)
   - Place it beside the "Save" button in the form actions area

Keep the token logic simple — no database storage required. Expiry in 1 hour is sufficient.
```

**Verify:**
- Edit a draft blog post → "Preview" button visible
- Click Preview → new tab opens with yellow banner
- Content renders as it would look when published
- Modify content, save, refresh preview → shows updated content

---

### Task 2.3 — Image Upload via Convex Storage

**Why:** Currently blog posts and evidence items require external image URLs. This is fragile (URLs break) and friction-heavy for non-technical editors.

**Files to create:**
```
components/admin/ImageUploadField.tsx
convex/files.ts
```

**Files to modify:**
```
convex/schema.ts                      ← ensure imageStorageId fields exist
app/admin/blog/[id]/page.tsx          ← replace URL input with upload component
app/admin/evidence/[id]/page.tsx      ← same
```

**Claude Code prompt:**
```
Read these files:
- convex/schema.ts
- convex/files.ts (if exists, otherwise start fresh)
- app/admin/blog/[id]/page.tsx
- components/admin/AdminSidebar.tsx   ← for styling reference
- https://docs.convex.dev/file-storage/upload-files (conceptual reference only — use your knowledge of Convex storage API)

Task: Add image upload support using Convex file storage.

1. convex/files.ts:
   - generateUploadUrl mutation: returns a Convex upload URL
   - saveFile mutation: takes storageId, returns the URL
   - getImageUrl query: takes storageId, returns the URL using ctx.storage.getUrl()
   - deleteFile mutation: removes from storage

2. components/admin/ImageUploadField.tsx (client component):
   - Props: value: string | null (current image URL or storageId), onChange: (url: string) => void, label?: string
   - Shows current image as a preview thumbnail (80px × 80px, rounded)
   - Has a "Upload image" button (uses input type="file", accept="image/*")
   - On file selection:
     a. Call generateUploadUrl to get signed URL
     b. PUT the file to the URL
     c. Call saveFile to get the public URL
     d. Call onChange(url) with the resulting URL
   - Shows upload progress (simple "Uploading..." text state)
   - Has a "Remove" button to clear the image
   - Shows error toast on failure
   - Max file size check: 5MB (client-side, before upload)
   - Accepted formats: jpg, jpeg, png, webp

3. Update blog and evidence edit pages:
   - Replace the cover image URL text input with ImageUploadField
   - The field should still accept a pasted URL (fallback) — add a toggle "Use URL instead"
   - This toggle preserves both workflows

4. Do NOT change the schema field names. Use whichever field currently holds the image URL 
   (coverImage, imageUrl, etc.) — keep storing as a URL string after upload.
```

**Verify:**
- Upload a .jpg → thumbnail appears in form
- Save → image renders on the public-facing page
- Try uploading a 10MB file → blocked with error
- Remove image → field clears

---

## Phase 3 — SEO & Content Quality

These unlock the site's discoverability before you start driving traffic.

---

### Task 3.1 — SEO Meta Fields

**Why:** Every prophecy page and blog post needs its own title tag, meta description, and OG image for social sharing. Without this, all pages share the same metadata.

**Files to modify:**
```
convex/schema.ts                   ← add seo fields to blog, prophecies
convex/blog.ts                     ← update mutation to accept seo fields
convex/prophecies.ts               ← same
app/admin/blog/[id]/page.tsx       ← add SEO section to form
app/admin/prophecies/[id]/page.tsx ← same
app/blog/[slug]/page.tsx           ← use seo fields in generateMetadata
app/prophecy/[slug]/page.tsx       ← same
```

**Claude Code prompt:**
```
Read these files:
- convex/schema.ts
- convex/blog.ts
- convex/prophecies.ts
- app/admin/blog/[id]/page.tsx
- app/blog/[slug]/page.tsx

Task: Add SEO meta fields to blog and prophecy content types.

1. convex/schema.ts — add optional fields to blog and prophecy tables:
   - seoTitle: v.optional(v.string())     — max 60 chars
   - seoDescription: v.optional(v.string()) — max 160 chars
   - ogImage: v.optional(v.string())       — URL or storageId

2. convex/blog.ts and convex/prophecies.ts:
   - Update create/update mutations to accept and persist these fields

3. Create components/admin/SeoSection.tsx:
   - A collapsible accordion section (shadcn/ui Accordion, collapsed by default)
   - Title: "SEO & Sharing"
   - Fields:
     a. SEO Title (Input) — shows character count, warns red at 61+, "0/60"
     b. Meta Description (Textarea, 2 rows) — shows character count, warns red at 161+, "0/160"
     c. OG Image (use ImageUploadField from Task 2.3, or URL fallback)
   - Below each field: faint helper text explaining what it does
   - At the bottom of the section: a preview card showing what a Google search result 
     would look like (title in blue, description in grey, URL in green) — keep this simple, 
     HTML/CSS only, no external libraries

4. Add SeoSection to blog and prophecy edit forms:
   - Place it as the LAST section, below all content fields
   - Register fields with React Hook Form

5. Update generateMetadata in app/blog/[slug]/page.tsx and app/prophecy/[slug]/page.tsx:
   - Use seoTitle if present, fall back to title
   - Use seoDescription if present, fall back to a truncated excerpt
   - Use ogImage if present, fall back to site default OG image
   - Add Twitter card meta tags as well

Do not create SEO fields for other content types (studies, evidence, etc.) in this task.
```

**Verify:**
- Edit a blog post → SEO accordion visible at bottom
- Type 65-char title → character counter turns red
- Publish post → view source on public page → correct title tag present
- Share URL on Twitter → OG image from the field appears

---

## Phase 4 — Data Safety & Collaboration

Build these before inviting any other editors to use the CMS.

---

### Task 4.1 — Revision History

**Why:** Every save should be reversible. Without this, a mis-edit can permanently destroy content that took hours to write.

**Files to create:**
```
convex/revisions.ts
components/admin/RevisionHistory.tsx
app/admin/[section]/[id]/history/page.tsx  ← one pattern, applied to all sections
```

**Claude Code prompt:**
```
Read these files:
- convex/schema.ts
- app/admin/blog/[id]/page.tsx
- convex/blog.ts

Task: Build a revision history system for all content types.

1. convex/schema.ts — add revisions table:
   defineTable({
     contentType: v.string(),    // "blog" | "prophecy" | "doctrine" | etc.
     contentId: v.id("blog"),    // or generic v.string() for cross-table
     snapshot: v.string(),       // JSON.stringify of full content object
     savedAt: v.number(),        // Date.now()
     savedBy: v.optional(v.string()), // user email from session
   })

2. convex/revisions.ts:
   - saveRevision mutation: called every time content is saved — takes contentType, contentId, snapshot
   - getRevisions query: returns last 20 revisions for a given contentType + contentId
   - getRevision query: returns a single revision by id
   - deleteOldRevisions mutation: keeps only last 20 per content item (prune on each save)

3. Update ALL content update mutations to call saveRevision internally after saving.

4. components/admin/RevisionHistory.tsx (client component):
   - Props: contentType: string, contentId: string
   - Displays a right-side panel (Sheet from shadcn/ui)
   - Shows list of saves: "Saved 3 minutes ago" (relative time), previews first 60 chars of title/content
   - Each row has a "Restore" button
   - "Restore" shows a confirm dialog: "This will replace the current version. Continue?"
   - On confirm: calls a restoreRevision mutation that overwrites the current record with the snapshot
   - Has a "History" button trigger (Clock icon) to open the Sheet

5. Add the RevisionHistory component to ALL edit pages:
   - Mount it beside the Save button in the form actions
   - Pass the current contentType and contentId

Keep snapshot storage lean: stringify only the content fields, not metadata like updatedAt.
```

**Verify:**
- Save a post → edit it → save again → click History icon → 2 revisions listed
- Click "Restore" on older revision → content reverts
- Verify only 20 revisions are kept (create 22, check oldest is pruned)

---

### Task 4.2 — Role-Based Access Control

**Why:** You will eventually have guest editors. They must not be able to publish or delete.

**Files to create:**
```
app/admin/users/page.tsx
app/admin/users/[id]/page.tsx
convex/users.ts (extend)
```

**Files to modify:**
```
convex/schema.ts              ← add role to users table
middleware.ts                 ← role-aware route protection
components/admin/AdminSidebar.tsx ← hide restricted links
All Convex mutations           ← add role checks
```

**Claude Code prompt:**
```
Read these files:
- convex/schema.ts
- convex/auth.ts
- middleware.ts
- components/admin/AdminSidebar.tsx
- app/admin/blog/page.tsx
- convex/blog.ts

Task: Implement three-tier role-based access control.

Roles:
- editor: can create and edit content. CANNOT publish, unpublish, or delete.
- publisher: can create, edit, and publish/unpublish. CANNOT delete.
- admin: full access including delete and user management.

First admin is determined by being the first user created in the system (set as admin on signup).

1. convex/schema.ts:
   - Add role: v.union(v.literal("editor"), v.literal("publisher"), v.literal("admin")) 
     to the users table. Default: "editor" for new users.

2. convex/users.ts:
   - getCurrentUserRole query: returns current user's role
   - updateUserRole mutation (admin only): changes another user's role
   - listUsers query (admin only): returns all users with email and role

3. Convex mutation updates — add role enforcement to EVERY content mutation:
   - For delete mutations: check role === "admin" or throw "Unauthorized"
   - For publish mutations: check role === "publisher" || role === "admin" or throw
   - Create/update mutations: accessible to all roles

4. AdminSidebar.tsx:
   - Fetch current user role
   - Hide "Users" link unless role === "admin"
   - Show a faint role badge ("Editor", "Publisher", "Admin") below "Admin" label at top of sidebar

5. In all list pages and edit pages:
   - Disable the "Delete" button for non-admin users (render as disabled, not hidden)
   - Disable the "Published" toggle for editor role
   - Show a tooltip on disabled controls: "Your role does not have permission"

6. app/admin/users/page.tsx:
   - Table: email, role (Select dropdown to change inline), joined date
   - Only accessible to admin role (redirect others)

7. app/admin/users/[id]/page.tsx:
   - Simple form to change role
   - Cannot change own role (prevent accidental lockout)

Do not change the authentication system — this is purely an authorization layer on top.
```

**Verify:**
- Create an "editor" test account → delete button is disabled
- Publish toggle is disabled for editor
- Create a "publisher" test account → can publish, cannot delete
- Admin can do everything
- Users page only accessible to admin role

---

## Phase 5 — Advanced Features (Ship When Ready)

Build these once the CMS is stable and being used regularly.

---

### Task 5.1 — Scheduled Publishing

**Files to modify:** `convex/schema.ts`, all publishable content schemas and mutations  
**New files:** `convex/scheduler.ts`

**Claude Code prompt:**
```
Read these files:
- convex/schema.ts
- convex/blog.ts
- convex/prophecies.ts

Task: Add scheduled publishing support.

1. Add scheduledPublishAt: v.optional(v.number()) to blog and prophecies tables in schema.

2. Update edit forms for blog and prophecy:
   - Add a "Schedule publish" date-time picker below the Published toggle
   - Only shown when Published is false
   - Uses shadcn/ui Calendar + shadcn/ui Popover for the date picker

3. convex/scheduler.ts:
   - Use ctx.scheduler.runAt() to schedule a publishContent action for the given timestamp
   - Store the scheduled function ID so it can be cancelled
   - publishContent action: sets published: true, clears scheduledPublishAt

4. On the list pages, add a "Scheduled" badge (purple) for items with scheduledPublishAt set.

5. Allow cancelling a scheduled publish: "Cancel schedule" button on edit page.
```

---

### Task 5.2 — Rich Text / Markdown Editor

**Files to modify:** All edit pages with body/content text fields

**Claude Code prompt:**
```
Read these files:
- app/admin/blog/[id]/page.tsx
- package.json

Task: Replace plain Textarea fields with a Markdown editor.

Install: @uiw/react-md-editor

1. Create components/admin/MarkdownEditor.tsx:
   - Wraps @uiw/react-md-editor
   - Accept: value: string, onChange: (v: string) => void
   - Default to edit mode on desktop, preview tab available
   - Dark theme (the editor supports this)
   - Min height: 400px

2. Replace all <Textarea> fields named "body", "content", or "description" 
   (long-form, not slugs or titles) in these pages with MarkdownEditor:
   - app/admin/blog/[id]/page.tsx
   - app/admin/prophecies/[id]/page.tsx  
   - app/admin/doctrines/[id]/page.tsx
   - app/admin/studies/[courseId]/lessons/[lessonId]/page.tsx

3. Ensure output is still plain Markdown string — compatible with existing MDX rendering.

Do not change any other form logic or field names.
```

---

### Task 5.3 — Dashboard Improvements

**Files to modify:** `app/admin/page.tsx`

**Claude Code prompt:**
```
Read these files:
- app/admin/page.tsx
- convex/blog.ts
- convex/prophecies.ts
- convex/schema.ts

Task: Improve the admin dashboard with live data.

1. Ensure all content schemas have updatedAt: v.number() field. Add to any missing.
   Update all create/update mutations to set updatedAt: Date.now().

2. Create convex/dashboard.ts:
   - dashboardStats query: returns counts for each content type, split by published/draft
   - recentlyEdited query: returns the last 8 edited items across all content types, 
     each with { contentType, title, updatedAt, slug, id }

3. Update app/admin/page.tsx:
   - Replace static counts with live counts from dashboardStats
   - Add "Recently Edited" section below the stats cards
     - Shows a list of the 8 most recently edited items
     - Each item: content type badge, title, relative time ("2 hours ago")
     - Title is a link to the edit page
   - Add "Needs Attention" section:
     - Count of drafts older than 14 days (stale drafts)
     - Count of content with missing SEO fields

Keep the existing dark design system. Use the same card/badge patterns already in use.
```

---

## Phase 6 — Plain Prophecy-Specific Features

These are unique to your content model and publishing goals.

---

### Task 6.1 — Prophecy Visualization Manager

**Why:** Your interactive HTML pages (Daniel 2, 7, 9) are self-contained files outside the CMS. As you build Daniel 8, 12, and Revelation series, you need a way to track which visualizations exist and link them to their study content.

**Files to create:**
```
app/admin/visualizations/page.tsx
app/admin/visualizations/[id]/page.tsx
convex/visualizations.ts
```

**Claude Code prompt:**
```
Read these files:
- convex/schema.ts
- app/admin/prophecies/page.tsx
- daniel2.html (reference for what a visualization is)

Task: Create a Visualization registry in the CMS.

A "Visualization" is a standalone interactive HTML page (like daniel2.html, daniel7.html).
The CMS doesn't need to edit the HTML — it needs to track and link them.

1. convex/schema.ts — add visualizations table:
   - title: v.string()                    // "Daniel 2 — The Statue"
   - slug: v.string()                     // "daniel-2-statue"
   - description: v.optional(v.string())
   - htmlFilePath: v.string()             // "/visualizations/daniel2.html"
   - linkedProphecyId: v.optional(v.id("prophecies"))
   - linkedStudyId: v.optional(v.id("studyCourses"))
   - status: v.union(v.literal("live"), v.literal("in-progress"), v.literal("planned"))
   - _creationTime: built-in

2. convex/visualizations.ts: standard CRUD queries and mutations

3. app/admin/visualizations/page.tsx:
   - List all visualizations with title, status badge, linked prophecy/study
   - Status badge colours: live=green, in-progress=amber, planned=grey
   - "Open" button that links to the live HTML file in a new tab

4. app/admin/visualizations/[id]/page.tsx:
   - Fields: title, slug, description, htmlFilePath, linkedProphecyId (searchable select), 
     linkedStudyId (searchable select), status
   - Simple form, same patterns as other admin pages

5. Add "Visualizations" to AdminSidebar.tsx (use Sparkles icon).

This is a registry only — it does not edit the HTML files themselves.
```

---

### Task 6.2 — Scripture Reference Tagger

**Why:** Across all your content, you cite dozens of Bible references (Daniel 2:44, Luke 2:1, etc.). A structured tagging system lets you build a "related passages" feature and ensures internal consistency.

**Files to create:**
```
components/admin/ScriptureTagField.tsx
lib/scripture.ts
```

**Claude Code prompt:**
```
Task: Create a reusable scripture reference tag component for content forms.

1. lib/scripture.ts:
   - parseScriptureRef(input: string): { book: string, chapter: number, verse?: number, verseEnd?: number } | null
   - Parses inputs like "Daniel 2:44", "Luke 2:1-3", "Revelation 12:7"
   - Returns null if format is unrecognised
   - formatRef(ref): string — turns parsed ref back to a canonical string "Daniel 2:44"

2. components/admin/ScriptureTagField.tsx:
   - Props: value: string[] (array of scripture refs), onChange: (refs: string[]) => void
   - Input field: user types a reference, presses Enter or comma to add it
   - As they type, validate with parseScriptureRef — show a red border if format invalid
   - Show each added reference as a removable chip/badge (amber colour, × to remove)
   - Max 20 references per field
   - Accepts common abbreviations: "Dan" → "Daniel", "Rev" → "Revelation", etc.

3. Add ScriptureTagField to:
   - app/admin/prophecies/[id]/page.tsx — "Key Scriptures" field (store as keyScriptures: string[])
   - app/admin/blog/[id]/page.tsx — "Referenced Scriptures" field (store as scriptures: string[])

4. Update convex/prophecies.ts and convex/blog.ts schemas to accept these arrays.

The scripture tags are for editorial reference and future features — do not build 
any front-end rendering for them in this task.
```

---

### Task 6.3 — Social Content Generator (AI-Powered)

**Why:** Your strategy includes Twitter/X threads and eventually Shorts. This automates the most time-consuming content repurposing task.

**Files to create:**
```
app/admin/blog/[id]/social/page.tsx
app/admin/prophecies/[id]/social/page.tsx
components/admin/SocialGenerator.tsx
```

**Claude Code prompt:**
```
Read these files:
- app/admin/blog/[id]/page.tsx
- CLAUDE.md (for the site's voice, tone, and theological rules)
- convex/blog.ts

Task: Build an AI-powered social content generator for blog posts and prophecy pages.

This uses the Anthropic API client-side via a Next.js API route.

1. app/api/generate-social/route.ts:
   - POST endpoint
   - Accepts: { title, body, contentType: "blog" | "prophecy", platform: "twitter" | "thread" }
   - Calls Anthropic API (claude-sonnet-4-20250514) with a carefully crafted system prompt 
     that embeds the Plain Prophecy voice guidelines from CLAUDE.md:
     * Tone: warm, approachable, Relevant Magazine style
     * Never fear-based, never sensationalist
     * Always anchors to Christ
     * Always includes a scripture reference
     * Never speculative date-setting
   - For "thread": returns 5-8 tweet-sized segments (max 280 chars each), structured as JSON array
   - For "twitter": returns a single punchy tweet (max 280 chars)
   - Return JSON: { platform, content: string[] }
   - Add rate limiting: max 10 requests per hour per session (use in-memory Map, not DB)

2. components/admin/SocialGenerator.tsx:
   - Platform tabs: "Twitter Thread" | "Single Tweet"
   - "Generate" button → calls the API route with current form values
   - Shows loading state (shimmer skeleton)
   - Renders generated content:
     * For thread: numbered cards, each card shows the tweet text + character count
     * For tweet: single card
   - Each card has a "Copy" button (copies individual tweet to clipboard)
   - "Copy All" button for threads (copies all tweets joined with \n\n---\n\n)
   - "Regenerate" button to try again
   - Shows a warning: "Always review AI-generated content for theological accuracy before posting."

3. Add a "Generate Social Content" tab/button on blog and prophecy edit pages:
   - Appears after the main form has been saved (id exists)
   - Opens the SocialGenerator in a Sheet (right side panel)

The API route must use the ANTHROPIC_API_KEY environment variable. 
Add it to .env.local and note it in the comments. Do not expose the key client-side.
```

**Verify:**
- Open a saved blog post → "Social Content" button visible
- Click it → Sheet opens
- Click "Generate" → loading state shows → thread appears
- Each tweet has correct char count
- Copy button works
- Warning message is visible

---

## Implementation Sequence (Recommended)

| Order | Task | Why |
|---|---|---|
| 1 | 1.1 — Missing Pages | Pillars/Compare have zero admin access |
| 2 | 1.2 — Slug Auto-Generation | Prevents data quality debt immediately |
| 3 | 1.3 — Search + Filter | Essential once content grows past 20 items |
| 4 | 2.1 — Unsaved Changes Warning | Prevent data loss before more editors |
| 5 | 3.1 — SEO Fields | Needed before any SEO push |
| 6 | 2.3 — Image Upload | Unblocks richer blog + evidence content |
| 7 | 2.2 — Content Preview | Editorial confidence before publish |
| 8 | 4.1 — Revision History | Safety net before inviting collaborators |
| 9 | 6.1 — Visualization Registry | Needed as Daniel 8, 12, Revelation series begins |
| 10 | 4.2 — RBAC | Required before inviting any guest editors |
| 11 | 6.2 — Scripture Tagger | Content quality + future feature enabler |
| 12 | 6.3 — Social Generator | Content repurposing at scale |
| 13 | 5.1 — Scheduled Publishing | Editorial workflow refinement |
| 14 | 5.2 — Rich Text Editor | Polish after stable usage |
| 15 | 5.3 — Dashboard Improvements | Follows revision history completion |

---

## Claude Code Usage Tips

### Before Each Task
Always open the referenced files first before running the prompt. Add this preamble:
```
Before you start, read: [list the files from the task's "Read these files" section].
Confirm you've read them before writing any code.
```

### Staying in Scope
Each prompt has a "Do not..." section. If Claude Code starts going off-scope (e.g. redesigning unrelated components), interrupt with: "Stay focused on the task. Do not modify anything outside the files listed."

### Pattern Consistency
Your codebase has established patterns. Reinforce them with:
```
Match the exact patterns already used in the codebase. 
Do not introduce new libraries, component patterns, or design approaches 
not already present in the existing admin pages.
```

### Convex Schema Changes
Any schema change requires a Convex deployment. After Task 3.1, 4.1, 4.2, 5.1, and 6.1, run:
```bash
npx convex deploy
```

### Verify Checklist (Run After Every Task)
- [ ] TypeScript compiles without errors (`next build`)
- [ ] No `console.error` in browser dev tools
- [ ] Mobile view: admin pages still usable at 375px width
- [ ] Test the happy path + at least one error state per feature
- [ ] Convex dashboard shows no failed mutations

---

## Environment Variables Needed

```env
# Already set
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=

# Add for Task 6.3
ANTHROPIC_API_KEY=
```

---

## File Structure After All Tasks

```
app/
├── admin/
│   ├── compare/          ← NEW (Task 1.1)
│   ├── pillars/          ← NEW (Task 1.1)
│   ├── users/            ← NEW (Task 4.2)
│   └── visualizations/   ← NEW (Task 6.1)
├── api/
│   └── generate-social/  ← NEW (Task 6.3)
└── preview/              ← NEW (Task 2.2)

components/admin/
├── ImageUploadField.tsx   ← NEW (Task 2.3)
├── ListControls.tsx       ← NEW (Task 1.3)
├── MarkdownEditor.tsx     ← NEW (Task 5.2)
├── RevisionHistory.tsx    ← NEW (Task 4.1)
├── ScriptureTagField.tsx  ← NEW (Task 6.2)
├── SeoSection.tsx         ← NEW (Task 3.1)
├── SocialGenerator.tsx    ← NEW (Task 6.3)
├── UnsavedBadge.tsx       ← NEW (Task 2.1)
├── AdminSidebar.tsx       ← MODIFIED (Tasks 1.1, 4.2, 6.1)
└── AdminTopBar.tsx        ← MODIFIED (Task 2.1)

convex/
├── dashboard.ts           ← NEW (Task 5.3)
├── files.ts               ← NEW (Task 2.3)
├── revisions.ts           ← NEW (Task 4.1)
├── scheduler.ts           ← NEW (Task 5.1)
├── users.ts               ← MODIFIED (Task 4.2)
├── visualizations.ts      ← NEW (Task 6.1)
└── schema.ts              ← MODIFIED (Tasks 1.1, 2.3, 3.1, 4.1, 4.2, 5.1, 6.1, 6.2)

hooks/
└── useUnsavedChanges.ts   ← NEW (Task 2.1)

lib/
├── preview-token.ts       ← NEW (Task 2.2)
├── scripture.ts           ← NEW (Task 6.2)
└── slug.ts                ← NEW (Task 1.2)
```

---

*Last updated: March 2026. Stack: Next.js 15, Tailwind v4, Convex, shadcn/ui.*
