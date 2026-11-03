# Project Planning & GitHub Work Breakdown

## Team Details
* **Project Name:** CampusTrace (College Lost & Found Hub)
* **Team Size:** 2 Students
* **Student 1 (Full-Stack Architecture & State):** Lead on Architecture, Next.js Setup, React Context Engine, Authentication Flow, Dashboard View, and Security Desk / Admin Management.
* **Student 2 (UI Engineering & Component System):** Lead on Design System, Landing Page, Reusable Component Library (Button, Card, Modal, Input, Badge), Report Forms, Responsive Styling, and Dummy Dataset.

---

## Sprint Roadmap & Issue Breakdown

| Issue # | Issue Title | Assigned Student | Priority | Description & Expected Outcome |
| :--- | :--- | :--- | :--- | :--- |
| **#1** | **Project Setup & Next.js Initialization** | Student 1 | High | Initialize Next.js 14 App Router, configure Tailwind CSS, PostCSS, and directory hierarchy (`app/`, `components/`, `context/`, `public/`). |
| **#2** | **Product Assumptions & Design System Specs** | Student 2 | High | Author `PRODUCT-ASSUMPTIONS.md` (8 key questions) and `DESIGN-SYSTEM.md` (colors, typography, component specs). |
| **#3** | **Interactive Wireframes & User Journey Mapping** | Student 2 | Medium | Document page layout blueprints, user flows, and wireframe views in `WIREFRAME.md`. |
| **#4** | **Central React Context & State Management** | Student 1 | High | Implement `ItemContext.jsx` and `AuthContext.jsx` with full state operations (add, claim, resolve, filter, search, local persistence). |
| **#5** | **Reusable Core UI Component Library** | Student 2 | High | Develop modular components: `Button.jsx`, `Badge.jsx`, `Input.jsx`, `Card.jsx`, `Modal.jsx`, `EmptyState.jsx`. |
| **#6** | **Global Navigation Bar & Mobile Drawer** | Student 1 | High | Build sticky `Navbar.jsx` with responsive toggle, active link indicators, and role-switcher pill (Student vs Admin). |
| **#7** | **Interactive Landing Page** | Student 2 | Medium | Implement high-impact hero banner, quick search bar, live campus recovery stats, and category highlights. |
| **#8** | **Search & Filter Dashboard (`/dashboard`)** | Student 1 | High | Build real-time multi-filter feed: status tabs (`All`, `Lost`, `Found`, `Reunited`), location dropdown, and keyword search. |
| **#9** | **Report Lost & Found Forms (`/report-lost`, `/report-found`)** | Student 2 | High | Build structured submission forms with validation, campus zones, date/time pickers, and security question prompts. |
| **#10**| **Claim Verification Modal & Handover Flow** | Student 1 | High | Implement interactive claim dialog where claimants submit proof and security desk reviews claims before marking reunited. |
| **#11**| **Campus Security / Admin Recovery Portal (`/admin`)** | Student 1 | Medium | Tabular dashboard for campus security to review all items, inspect claims, and update handover status. |
| **#12**| **Authentic College Dummy Dataset** | Student 2 | High | Curate 10+ realistic university lost/found records with photos, locations (Library, Labs, Cafeteria), and timestamps. |
| **#13**| **Responsive Mobile Layout & Polishing** | Student 2 | Medium | Ensure perfect mobile responsiveness across iPhone, iPad, and desktop viewports with accessible contrast. |
| **#14**| **README & Video Presentation Script** | Student 1 & 2 | High | Prepare comprehensive documentation, run instructions, and 10-point slide script for Thursday presentation. |

---

## Git Workflow & Branch Strategy
* `main`: Production-ready branch containing working MVP releases.
* `feature/architecture-context`: Handled by Student 1 (Next.js, Context, Dashboard, Admin).
* `feature/ui-components`: Handled by Student 2 (Landing, Components, Forms, Dummy Data).
* Standardized Commit Message Convention:
  * `feat: ...` for new features or components
  * `fix: ...` for bug fixes or layout adjustments
  * `docs: ...` for documentation and markdown deliverables
  * `style: ...` for Tailwind CSS updates and formatting
