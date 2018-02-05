'use strict'
exports.DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL
exports.PORT = process.env.PORT || 5000
exports.YUM_APP_ID = process.env.YUM_APP_ID
exports.YUM_APP_KEY = process.env.YUM_APP_KEY
exports.JWT_SECRET = process.env.JWT_SECRET
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d'
exports.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
exports.GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
exports.FB_APP_ID = process.env.FB_APP_ID
exports.FB_APP_SECRET = process.env.FB_APP_SECRET
exports.COOKIE_KEY = process.env.COOKIE_KEY
exports.CLIENT_ORIGIN = process.env.CLIENT_ORIGIN