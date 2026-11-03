# Product Assumption Document: CampusTrace (College Lost & Found Hub)

## Startup Inspiration
* **Inspiration Source:** Product Hunt & Y Combinator (YC S22)
* **Reference Product:** **Boomerang** (YC S22, Product Hunt #1 Product of the Day). Boomerang disrupted traditional lost-and-found operations by replacing messy lost boxes with digital item logging, claim tracking, and matching workflows for public venues.
* **Our Adaptation:** **CampusTrace** takes the foundational thesis of Boomerang and adapts it specifically for higher-education university campuses. It addresses campus-specific dynamics: student roll numbers, campus zones (Library, Academic Blocks, Cafeteria, Hostels, Sports Complex), verification safeguards for student property, and direct student-to-security desk handover workflows.

---

## 1. What product are you planning to build?
We are building **CampusTrace**, a centralized, web-based Lost and Found portal designed exclusively for college campuses. It provides an intuitive, real-time dashboard where students, faculty, and campus staff can report lost belongings, log found items, search listings by campus building and category, and submit verified ownership claims to recover their property safely.

---

## 2. What problem does it solve?
In modern colleges and universities, when an item is misplaced (ID cards, expensive scientific calculators, laptop chargers, keys, water bottles, earphones):
1. **Extreme Fragmentation:** Found items end up scattered haphazardly across the library circulation desk, campus main gate security, individual department offices, hostel wardens, or cafeteria counters.
2. **High Friction & Wasted Time:** Students have to physically walk between 5 different buildings or spam overcrowded unofficial WhatsApp/Telegram groups, where messages are quickly buried.
3. **Low Recovery Rate:** Because there is no searchable index or status tracking, over 70% of lost college items remain unclaimed and end up disposed of or stockpiled indefinitely at security offices.
4. **Lack of Ownership Verification:** When someone claims an item informally, there is no standardized way to verify rightful ownership without risking fraud or wrongful handovers.

CampusTrace solves this by establishing a single, searchable digital directory with standardized verification claims and status workflows (Lost → Found → Verification Claimed → Reunited).

---

## 3. Who are the target users?
1. **College Students:** Misplacing daily essentials (ID cards, keys, textbooks, electronics, wallets) in lecture halls, labs, or campus grounds.
2. **Finders (Students & Peers):** Good Samaritans who spot an unattended item on campus and want a 60-second way to report it or note where it was handed in.
3. **Campus Security & Facility Staff (Admins):** Staff at security desks, library helpdesks, and department reception counters who receive found items and need a structured log to verify claimants and close cases.
4. **Faculty & Lab In-Charges:** Department staff managing items left behind after laboratory sessions or lectures.

---

## 4. What is the main use case?
* **Scenario A (Item Lost):** A student leaves their Casio fx-991EX scientific calculator in Academic Block B - Room 204. They log into CampusTrace, search recent listings under "Electronics" + "Block B". If not yet reported found, they publish a "Lost Item" alert with date, room, distinctive scratches, and a security question.
* **Scenario B (Item Found & Claimed):** A student or campus cleaner spots the calculator and submits a "Found Item" report noting that it has been handed over to the Central Library Reception. CampusTrace displays the item as "Found - Pending Claim". The owner sees the listing, clicks "Claim This Item", provides the answer to the security verification question (e.g., "Sticky note inside battery cover"), and receives instructions to collect it from the library desk. Once handed over, the status updates to "Resolved / Reunited".

---

## 5. What are the core features?
1. **Interactive Campus Feed & Dashboard:** Filter items by status (`Lost`, `Found`, `Resolved`), category (`Electronics`, `ID & Cards`, `Books`, `Keys`, `Clothing & Bags`, `Other`), and campus location/zone.
2. **Instant Search & Keyword Matching:** Real-time search across titles, descriptions, and campus locations.
3. **Report Lost Item Workflow:** Structured form capturing item title, category, specific campus zone/room, date/time, image/icon, contact email/roll number, and optional verification question.
4. **Report Found Item Workflow:** Fast logging form capturing item description, location found, and current safe custody location (e.g., "Left with Security Gate 1").
5. **Ownership Claim Verification Flow:** Claimants submit ownership proof (e.g., unique marks, wallpaper description, serial/roll number) before the finder/admin approves handover.
6. **Student & Admin Campus Authentication (Context State):** Switchable user roles (Student View vs. Campus Security / Helpdesk Desk) to review claims and update item lifecycle.
7. **Personal Activity Dashboard ("My Reports & Claims"):** Track status of items you have reported or claims you have submitted.

---

## 6. What assumptions are you making about the users?
1. **Digital Accessibility:** Students and staff have smartphone or laptop access with an internet connection during their campus hours.
2. **Honesty & Community Spirit:** A meaningful percentage of students and campus staff are motivated to log found items if the reporting barrier is low (< 1 minute).
3. **Standardized Campus Geography:** Users are familiar with recognizable campus zones (e.g., "Main Library", "Hostel Block 3", "Auditorium", "Cafeteria").
4. **Privacy Conscious:** Users prefer not having their private phone numbers broadcast publicly on the internet; claims should route through campus email or verified portal interactions.

---

## 7. What will be included in your MVP?
* **Landing Page:** Welcoming hero section, quick search, recent activity summary, and clear call-to-actions (Report Lost / Report Found).
* **Explore / Dashboard Page:** Tabbed filtering (`All`, `Lost`, `Found`, `Resolved`), category badges, location dropdowns, and search input.
* **Item Detail View & Modal:** Comprehensive view of item details, location map indicator, custody status, and "Claim Item" modal with proof submission.
* **Post Lost & Post Found Forms:** Form validation, category selector, location selector, date picker, and realistic image attachment / pre-set photo options.
* **React Context State Management:** Application-wide state handling all items, filtering, user sessions, claim submissions, and instant UI updates without page reloads.
* **Preloaded Realistic Dummy Dataset:** 10+ authentic campus lost/found scenarios (student ID card, graphing calculator, hostel room keys, water bottle, AirPods case, etc.).
* **My Listings & Admin Resolution:** Ability to mark items as "Claimed / Resolved" and inspect submitted claims.
* **Responsive Mobile & Desktop Design:** Modern Tailwind CSS visual layout suitable for phones and laptops.

---

## 8. What will NOT be included in the MVP?
* **Physical Hardware Trackers:** No integration with Bluetooth beacons, RFID readers, or Apple AirTags.
* **Live GPS Geolocation Pins:** Location selection is based on campus zone/building tags rather than high-precision GPS coordinates.
* **Monetary Reward / Payment Processing:** No payment gateway for cash rewards (to avoid extortion or commercialization within college rules).
* **Automated AI Computer Vision Matching:** Image comparison between lost and found items will be handled via human claim review rather than deep learning image embeddings in Milestone 1.
* **Persistent SQL / Cloud Database:** Backend integration is deferred per Milestone 1 syllabus; state is managed via React Context and LocalStorage.
