# Resume Studio — Production-Grade ATS Resume Builder

> A modern, high-performance web application designed for both **graduating Freshers** and **Experienced Software Engineers** to craft, preview in real time, and export ATS-compliant resumes with zero friction. Built for Software Development Engineer (SDE) portfolio showcase.

---

## 🚀 Key Features (Phase 1)

1. **Dual Career Stage Workflows**:
   - **Fresher Mode**: Prioritizes education, technical projects, programming languages/frameworks, academic achievements, and certifications.
   - **Experienced Mode**: Emphasizes quantifiable achievements, employment history, leadership, production system scale, and senior technical competencies.
   - Quick one-click mode switching without loss of common data.

2. **Real-Time Live Document Preview**:
   - Split-screen workspace on desktop with responsive tabbed switching on tablet and mobile.
   - Standard A4 document canvas with realistic proportions, margins, and zoom controls (60% to 130%).
   - Keystroke-level instant synchronization driven by Redux Toolkit.

3. **Multiple Curated ATS Templates**:
   - **Modern Tech**: Contemporary sans-serif layout with accent badges and compact skill tags.
   - **Executive Classic**: Timeless Harvard/Ivy League serif typography with horizontal rules and formal hierarchy.
   - **Minimalist Clean**: Swiss two-column layout with left contact/skills sidebar and spacious reading flow.
   - Switch between templates anytime with zero data loss.

4. **Curated Color Themes**:
   - 6 professional palettes: Slate Graphite, Modern Indigo, Corporate Navy, Forest Emerald, Crimson Burgundy, and Amber Bronze.

5. **Client-Side Persistence (Zero-Login Privacy)**:
   - Resumes automatically persist in browser `localStorage` using a versioned schema.
   - Safe SSR hydration handling to eliminate server/client mismatches.
   - Graceful fallback for corrupted/missing storage data.
   - Confirmable destructive reset to clear stored resume data.

6. **High-Fidelity PDF Export**:
   - Direct client-side vector/canvas PDF download powered by `jspdf` and `html2canvas` scaled at 2x for crisp print quality.
   - Print-optimized CSS (`@media print`) and native system print support.

7. **Real-Time Resume Strength Meter**:
   - Computes a completion score (0–100%) and provides actionable advice to optimize recruiter screening passes.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) (Strict Mode) |
| **UI Library** | [React 19](https://react.dev/) |
| **State Management** | [Redux Toolkit](https://redux-toolkit.js.org/) & React-Redux |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla Print CSS |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **PDF Generation** | [jsPDF](https://github.com/parallax/jsPDF) & [html2canvas](https://html2canvas.hertzen.com/) |
| **Testing** | Node.js Test Runner with [TSX](https://github.com/privatenumber/tsx) |

---

## 📁 Project Architecture & Directory Structure

```text
resume-builder/
├── app/
│   ├── builder/
│   │   └── page.tsx              # Main Resume Studio workspace route
│   ├── build_resume/
│   │   └── page.tsx              # Backwards-compatible route redirecting to /builder
│   ├── globals.css               # Design tokens, print styles, custom scrollbar
│   ├── layout.tsx                # Root layout with SEO metadata & Redux Provider
│   └── page.tsx                  # Landing page (Header, Hero, Features, Showcase, Footer)
├── components/
│   ├── builder/
│   │   ├── editor/               # Granular section form editors
│   │   │   ├── AdditionalSectionsForm.tsx
│   │   │   ├── CertificationsForm.tsx
│   │   │   ├── EducationForm.tsx
│   │   │   ├── ExperienceForm.tsx
│   │   │   ├── PersonalInfoForm.tsx
│   │   │   ├── ProjectsForm.tsx
│   │   │   ├── SkillsForm.tsx
│   │   │   └── SummaryForm.tsx
│   │   ├── preview/
│   │   │   ├── templates/        # Independent resume templates
│   │   │   │   ├── ClassicTemplate.tsx
│   │   │   │   ├── MinimalTemplate.tsx
│   │   │   │   ├── ModernTemplate.tsx
│   │   │   │   └── TemplateRenderer.tsx
│   │   │   └── ResumePreviewContainer.tsx  # A4 canvas with zoom controls
│   │   ├── BuilderLayout.tsx     # Split-screen responsive container
│   │   ├── BuilderToolbar.tsx    # Templates, colors, sample loader, PDF export
│   │   ├── ResumeStrength.tsx    # Live completeness scoring widget
│   │   └── ResumeTypeModal.tsx   # Fresher vs Experienced career selector
│   ├── landing/                  # Landing page presentation components
│   │   ├── Features.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   └── TemplateShowcase.tsx
│   ├── providers/
│   │   └── ReduxProvider.tsx     # Client Redux provider with hydration sync
│   └── ui/                       # Reusable accessible UI primitives
│       ├── Badge.tsx
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Dialog.tsx
│       ├── Input.tsx
│       └── Textarea.tsx
├── lib/
│   ├── auth/
│   │   └── types.ts              # Contracts prepared for Phase 2 authentication
│   ├── cms/
│   │   ├── client.ts             # Decoupled CMS client with graceful fallback
│   │   └── types.ts              # Contracts prepared for Phase 2 Payload CMS
│   ├── constants/
│   │   └── themes.ts             # Palette definitions for themes
│   ├── storage/
│   │   └── localStorage.ts       # Hydration-safe browser persistence
│   ├── store/
│   │   ├── slices/
│   │   │   ├── resumeSlice.ts    # Redux resume state & granular actions
│   │   │   └── uiSlice.ts        # Transient UI state (zoom, active tabs, modals)
│   │   ├── hooks.ts              # Typed useAppDispatch & useAppSelector
│   │   └── store.ts              # Configured store with debounced persistence
│   ├── types/
│   │   ├── resume.ts             # Central TypeScript data model
│   │   └── template.ts           # Template definition schema
│   └── utils/
│       ├── pdfExport.ts          # jsPDF / html2canvas & native print helpers
│       ├── sampleData.ts         # High quality sample profiles (Fresher & SDE)
│       └── validation.ts         # Email/URL validation & strength calculator
└── tests/
    ├── localStorage.test.ts      # Storage validation tests
    ├── resumeSlice.test.ts       # State mutation and reordering tests
    └── validation.test.ts        # Validation & strength score tests
```

---

## 🧩 Architectural Decisions & Design Rationale

### 1. State Management & Hydration Safety
- **Redux Toolkit**: Resume data is centralized in `resumeSlice` and shared seamlessly across the editor, preview renderer, and PDF export tool.
- **Separation of Concerns**: Transient UI state (zoom level, active accordion, active tab) is isolated in `uiSlice` and **never written to local storage**, ensuring localStorage only stores actual resume content.
- **Hydration Safety**: The initial store state matches SSR. Local storage is queried in a client-only `useEffect` in `ReduxProvider.tsx` and dispatches `loadResumeData` without hydration mismatches.

### 2. Template Decoupling
- Templates receive a standard `ResumeData` object and render purely based on data and theme configuration.
- Adding a new template requires creating a component conforming to `TemplateProps` and registering it in `AVAILABLE_TEMPLATES` — zero changes required in editor forms or Redux state.

### 3. Dual PDF Strategy
- **Client-Side jsPDF + html2canvas**: Generates a standard multi-page A4 PDF file directly in the browser at 2x device scale, enabling 1-click downloads with custom filenames (`[Name]_Resume.pdf`).
- **Native Print CSS**: Includes clean `@media print` rules hiding editor toolbars and optimizing page breaks, allowing users to use `window.print()` for ultra-crisp vector PDFs via the browser print dialog.

---

## 🔮 Phase 2 Roadmap & Architecture Readiness

The current architecture is specifically structured to support Phase 2 without rewriting core features:

1. **Payload CMS Integration**:
   - `lib/cms/types.ts` and `lib/cms/client.ts` define contracts for dynamic landing page content and template catalogs.
   - In Phase 2, `getLandingPageContent()` and `getTemplateDefinitions()` will query Payload's Local API or REST endpoints (`/api/globals/landing-page`). If Payload is unreachable, sensible local defaults are returned automatically.

2. **Authentication & Cloud Storage**:
   - `lib/auth/types.ts` defines user sessions and resume ownership records.
   - For Next.js 16, route protection and session verification will be enforced at the server route level (`proxy.ts` / server middleware) and Server Actions, ensuring client-side route hiding is never the sole line of defense.
   - When a user logs in, Redux state can be synced to PostgreSQL or MongoDB via authenticated API endpoints.

---

## 💻 Local Development & Testing

### Prerequisites
- Node.js 20+ (Node 22 recommended)
- npm 10+

### Installation
```bash
npm install
```

### Running Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running Automated Tests
```bash
npm test
```
Executes all 17 unit tests verifying state mutations, section reordering, schema validation, and resume scoring.

### Type-Checking & Linting
```bash
npx tsc --noEmit
npm run lint
```

### Building for Production
```bash
npm run build
npm start
```

---

## 📄 License
MIT. Built for software engineering portfolio showcase.
