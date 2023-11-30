const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

const auth = require('./routes/auth')
const user = require('./routes/user')
const stories = require('./routes/stories')
const genres = require('./routes/genres')

const sequelize = require('./utils/database')

const User = require('./models/user')
const Story = require('./models/story')
const Genre = require('./models/genre')

User.hasMany(Story)
Genre.hasMany(Story)

const app = express()

app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true
}))
app.use(bodyParser.json())
app.use(cookieParser())

app.use((req: any, res: any, next: any) => {
    const { authorization } = req.headers
    const isTokenVerified = authorization ? !!jwt.verify(authorization, process.env.JWT_SECRET) : null

    const guestRoutes = [
        '/api/auth/login'
    ]

    const isGuestAllowed = guestRoutes.find(guestRoute => guestRoute === req.url)

    if (isTokenVerified || isGuestAllowed) next()
    else res.sendStatus(403)
})

app.use('/api/auth', auth)
app.use('/api/user', user)
app.use('/api/stories', stories)
app.use('/api/genres', genres)

app.use((req: any, res: any) => {
    res.sendStatus(404)
})

sequelize.sync()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`server started on ${process.env.PORT}`);
        })
    })
    .catch((err: any) => {
        console.log('sequelize sync err', err);
    })
