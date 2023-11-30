const bcrypt = require('bcrypt')
const { v4: uuid } = require('uuid');
const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.postRegister = ((req: any, res: any) => {
    const createUser = (password: string) => {
        const userData = {
            ...req.body,
            password,
            uuid: uuid()
        }
        User.create(userData)
            .then(() => {
                res.sendStatus(201)
            })
            .catch((err: any) => {
                if (err?.errors && err?.errors[0]) res.status(409).send(err.errors[0].message)
                else res.status(500).send(err)
            })
    }

    bcrypt.genSalt(10, (err: any, salt: string) => {
        bcrypt.hash(req.body.password, salt, (err: any, hash: string) => {
            createUser(hash)
        })
    })
})

exports.postLogin = ((req: any, res: any) => {
    return User.findOne(
        {
            where: { username: req.body.username },
            rejectOnEmpty: true,
        }
    )
        .then((userRes: any) => {
            return bcrypt.compare(req.body.password, userRes.password)
                .then(() => {
                    const token = jwt.sign(userRes.uuid, process.env.JWT_SECRET)

                    const maxAge = 24 * 60 * 60 * 1000 //h:m:s:ms
                    return res
                        .cookie('jwt', token, { maxAge })
                        .cookie('uuid', userRes.uuid, { maxAge })
                        .sendStatus(200)
                })
                .catch((err: any) => {
                    res.status(500).send(err.message)
                })
        })
        .catch(() => {
            res.sendStatus(401)
        })
})
