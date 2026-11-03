# CampusTrace UI Design System

## 1. Visual Design Philosophy
CampusTrace is designed with a modern, high-contrast, and welcoming campus aesthetic. Because students and staff often use this app during stressful moments (e.g. realizing a laptop charger or student ID card is missing right before an exam), the UI emphasizes:
* **Clarity & Urgency:** Strong visual distinction between **Lost** (warning/amber-rose) and **Found** (emerald-green).
* **High Legibility:** Clean sans-serif typography, large touch targets for mobile accessibility, and distinct card borders.
* **Trust & Institutional Polish:** Deep indigo and sapphire blues paired with crisp slate neutrals.

---

## 2. Color Palette

| Token Role | Hex Code | Tailwind Equivalent | Usage Description |
| :--- | :--- | :--- | :--- |
| **Primary Color** | `#2563EB` | `blue-600` | Brand identity, primary action buttons, active navigation indicators, key links |
| **Primary Dark** | `#1D4ED8` | `blue-700` | Hover states on primary buttons, focused border highlights |
| **Secondary Color** | `#4F46E5` | `indigo-600` | Secondary badges, hero section gradient accents, supporting CTAs |
| **Background (Light)** | `#F8FAFC` | `slate-50` | Default application background, body canvas |
| **Card / Surface** | `#FFFFFF` | `white` | Cards, modals, dropdown menus, table rows |
| **Surface Subdued** | `#F1F5F9` | `slate-100` | Table headers, chip backgrounds, disabled state containers |
| **Text Primary** | `#0F172A` | `slate-900` | Main headings, modal titles, primary body labels |
| **Text Secondary** | `#475569` | `slate-600` | Subtitles, location tags, helper captions, placeholder text |
| **Text Muted** | `#94A3B8` | `slate-400` | Timestamp indicators, inactive navigation, border outlines |
| **Accent / Highlight** | `#38BDF8` | `sky-400` | Search bar focus rings, status glow effects |
| **Status: Lost** | `#DC2626` / `#FEE2E2` | `red-600` / `red-100` | "Lost" badge pill, urgent alert banners |
| **Status: Found** | `#16A34A` / `#DCFCE7` | `emerald-600` / `emerald-100` | "Found" badge pill, safe custody indicators |
| **Status: Reunited** | `#2563EB` / `#DBEAFE` | `blue-600` / `blue-100` | "Reunited / Returned" resolved item status |
| **Border Default** | `#E2E8F0` | `slate-200` | Card borders, dividers, form input borders |

---

## 3. Typography Scale

* **Primary Font Family:** `Inter`, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif.

| Text Role | Font Size | Weight | Line Height | Usage Example |
| :--- | :--- | :--- | :--- | :--- |
| **Display / Hero H1** | `36px` / `2.25rem` | `800` (Extra Bold) | `1.2` | Landing page hero header ("Find What You Lost on Campus") |
| **Page Title H1** | `28px` / `1.75rem` | `700` (Bold) | `1.25` | Dashboard title, Report Form heading |
| **Section H2** | `22px` / `1.375rem`| `600` (Semi Bold) | `1.3` | Filter sections, Modal headings, Section dividers |
| **Card Title H3** | `18px` / `1.125rem`| `600` (Semi Bold) | `1.35` | Item card headers, user profile name |
| **Body (Default)** | `15px` / `0.9375rem`| `400` (Regular) | `1.5` | Descriptions, list item descriptions, instruction paragraphs |
| **Body (Medium)** | `15px` / `0.9375rem`| `500` (Medium) | `1.5` | Navigation labels, table cells, form labels |
| **Button Text** | `14px` / `0.875rem` | `600` (Semi Bold) | `1.25` | Button actions (`Post Lost Item`, `Claim Now`, `Submit`) |
| **Small / Badge** | `12px` / `0.75rem` | `600` (Semi Bold) | `1.2` | Category chips, status pill tags, building code badges |
| **Caption / Muted** | `12px` / `0.75rem` | `400` (Regular) | `1.3` | "Reported 2 hours ago by Roll #24CS082" |

---

## 4. Reusable UI Components Directory

The application UI is structured cleanly into reusable, isolated React components under `components/`:

1. **`Navbar` (`components/Navbar.jsx`)**:
   * Sticky top bar with university branding logo, search bar quick jump, navigation links (`Feed`, `Report Lost`, `Report Found`, `My Items`, `Admin`), and active user profile switch.
2. **`Sidebar` / `MobileNav` (`components/MobileNav.jsx`)**:
   * Slide-out mobile menu for seamless responsive navigation on small smartphone screens.
3. **`Button` (`components/Button.jsx`)**:
   * Modular button supporting variants: `primary`, `secondary`, `danger`, `outline`, `ghost`, and sizes: `sm`, `md`, `lg`. Handles disabled and loading states.
4. **`Card` (`components/Card.jsx`)**:
   * Standard container with subtle border (`border-slate-200`), shadow (`shadow-sm hover:shadow-md transition`), and rounded corners (`rounded-xl`).
5. **`ItemCard` (`components/ItemCard.jsx`)**:
   * Rich interactive card showcasing item image/category icon, title, location badge, date, status tag (`LOST` vs `FOUND`), and action buttons (`Details`, `Claim Item`).
6. **`Badge` (`components/Badge.jsx`)**:
   * Rounded status pills supporting color mappings: Red (`Lost`), Green (`Found`), Blue (`Reunited`), Purple (`Pending Claim`), and Slate (`Category Tag`).
7. **`Input` / `Select` / `Textarea` (`components/Input.jsx`)**:
   * Standard form controls with clear label headers, placeholder styling, error messages, and accessible focus outlines.
8. **`Modal` (`components/Modal.jsx`)**:
   * Accessible overlay dialog with background blur, ESC-key dismissal, title header, body container, and action buttons. Used for **Claim Verification** and **Contact Finder**.
9. **`Dropdown` (`components/Dropdown.jsx`)**:
   * Selectable dropdown for Category filtering and Campus Zone selection (e.g., Central Library, Cafeteria, Science Block, Sports Complex).
10. **`Table` (`components/Table.jsx`)**:
    * Clean tabular view used in the Campus Security / Admin Desk to review reported items, claimant details, verification answers, and resolution toggle.
11. **`EmptyState` (`components/EmptyState.jsx`)**:
    * Illustrated state shown when no items match a search query or filter ("No lost items found in this category. Try adjusting your filters or report a new one!").
12. **`LoadingState` (`components/LoadingState.jsx`)**:
    * Pulsing skeleton cards and spinner for asynchronous action simulation.

---

## 5. Spacing, Elevation & Shadows

* **Border Radius:**
  * Small tags / badges: `rounded-full` or `rounded-md` (4px–6px)
  * Form inputs & buttons: `rounded-lg` (8px)
  * Cards & dialog containers: `rounded-xl` (12px)
  * Feature modals: `rounded-2xl` (16px)
* **Shadow Hierarchy:**
  * Base cards: `shadow-sm` (`0 1px 2px 0 rgb(0 0 0 / 0.05)`)
  * Card hover: `shadow-md` (`0 4px 6px -1px rgb(0 0 0 / 0.1)`)
  * Floating Modals: `shadow-2xl` (`0 25px 50px -12px rgb(0 0 0 / 0.25)`)
