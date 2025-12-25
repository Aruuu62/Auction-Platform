# AuctionHub - Real-Time Online Auction Platform

**AuctionHub** is a full-stack web application that allows users to list items for auction, place real-time bids, and manage transactions securely. The platform features live updates, user verification (KYC), and a comprehensive admin dashboard for managing users and auctions.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![Node Version](https://img.shields.io/badge/node-v20.13.1-blue.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🚀 Key Features

* **Real-Time Bidding:** Instant bid updates across all connected clients using **Socket.io**.
* **User Authentication:** Secure Login/Register system with JWT and Cookie-based sessions.
* **Role-Based Access:** Distinct panels for Users and Admins.
* **Admin Dashboard:**
    * Manage Users (Ban/Unban).
    * Approve/Reject KYC Documents.
    * Monitor Auctions and release Escrow payments.
* **KYC Verification:** Users can upload ID documents for verification.
* **Responsive Design:** Modern UI built with **Tailwind CSS** and **EJS**.
* **Live Features:** Placeholder support for live video streaming of auction items.

## 🛠️ Tech Stack

* **Frontend:** EJS (Templating Engine), Tailwind CSS, HTML5, JavaScript.
* **Backend:** Node.js, Express.js.
* **Database:** MySQL, Sequelize ORM.
* **Real-Time:** Socket.io.
* **Authentication:** JSON Web Token (JWT), BCrypt, Cookie-Parser.

## ⚙️ Prerequisites

Before running this project, ensure you have the following installed:

* [Node.js](https://nodejs.org/) (v14 or higher)
* [MySQL Server](https://dev.mysql.com/downloads/mysql/) (via XAMPP, WAMP, or Workbench)
* [Git](https://git-scm.com/)

## 📦 Installation & Setup

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/your-username/auction-platform.git](https://github.com/your-username/auction-platform.git)
    cd auction-platform
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Database Configuration**
    * Open your MySQL tool (phpMyAdmin or Workbench).
    * Create a new database named: `auction_platform`.
    * *(Note: You do not need to create tables manually; the app will handle this automatically).*

4.  **Environment Variables**
    * Go to `backend/config/` and open `config.env`.
    * Update the `DB_PASS` with your local MySQL password.

    ```env
    PORT=5000
    DB_HOST=localhost
    DB_USER=root
    DB_PASS=your_mysql_password_here
    DB_NAME=auction_platform
    JWT_SECRET=your_super_secret_key
    ```

## 🏃‍♂️ How to Run

You need to run two commands in separate terminals: one to generate the CSS and one to run the server.

**Terminal 1: CSS Builder (Tailwind)**
This watches for changes in your HTML/EJS files and updates the styles.
```bash
npm run build:css