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


### 2. Install Dependencies

npm install


### 3. Configure Environment
Create a file named backend/config/config.env (or .env in the root) and add the following:

# Code snippet

PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=your_mysql_password
DB_NAME=auction_db
JWT_SECRET=your_super_secret_key

### 4. Database Setup
Ensure MySQL is running. The application uses Sequelize, so it will automatically create the necessary tables (Users, Auctions, Bids) upon the first launch.


### 5. Run the Server
Bash

# Production mode
npm start

# Development mode (auto-restart)
npm run dev
Open your browser and visit: http://localhost:5000


## 🔑 Accounts & Roles
Creating an Admin Account
To register as an Admin, navigate to the registration page (/register) and select Admin. You will be asked for a Secret Key.

Default Secret Key: (You can change this in backend/controllers/authController.js)

Standard User
Simply register normally to access the User Dashboard.


## 📂 Project Structure
├── backend/
│   ├── config/          # DB connection & Env variables
│   ├── controllers/     # Logic (Auth, Auctions, User, Admin)
│   ├── middleware/      # Protection (Auth check, Admin check)
│   ├── models/          # Database Schemas (Sequelize)
│   ├── routes/          # API Routes
│   └── server.js        # Main entry point
├── frontend/
│   ├── public/          # Static assets (CSS, Uploads)
│   └── views/           # EJS Templates (UI)
└── README.md
