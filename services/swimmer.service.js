const dbUtil = require('../utils/db.util')
const Swimmer = require('../models/swimmer.model')

dbUtil.connect()

exports.addSwimmer = swimmer => {
    return new Promise((succeed, fail) => {
        swimmer = new Swimmer(swimmer)
        swimmer.save(err => {
            if (err) {
                fail({
                    success: false,
                    error: err,
                    status: 500
                })
            } else {
                succeed({
                    success: true,
                    data: swimmer,
                    status: 200
                })
            }
        })
    })
}
exports.updateSwimmer = (id, updates) => {
    return new Promise((succeed, fail) => {
        Swimmer.findByIdAndUpdate(id, { ...updates
        }, (err, data) => {
            if (err) {
                fail({
                    success: false,
                    error: err,
                    status: 500
                })
            } else {
                succeed({
                    success: true,
                    data: swimmers,
                    status: 200
                })
            }
        })
    })
}

exports.getSwimmers = () => {
    return new Promise((succeed, fail) => {
        let done = false
        Swimmer.find({}, (err, swimmers) => {
            swimmers.map((swimmer, index) => {
                let today = new Date()
                let birthday = new Date(swimmer.birthday)
                console.log(swimmer.birthday)
                let age = today.getFullYear() - birthday.getFullYear()
                const m = today.getMonth() - birthday.getMonth()
                if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }
                swimmer.birthday = age;
                if (index = swimmers.length) {
                    done = true
                }
            })
            if (done) {
                if (err) {
                    fail({
                        success: false,
                        error: err,
                        status: 500
                    })
                } else {
                    succeed({
                        success: true,
                        data: swimmers,
                        status: 200
                    })
                }
            }
            
        })
    })
}
exports.getSwimmersByAgeGroup = group => {
    return new Promise((succeed, fail) => {
        Swimmer.find({
            age: {
                $lte: group.max,
                $gte: group.min
            }
        }, (err, swimmers) => {
            if (err) {
                fail({
                    success: false,
                    error: err,
                    status: 500
                })
            } else {
                succeed({
                    success: true,
                    data: swimmers,
                    status: 200
                })
            }
        })
    })
}
exports.getSwimmersByGender = gender => {
    return new Promise((succeed, fail) => {
        Swimmer.find({
            gender: gender.trim()
        }, (err, swimmers) => {
            if (err) {
                fail({
                    success: false,
                    error: err,
                    status: 500
                })
            } else {
                succeed({
                    success: true,
                    data: swimmers,
                    status: 200
                })
            }
        })
    })
}
exports.getBestSwimmersInSeason = (agegroup, season, year) => {
    return new Promise((succeed, fail) => {
        Swimmer.find({
            "score.season": season,
            "score.points": {
                $gte: 8
            },
            age: {
                $lte: agegroup.max,
                $gte: agegroup.min
            }
        }, (err, swimmers) => {
            if (err) {
                fail({
                    success: false,
                    error: err,
                    status: 500
                })
            } else {
                succeed({
                    success: true,
                    data: swimmers,
                    status: 200
                })
            }
        })
    })
}