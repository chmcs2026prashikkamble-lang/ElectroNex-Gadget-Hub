# ⚡ ElectroNex Gadget Hub

**ElectroNex Gadget Hub** is a modern, full-stack MERN e-commerce platform designed for managing and browsing electronic gadgets. The application features a sleek, minimalist dark-mode interface with neon cyan accents, providing a premium user experience for both administrators and customers.

---

## 🎓 Student Details
* **Name:** Prashik Bhushan Kamble
* **Roll Number:** 43
* **Batch:** B2
* **Class:** S.Y.C.S (Semester IV)
* **College:** Smt. Chandibai Himathmal Mansukhani College

---

## ✨ Key Features (Project Requirements)

As per the project sanction, the following core functionalities have been implemented:

1.  **Product Management (CRUD):** Complete ability to Create, Read, Update, and Delete gadgets from the inventory.
2.  **Search Functionality:** A real-time, seamless search bar that filters products by name or brand as you type.
3.  **Category-wise Product Listing:** Dedicated filtering to sort products by categories (e.g., Mobiles, Laptops, Headphones).
4.  **Brand-wise Filtering:** An advanced filter allowing users to narrow down products based on specific tech brands.
5.  **Stock Availability Management:** Dynamic badges indicating whether a product is "In Stock" or "Out of Stock."
6.  **Product Rating System:** A visual 1-5 star rating display for every product to track customer satisfaction.
7.  **Price Management:** Accurate pricing display with localized formatting (₹).
8.  **Warranty Information:** Tracking and display of warranty periods for every electronic item.
9.  **Data Tracking:** Automatic tracking of product creation and update timestamps using MongoDB Timestamps.

---

## 🛠️ Tech Stack

**Frontend:**
* **React.js** (Vite)
* **Tailwind CSS** (Styling)
* **Lucide React** (Modern Iconography)
* **Axios** (API Requests)
* **React Hot Toast** (Notifications)

**Backend:**
* **Node.js & Express.js**
* **MongoDB** (Database)
* **Mongoose** (Object Data Modeling)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone [https://github.com/chmcs2026prashikkamble-lang/ElectroNex-Gadget-Hub.git](https://github.com/chmcs2026prashikkamble-langElectroNex-Gadget-Hub.git)
2. Setup Backend
Bash
cd backend
npm install
npm start
Note: Ensure your .env file is configured with your MONGODB_URI.

3. Setup Frontend
Bash
cd frontend
npm install
npm run dev
📂 Project Structure
Plaintext
├── backend/
│   ├── models/        # Mongoose Schemas (Product Model)
│   ├── routes/        # API Endpoints
│   └── server.js      # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/# Reusable UI (Navbar, ProductCard)
│   │   ├── pages/     # Page views (Home, Create, Edit)
│   │   └── lib/       # Axios configuration & Utils
└── README.md

