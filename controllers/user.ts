const objKeysCamel2Snake = require('../utils/objKeysCamel2Snake')
const bcrypt = require('bcrypt')
const { v4: uuid } = require('uuid');
const User = require('../models/user')

exports.postUserRegister = ((req: any, res: any) => {
    const createUser = (password: string) => {
        const userData = objKeysCamel2Snake({
            ...req.body,
            password,
            uuid: uuid()
        })
        User.create(userData)
            .then(() => {
                res.sendStatus(201)
            })
            .catch((err: any) => {
                res.send(err)
            })
    }

    bcrypt.genSalt(10, (err: any, salt: string) => {
        bcrypt.hash(req.body.password, salt, (err: any, hash: string) => {
            createUser(hash)
        })
    })
})

exports.postUserLogin = ((req: any, res: any) => {
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
                    res.send(userRes)
                })
                .catch((err: any) => {
                    res.send(err)
                })
        })
        .catch((err: any) => {
            res.send(err)
        })
})
