# AuctionHub 🔨

**AuctionHub** is a robust, real-time online auction marketplace built with Node.js. It allows users to buy and sell items securely with a complete bidding lifecycle, while providing Admins with powerful tools to manage listings and approvals.

## 🚀 Features

### 👤 User Features
* **Authentication:** Secure Login & Registration with encrypted passwords (Bcrypt).
* **Sell Items:** Users can list items with images, descriptions, starting prices, and end times.
* **Bidding System:** Real-time bidding on active auctions.
* **User Dashboard:**
    * **My Bids:** Track active bids and view current statuses.
    * **Auctions Won:** View a history of items successfully won.
    * **My Listings:** Manage selling items with status tracking (Pending, Active, Ended).
    * **Delete Listings:** Users can delete their own listings if needed.

### 🛡️ Admin Features
* **Approval Workflow:** All new listings start as `Pending`. Admins must **Approve** them before they go live.
* **Moderation:** Admins can **Reject** (delete) inappropriate listings or **Stop 🛑** live auctions immediately if issues arise.
* **Admin Dashboard:** A centralized control panel to monitor system statistics and manage content.

### ⚙️ Core Functionality
* **Real-Time Status Logic:** Items automatically update from 'Active' to 'Ended' based on the expiration time.
* **Image Handling:** Support for product image uploads.
* **Security:** Role-based access control (RBAC) and secure HTTP-only cookies.

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MySQL, Sequelize ORM
* **Frontend:** EJS (Templating), Tailwind CSS
* **Authentication:** JWT (JSON Web Tokens), Cookie-Parser

---

## 📦 Installation & Setup

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/auction-hub.git](https://github.com/your-username/auction-hub.git)
cd auction-hub
