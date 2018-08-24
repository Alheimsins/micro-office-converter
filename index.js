const Router = require('router')
const finalhandler = require('finalhandler')
const cors = require('cors')
const fileUpload = require('express-fileupload')

// Utilities
const handler = require('./lib/handler')

// Initialize a new router
const router = Router()

// CORS
router.use(cors())

// Upload
router.use(fileUpload())

// ROUTES
router.get('/', handler.frontpage)
router.post('/convert/:format', handler.convert)

module.exports = (request, response) => {
  router(request, response, finalhandler(request, response))
}
