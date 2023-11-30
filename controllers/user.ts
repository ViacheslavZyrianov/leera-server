const User = require('../models/user')

exports.getUserMe = (async (req: any, res: any) => {
    try {
        const { uuid } = req.headers
        const me = await User.findOne({
            attributes: ['uuid', 'username', 'email', 'avatar', 'isEmailApproved', 'isPremium', 'createdAt', 'updatedAt'],
            where: {
                uuid
            }
        })
        res.send(me)
    } catch (err: any) {
        res.send(err)
    }
})

exports.getUser = (async (req: any, res: any) => {
    try {
        const result = await User.findOne({
            attributes: ['uuid', 'username', 'avatar', 'isPremium'],
            where: {
                uuid: req.params.uuid
            }
        })

        res.send(result)
    } catch (err: any) {
        res.send(err)
    }
})
