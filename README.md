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

## 🏗️ System Architecture

The application follows a **client–server architecture** with real-time communication.

- The **React + Vite frontend** runs in the browser and connects to the backend using **Socket.IO**
- The **Node.js + Express backend** handles WebSocket connections and business logic
- **MongoDB Atlas** stores user accounts and stock subscriptions permanently
- Stock prices are generated on the backend and pushed to clients in real time

```mermaid
flowchart TD
    U["User Browser"]
    F["React + Vite Frontend"]
    B["Node + Express Backend"]
    D[("MongoDB Atlas")]

    U -->|HTTPS| F
    F -->|WebSocket| B
    B -->|Mongoose| D
    B -->|Live Updates| F

