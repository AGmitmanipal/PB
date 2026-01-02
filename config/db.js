const mongoose = require("mongoose");
const ENV = require("./env");

async function connectMongo() {
  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  if (mongoose.connection.readyState === 1) return;
  if (mongoose.connection.readyState === 2) return;

  await mongoose.connect(ENV.MONGODB_URI);
  console.log("✅ MongoDB connected");
}

module.exports = { connectMongo };


