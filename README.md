
# 💼 My Portfolio

Welcome to my personal portfolio!  
This is a simple and responsive portfolio website that I built using **HTML**, **CSS**, and **JavaScript** to showcase my **skills**, **projects**, and **background**.  
Additionally, I have integrated a **Node.js API** using **Express.js** to serve dynamic data such as **projects**, **skills**, and **education**.

---

## 📑 Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [API Usage](#api-usage)
- [License](#license)

---

## 🔰 Introduction
This portfolio is a collection of my best work, projects, and accomplishments and serves as a showcase for my skills in front-end web development.  
It is designed to be **fully responsive**, making it accessible across different devices such as **desktops**, **tablets**, and **smartphones**.

---

## 🎨 Features
- ✅ **Responsive Design:** Adapts perfectly to different screen sizes.
- ✅ **Projects Section:** Displays my projects with descriptions and links.
- ✅ **About Me:** Brief overview of my journey and background.
- ✅ **Contact Form:** Simple form for reaching out to me.
- ✅ **Smooth Scrolling:** For a better navigation experience.
- ✅ **Modern UI/UX Design:** Clean and minimalist design.
- ✅ **Dynamic Data:** API-driven data for **Projects**, **Skills**, and **Education** using **Node.js** and **Express.js**.

---

## 🛠️ Technologies Used
### Frontend:
- **HTML** – Structure of the website.
- **CSS** – Styling and layout.
- **JavaScript** – Interactive features.

### Backend (API):
- **Node.js**
- **Express.js**
- **CORS**
- **JSON** – For dynamic data handling.

---

## ⚙️ Installation

### 1️⃣ Clone the Repository:
```bash
git clone https://github.com/Hemantsinghs9551/Hemant_portfolio.git
cd Hemant_portfolio
```

### 2️⃣ Install Backend Dependencies:
```bash
npm install
```

### 3️⃣ Start the Backend Server:
```bash
npm start
```
The backend API will run at:
```
http://localhost:3000
```

### 4️⃣ Open the `index.html` file in your browser to view the portfolio.

---

## 🌐 API Usage

The backend serves dynamic portfolio data through the following endpoints:

| Endpoint             | Method | Description              |
|----------------------|--------|--------------------------|
| `/api/projects`     | GET    | Get projects data        |
| `/api/skills`       | GET    | Get skills data          |
| `/api/education`    | GET    | Get education data       |

### Example `portfolio.json` structure:
```json
{
  "projects": [
    {
      "name": "Portfolio Website",
      "description": "A personal portfolio to showcase my projects and skills.",
      "github": "https://github.com/Hemantsinghs9551/Hemant_portfolio"
    }
  ],
  "skills": [
    {
      "name": "JavaScript",
      "level": "Advanced"
    }
  ],
  "education": [
    {
      "title": "Bachelor of Technology",
      "year": "2024",
      "description": "Completed B.Tech in Computer Science."
    }
  ]
}
```

---

## ✅ Project Files Overview

### Package Configuration (`package.json`)
```json
{
  "name": "hemant-portfolio-api",
  "version": "1.0.0",
  "description": "API to serve portfolio data.",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "start": "node index.js"
  },
  "author": "Hemant Singh",
  "license": "MIT",
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.18.2"
  }
}
```

### Optional Requirements (`requirements.txt`)
```
express
cors
```
Install with:
```bash
xargs -n 1 npm install < requirements.txt
```

---

## 📬 Usage
Once you've opened the portfolio in your browser, you can:
- Explore my **projects**.
- Learn about my **skills** and **experience** in the **About Me** section.
- Contact me via the **Contact Form**.

---

## 🔖 License
This project is licensed under the **MIT License**.

---

## ✅ Contribution
Feel free to contribute or suggest improvements via pull requests!
