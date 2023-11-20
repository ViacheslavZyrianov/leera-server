const express = require('express')

const router = express.Router()

router.get('/', (req: any, res: any) => {
    console.log('get /');
    res.send('Home')
})

router.get('/about', (req: any, res: any) => {
    console.log('get /about');
    res.send('About')
})

module.exports = router
