# PRODUCT-ASSUMPTIONS.md

**Project Title:** CampusTrace — College Lost and Found Web Portal  
**Course:** Web Application Development / Tech Week Sprint  
**Inspiration:** Boomerang (Product Hunt & Y Combinator S22)  

---

### 1. What product are you planning to build?
We are building a simple and dedicated Lost & Found website for our college campus called **CampusTrace**. 

It is a web portal where any student, teacher, or campus worker can quickly post an item they lost or an item they found somewhere on campus. Instead of having to walk to different blocks or ask around blindly, students can just open the site, select their building (like Library, Cafeteria, or Block B), search for what they misplaced, and see if anyone found it and where it is currently kept.

---

### 2. What problem does it solve?
Right now in our college, when someone loses an item like a calculator, student ID card, earphones, hostel keys, or a notebook, there is no proper system to get it back:

* **Everything is scattered:** A found water bottle might be sitting with the security guard at Gate 1, while an ID card might be sitting on a librarian's desk or in a department staff room. Nobody knows where to look first.
* **WhatsApp groups don't work well:** People usually send a photo to their class WhatsApp or unofficial college groups. But within a few hours, that message gets buried under hundreds of other texts, memes, and assignment notices, so the owner never sees it.
* **Items just sit unclaimed:** Because there is no central list you can search, most lost items just stay inside office drawers for months and eventually get thrown away or forgotten.
* **Risk of the wrong person taking it:** If someone finds an expensive item like wireless earbuds, anyone can just walk up and say "that's mine" because there's no way to verify who it actually belongs to.

CampusTrace solves this by giving the entire college one single website to check, with campus building filters and a simple verification question so only the rightful owner can claim an item.

---

### 3. Who are the target users?
* **College Students:** The main users. Students who lose daily items in lecture halls, computer labs, the canteen, or hostel corridors.
* **Students who find items:** Anyone who picks up something left behind and wants a 30-second way to report it without getting stuck doing paperwork.
* **Campus Security and Helpdesk Staff:** The security guards at the main gate and the desk staff at the library who physically store lost belongings until someone comes to pick them up.
* **Faculty & Lab Assistants:** Teachers and lab in-charges who regularly find chargers, USB drives, or notebooks left behind on desks after lab hours.

---

### 4. What is the main use case?
Here is how the website will actually be used in real life on our campus:

1. **When someone loses an item:**  
   Say a 2nd-year student leaves their Casio scientific calculator in Academic Block B, Room 204. They go to the site on their phone, filter by "Block B", and check recent electronics. If someone already reported finding it, they see where it was submitted (e.g. "Handed to Library Desk") and click "Claim". If it's not listed yet, they post a quick Lost notice with their contact info and a secret question like: *"What is written in pencil inside the cover?"*

2. **When someone finds an item:**  
   Another student finds a set of keys near the canteen. They take it to the Main Gate security desk, open the website, and post a Found notice: *"Room key with Marvel keychain found near canteen, handed over to Security Gate 1."*

3. **Handing it back securely:**  
   The student who lost the keys sees the notice, submits their claim explaining which room number is scratched on the key, and goes to Gate 1 with their college ID card to collect it. The security guard checks the answer, gives them the keys, and marks the case as closed on the website.

---

### 5. What are the core features?
* **Browse & Search Feed:** A clean dashboard where you can see all listings or filter by "Lost", "Found", or "Reunited".
* **Filter by Location & Category:** Quick dropdowns to filter by campus locations (Block A, Block B, Central Library, Cafeteria, Sports Ground, Hostels) and categories (Electronics, IDs, Keys, Books, Personal Items).
* **Search Bar:** Real-time search by keywords like "calculator", "AirPods", "blue umbrella", or student roll numbers.
* **Post a Lost Item Form:** Simple form with item name, location last seen, date, description, photo, and a secret challenge question.
* **Post a Found Item Form:** Form to log a found item, including the exact safe location where the finder left it (e.g. "Main Security Gate 1").
* **Claim Item Verification Box:** A popup where the claimant must describe unique details or answer the challenge question before they can pick it up.
* **Security Admin View:** A simple table view for campus security to see all items in custody, review claims, and mark items as "Reunited".
* **My Items Page:** A page where a logged-in student can see the items they reported and check if their claims were approved.

---

### 6. What assumptions are you making about the users?
* **Everyone has a phone or laptop:** We assume college students and staff have a smartphone or laptop with internet access while on campus.
* **Students know campus building names:** We assume users know basic campus spots like "Block B", "Library Floor 2", or "Hostel Mess".
* **People are honest enough to report:** We assume students are willing to report found items if the form is fast and doesn't ask for complicated login steps.
* **Privacy matters:** Students don't want their personal phone numbers posted publicly on the internet for everyone to see. So communication should happen through college roll numbers, college email, or the security desk.

---

### 7. What will be included in our MVP?
For this milestone, we are keeping the scope practical and working:
* Complete working frontend built with Next.js and Tailwind CSS.
* Home page with live stats (total lost, found, and recovery rate).
* Browse page with real-time search, category filters, and campus location filters.
* Working forms to post both Lost and Found items.
* Item detail page with the "Claim Item" popup and verification challenge.
* Security / Admin desk page to approve claims and mark items as returned.
* Role switch button in the navigation bar to easily switch between Student and Security view for demoing.
* Realistic pre-loaded dummy data with 8+ real college items (student IDs, calculators, keys, water bottles, chargers) stored in React Context and LocalStorage so nothing disappears when refreshing the browser.
* Fully responsive layout that looks great on mobile phones and laptops.

---

### 8. What will NOT be included in the MVP?
To make sure we can build a solid and bug-free product in the given time, we decided to leave these out for now:
* **No GPS tracking or Bluetooth beacons:** We are not using physical AirTags, RFID chips, or live Google Maps pins. We are sticking to campus building and room tags.
* **No cash rewards or payment system:** We don't want people trying to extort money for returning lost items on college property, so there is no wallet or payment gateway.
* **No AI image recognition:** We are not doing automatic image scanning to match items. Claim verification will be checked by real humans reading the owner's description.
* **No external cloud database:** As stated in the Milestone 1 guidelines, backend database integration is not required yet. Everything runs smoothly on React Context and browser storage.
* **No SMS OTP service:** Sending SMS costs money, so we will use college emails and roll numbers instead of mobile OTPs.
