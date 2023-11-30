const express = require('express')

const {
    getUserMe,
    getUser,
} = require('../controllers/user')

const router = express.Router()

router.get('/me', getUserMe)
router.get('/:uuid', getUser)

module.exports = router
