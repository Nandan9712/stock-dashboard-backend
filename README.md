# 📈 Real-Time Stock Dashboard (Full Stack)

A **full-stack real-time stock monitoring application** where users can log in with an email, subscribe to stocks, and receive **live price updates** using **WebSockets (Socket.IO)**.  
User subscriptions are stored permanently using **MongoDB Atlas**.

---

## 🌍 Live URLs

### Frontend (Vercel)
https://stock-dashboard-frontend-inky.vercel.app

### Backend (Render)
https://stock-dashboard-backend-97xy.onrender.com

---

## 🧱 Tech Stack

### Frontend
- React
- Vite
- Socket.IO Client
- CSS
- Hosted on **Vercel**

### Backend
- Node.js
- Express
- Socket.IO
- MongoDB Atlas
- Mongoose
- Hosted on **Render**

---

## 🏗️ System Architecture Diagram

```mermaid
graph TD
    U[User Browser]
    F[React + Vite Frontend]
    B[Node.js + Express Backend]
    D[(MongoDB Atlas)]

    U -->|HTTPS| F
    F -->|WebSocket (Socket.IO)| B
    B -->|Mongoose| D
    B -->|Live Updates| F
