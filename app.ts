const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const auth = require('./routes/auth')
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
    origin: 'http://localhost:8080'
}))
app.use(bodyParser.json())

app.use('/api/auth', auth)
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
