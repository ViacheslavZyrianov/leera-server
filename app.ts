const express = require('express')
const bodyParser = require('body-parser')

const stories = require('./routes/stories')
const user = require('./routes/user')
const genres = require('./routes/genres')

const sequelize = require('./utils/database')

const User = require('./models/user')
const Story = require('./models/story')
const Genre = require('./models/genre')

User.hasMany(Story)
Genre.hasMany(Story)

const app = express()

app.use(bodyParser.json())

app.use('/stories', stories)
app.use('/user', user)
app.use('/genres', genres)

app.use((req: any, res: any) => {
    res.sendStatus(404)
})

sequelize.sync({ force: true })
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`server started on ${process.env.PORT}`);
        })
    })
    .catch((err: any) => {
        console.log('sequelize sync err', err);
    })
