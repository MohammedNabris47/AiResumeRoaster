const jwt = require("jsonwebtoken")
const env = require("../config/env")

function signToken(payload) {
    return jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn })
}

function verifyToken(token) {
    return jwt.verify(token, env.jwtSecret)
}

const cookieOptions = {
    httpOnly: true,
    secure: env.isProd || Boolean(process.env.VERCEL),
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/"
}

module.exports = { signToken, verifyToken, cookieOptions }