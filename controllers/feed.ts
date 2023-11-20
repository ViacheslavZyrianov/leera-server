const objKeysCamel2Snake = require('../utils/objKeysCamel2Snake')
const formatResponse = require('../utils/formatResponse')

const Story = require('../models/story')

exports.postStory = (req: any, res: any) => {
    Story.create(objKeysCamel2Snake(req.body))
        .then(() => {
            res.sendStatus(201)
        })
        .catch((err: any) => {
            res.send(err)
        })
}

exports.getStoryById = (req: any, res: any) => {
    Story.findByPk(req.params.id)
        .then((storyRes: any) => {
            res.send(formatResponse(storyRes))
        })
        .catch((err: any) => {
            res.send(err)
        })
}

exports.patchStory = (req: any, res: any) => {
    Story.update(objKeysCamel2Snake(req.body), { where: { id: req.params.id } })
        .then(() => {
            res.sendStatus(204)
        })
        .catch((err: any) => {
            res.send(err)
        })
}

exports.deleteStory = (req: any, res: any) => {
    Story.destroy({ where: { id: req.params.id } })
        .then(() => {
            res.sendStatus(204)
        })
        .catch((err: any) => {
            res.send(err)
        })
}
