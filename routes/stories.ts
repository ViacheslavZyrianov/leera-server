const express = require('express')

const {
    postStory,
    getStoryById,
    patchStory,
    deleteStory
} = require('../controllers/feed')

const router = express.Router()

router.post('/', postStory)

router.get('/:id', getStoryById)

router.patch('/:id', patchStory)

router.delete('/:id', deleteStory)

module.exports = router
