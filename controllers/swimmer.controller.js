const swimmerService = require('../services/swimmer.service.js')

exports.addSwimmer = (req, res) => {
    if (req.body.birthday) {
        req.body.birthday = new Date(req.body.birthday)
    }
    if (req.body.time) {
        req.body.time = parseInt(req.body.time)
    }
    swimmerService.addSwimmer(req.body)
        .then(data => res.status(data.status).json(data))
        .catch(err => res.status(err.status).json(err))
}
exports.getSwimmers = (req, res) => {
    swimmerService.getSwimmers()
        .then(data => res.status(data.status).json(data))
        .catch(err => res.status(err.status).json(err))
}
exports.getSwimmersByAgeGroup = (req, res) => {
    swimmerService.getSwimmersByAgeGroup({
            min: parseInt(req.params.min),
            max: parseInt(req.params.max)
        })
        .then(data => res.status(data.status).json(data))
        .catch(err => res.status(err.status).json(err))
}
exports.getBestSwimmersInSeason = (req, res) => {
    swimmerService.getBestSwimmersInSeason({
            min: parseInt(req.params.min),
            max: parseInt(req.params.max)
        }, req.params.season)
        .then(data => res.status(data.status).json(data))
        .catch(err => res.status(err.status).json(err))
}
exports.getSwimmersByGender = (req, res) => {
    swimmerService.getSwimmersByGender(req.params.gender)
        .then(data => res.status(data.status).json(data))
        .catch(err => res.status(err.status).json(err))
}