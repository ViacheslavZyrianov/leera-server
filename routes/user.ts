const express = require('express')

const {
    postUserRegister,
    postUserLogin,
    // getStoryById,
    // patchStory,
    // deleteStory
} = require('../controllers/user')

const router = express.Router()

router.post('/register', postUserRegister)
router.post('/login', postUserLogin)

// router.get('/:id', getStoryById)

// router.patch('/:id', patchStory)

// router.delete('/:id', deleteStory)

module.exports = router
