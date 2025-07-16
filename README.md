# 💼 JobTrackr

A full-stack job tracking app to manage and visualize your job applications — from applied to offer!

## ✨ Features
--------------------------------------
| Feature              | Status      |
|----------------------|-------------|
| User Auth (JWT)      | ✅ Done     |
| Add/Edit/Delete Jobs | ✅ Done     |
| View Dashboard       | ✅ Done     |
| Search & Sort        | ✅ Done     |
| Protected Routes     | ✅ Done     |
| Stats by Status      | ✅ Done     |
| Responsive Design    | ✅ Done     |
| Dark Mode            | 🔜 Upcoming |
| Live Notifications   | 🔜 Upcoming |
--------------------------------------

---

## 🚀 Live Demo

🌐 **Frontend:** [Vercel Link](https://jobtrackr-client.vercel.app)  
🔗 **Backend:** [Render Link](https://jobtrackr-api.onrender.com) *(replace with your actual links)*

🧪 **Test Credentials**  
Email: shinchan@abc.com
Password: shinchan

---

## 📂 Folder Structure

/client
├── components
├── context
├── pages
├── App.jsx
├── main.jsx

/server
├── controllers
├── models
├── routes
├── middlewares
├── server.js

---

## ⚙️ Tech Stack

**Frontend:**
- React + React Router
- TailwindCSS
- Axios
- React Toastify

**Backend:**
- Node.js
- Express
- MongoDB (with Mongoose)
- JWT Auth
- Render Deployment

---

## 🧠 How It Works

- Register/Login securely with JWT.
- Add jobs with title, company, location, and status.
- Edit or delete jobs anytime.
- View real-time stats by application status.
- Responsive UI with route protection.

---

## 🛠️ Installation (Locally)

```bash
# Clone the repo
git clone https://github.com/yourusername/jobtrackr.git

# Backend setup
cd server
npm install
npm run dev

# Frontend setup
cd ../client
npm install
npm run dev

📝 .env.example

server/.env

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

client/.env
VITE_API_URL=http://localhost:5000

---

## 📈 Future Plans	

📊 Charts for status breakdowns
🌙 Dark mode
📩 Email notifications
📱 Mobile app version (React Native)

## 🤝 Contributing
PRs are welcome! Clone, add a feature, and submit a PR.

## 📧 Contact
Built with ❤️ by Mridul Kapoor