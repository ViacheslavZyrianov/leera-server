const express = require('express')

const {
    postUserRegister,
    postUserLogin,
} = require('../controllers/user')

const router = express.Router()

router.post('/register', postUserRegister)
router.post('/login', postUserLogin)

module.exports = router
