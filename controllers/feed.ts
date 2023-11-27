const Story = require('../models/story')

exports.postStory = (req: any, res: any) => {
    Story.create(req.body)
        .then(() => {
            res.sendStatus(201)
        })
        .catch((err: any) => {
            res.send(err)
        })
}

exports.getAllStories = (req: any, res: any) => {
    Story.findAll()
        .then((storyRes: any) => {
            if (storyRes) res.send(storyRes)
            else res.send(404)
        })
        .catch((err: any) => {
            res.send(err)
        })
}

exports.getStoryById = (req: any, res: any) => {
    Story.findByPk(req.params.id)
        .then((storyRes: any) => {
            if (storyRes) res.send(storyRes)
            else res.send(404)
        })
        .catch((err: any) => {
            res.send(err)
        })
}

exports.patchStory = (req: any, res: any) => {
    Story.update(req.body, { where: { id: req.params.id } })
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
