# MERN Contract Manager

A full-stack **MERN Stack** (MongoDB, Express, React, Node.js) CRUD application for managing contracts. Users can securely sign up, login, and perform CRUD operations on their own contracts with JWT authentication.

## 🔗 Live Link

**Frontend:** https://conman.netlify.app  
**Backend:** Private (Not for everyone)

## 🚀 Deployment Tech

*   **Frontend:** netlify
*   **Backend:** Render (Private)
*   **Database:** MongoDB Atlas

## 🛠️ Tech Stack

### Frontend
*   **React.js:** UI library
*   **Axios:** For API requests
*   **React Router DOM:** For navigation
*   **React Hot Toast:** For notifications
*   **tailwind:**styling and Responsive design
*   **Loading:** Loading concept

### Backend
*   **Node.js:** JavaScript runtime
*   **Express.js:** Web framework for APIs
*   **MongoDB:** NoSQL database
*   **Mongoose:** ODM for MongoDB
*   **Bcrypt:** For password hashing
*   **JWT:** For authentication

## 🚀 Features

*   **User Authentication:** Secure Signup, Login, Logout
*   
*   **CRUD Operations:** Add, Read, Update, Delete contracts
*   **Protected Routes:** All APIs secured with CheckAuth middleware
*   **JWT Auth:** Token-based authentication
*   **Secure Data:** User can only see their own contracts
*   **Responsive Design:** Works on mobile and desktop
*   **Loading States:** Smooth loading indicators
*   **Notifications:** React Hot Toast for user feedback
*   **pagination:** button pagination concept

## 📂 Project Structure

```text
merncontractmanager/
│
├── server/                # Node.js + Express API
│   ├── utils/             # Database connection
│   ├── controllers/        # API logic
│   ├── middleware/        # CheckAuth middleware
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── .env                # Environment variables
│   └── index.js           # Entry point
│
├── client/               # React App
│   ├── src/
│   │   ├── components    # Reusable components
│   │   ├── pages        # Page components
│   │   ├── context      # Auth context
│   │   ├── App.js      # Main App
│   │   └── index.html    # Entry point
│   └── public/
│
└── README.md              # Project documentation
