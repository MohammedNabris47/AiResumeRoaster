const mongoose = require("mongoose")
const env = require("./env")


mongoose.set("strictQuery", true)

async function connectDB() {
    if (mongoose.connection.readyState >= 1) return;
    if (!env.monoUri) {
        console.error("MongoDB connection skipped: MONGO_URI is not set in environment variables.")
        return;
    }
    try {
        const conn = await mongoose.connect(env.monoUri, {
            serverSelectionTimeoutMS: 5000
        })
        console.log(`MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`)
    } catch (err) {
        console.error("MongoDB Connection Error: ", err.message)
    }

    mongoose.connection.on("error", (err) => {
        console.error("MongoDB Error: ", err.message)
    })

    mongoose.connection.on("disconnected", () => {
        console.warn("MongoDB Disconnected")
    })
}

module.exports = { connectDB }