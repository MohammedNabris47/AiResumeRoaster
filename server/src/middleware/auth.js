const env = require("../config/env")
const { verifyToken } = require("../utils/jwt")
const ApiError = require("../utils/apiError")
const User = require("../model/user")

async function requireAuth(req, res, next) {
    try {
        const token = req.cookies?.[env.cookieName]
        if (!token) throw ApiError.unauthorized()

        const payload = verifyToken(token)
        const user = await User.findById(payload.sub)
        if (!user) throw ApiError.unauthorized("Session no longer valid")

        req.user = user
        next()
    } catch (error) {
        if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
            return next(ApiError.unauthorized("Invalid or Expired session"))
        }
        next(error)
    }
}

module.exports = { requireAuth }