const { connectDB } = require("../src/config/db")
const app = require("../src/server.js")

module.exports = async (req, res) => {
    try {
        await connectDB()
    } catch (err) {
        console.error("Database connection error in Vercel serverless function:", err)
    }
    return app(req, res)
}
