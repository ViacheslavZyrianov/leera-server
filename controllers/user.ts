const bcrypt = require('bcrypt')
const { v4: uuid } = require('uuid');
const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.postUserRegister = ((req: any, res: any) => {
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

exports.postUserLogin = ((req: any, res: any) => {
    interface loginDataInterface {
        email?: string
        login?: string
        password: string
    }

    let loginKey: string = ''

    if (req.body.hasOwnProperty('email')) loginKey = 'email'
    if (req.body.hasOwnProperty('username')) loginKey = 'username'

    User.findOne(
        {
            where: { [loginKey]: req.body[loginKey] },
            rejectOnEmpty: true,
        }
    )
        .then((userRes: any) => {
            bcrypt.compare(req.body.password, userRes.password)
                .then((userRes: any) => {
                    const loginData: loginDataInterface = {
                        [loginKey]: req.body[loginKey],
                        password: req.body.password
                    }

                    userRes.token = jwt.sign(
                        loginData,
                        process.env.JWT_SECRET,
                        { expires: '1m' }
                    )

                    res.send(userRes)
                })
                .catch((err: any) => {
                    res.send(err)
                })
        })
        .catch((err: any) => {
            res.status(401).send(err)
        })
})
