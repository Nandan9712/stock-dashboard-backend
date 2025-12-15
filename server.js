import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { Server } from "socket.io";
import http from "http";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config(); // ⭐ LOAD ENV VARIABLES

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

// ⭐ CONNECT TO MONGODB ATLAS (NOT LOCAL)
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB Atlas connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const STOCKS = ["GOOG", "TSLA", "AMZN", "META", "NVDA"];

// ⚡ SOCKET.IO real-time logic
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("login", async (email) => {
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ email, subscriptions: [] });
      await user.save();
    }

    socket.userId = user._id.toString();
    console.log(`${email} logged in with userID ${socket.userId}`);

    // SEND PERMANENT SUBSCRIPTIONS FROM DB
    socket.emit("loadSubscriptions", user.subscriptions);

    // JOIN ROOMS
    user.subscriptions.forEach((stock) => {
      socket.join(stock);
    });
  });

  socket.on("subscribe", async (stock) => {
    if (!socket.userId) return;

    const user = await User.findById(socket.userId);

    if (!user.subscriptions.includes(stock)) {
      user.subscriptions.push(stock);
      await user.save();
    }

    socket.join(stock);
    console.log(`User ${user.email} subscribed to:`, user.subscriptions);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// 🚀 STOCK PRICE GEN EVERY 1 SEC
setInterval(() => {
  STOCKS.forEach((stock) => {
    const price = (Math.random() * 1000 + 100).toFixed(2);
    io.to(stock).emit("stockUpdate", { stock, price });
  });
}, 1000);

// ⭐ USE ENV PORT (IMPORTANT FOR HOSTING)
const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
