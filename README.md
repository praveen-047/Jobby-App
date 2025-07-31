# 💼 Jobby App

Jobby App is a responsive job search web application where users can view job listings, detailed job information, and apply filters based on employment type and salary range. It features authentication, protected routes, and dynamic rendering of job data via API calls.

---

## 🔗 Live Demo

(https://jobsfinderapp.ccbp.tech/login)

🔐 Test Login Credentials
Use the following credentials to log in to the app:

Username: rahul
Password: rahul@2021
---

## 🚀 Features

- 🔐 **Login Authentication** using JWT tokens
- 🧭 **Protected Routes** — access restricted pages only after login
- 🔍 **Job Listings** with:
  - Search functionality
  - Employment type filters
  - Salary range filters
- 📄 **Job Details Page**
  - Company logo, description, skills required, life at company, etc.
- ❌ **Not Found Page** for invalid URLs
- 📱 **Fully Responsive** across devices

---

## 🛠️ Tech Stack

- **Frontend**: React.js (Class Components)
- **Routing**: React Router DOM
- **State Management**: Component State
- **Authentication**: JWT stored in cookies
- **API Communication**: `fetch` for RESTful API calls
- **Styling**: CSS3

---

## 📁 Project Structure

jobbyApp/
├── src/
│ ├── components/
│ │ ├── Login
│ │ ├── Jobs
│ │ ├── JobItemDetails
│ │ ├── Header
│ │ ├── FiltersGroup
│ │ └── NotFound
│ ├── App.js
│ └── index.js
├── public/
├── package.json
└── README.md

yaml
Copy
Edit

---

## ✅ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/praveen-047/Jobby-App.git
cd Jobby-App
2. Install Dependencies
npm install
3. Start the App
npm start

