# 📘 JobTrackr

A simple full-stack **Job Application Tracker** built using the **MERN stack**. Authenticated users can add, view, and manage job applications with ease.

---

## 🚀 Live Demo

Coming soon  
*(You can host the frontend on Vercel/Netlify and backend on Render + MongoDB Atlas for the database.)*

---

## 📸 Screenshots

Added soon

---

## 🛠️ Tech Stack

**Frontend**: React, TailwindCSS, React Router  
**Backend**: Node.js, Express.js, MongoDB, Mongoose  
**Auth**: JWT-based login/register  
**State Management**: React Context API

---

## 📁 Folder Structure

jobtrackr/
├── client/
│ └── src/
│ ├── pages/
│ ├── components/
│ ├── context/
│ ├── data/
│ └── App.js
└── server/
├── models/
├── routes/
├── middlewares/
└── server.js

---

## 🔐 Features

✅ User Registration & Login (JWT)  
✅ Persistent Auth with Context API  
✅ Add Job (Title, Company, Location, Status)  
✅ View Job List (Fetched from MongoDB)  
✅ Search & Sort Jobs  

🔜 Edit & Delete Jobs  
🔜 Stats Page (Jobs grouped by status)  
🔜 Auth-Protected Routes & Role Support

---

## 📦 Installation

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/jobtrackr.git
cd jobtrackr

### 2. Setup Backend
cd server
npm install

Create a .env file with:

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key

npm run dev

### 3. Setup Frontend
cd client
npm install
npm start

---

# 🧪 Sample Credentials (for quick demo)
Email: shinchan@abc.com
Password: shinchan

# 🤝 Contributing
Pull requests welcome!
If you'd like to contribute or suggest features, open an issue or fork the repo.

📄 License
MIT