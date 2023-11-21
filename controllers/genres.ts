const Genre = require('../models/genre')

exports.getAllGenres = (req: any, res: any) => {
    Genre.findAll({ where: { isEnabled: true } })
        .then((genresRes: any) => {
            if (genresRes) res.send(genresRes)
            else res.send(404)
        })
        .catch((err: any) => {
            res.send(err)
        })
}
