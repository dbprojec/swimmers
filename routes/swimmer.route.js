const express = require('express')
const router = express.Router()
const swimmerController = require('../controllers/swimmer.controller')

router.get('/swimmers', swimmerController.getSwimmers)
router.post('/swimmers', swimmerController.addSwimmer)
router.get('/swimmers/season/:season/:min/:max', swimmerController.getBestSwimmersInSeason)
router.get('/swimmers/gender/:gender', swimmerController.getSwimmersByGender)
router.get('/swimmers/age/:min/:max', swimmerController.getSwimmersByAgeGroup)

module.exports = router