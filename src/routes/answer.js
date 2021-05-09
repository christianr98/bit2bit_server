const router = require('express').Router()
const Answer = require('../model/Answer')
const { questionValidation, answerValidation } = require('../../validation')
const verify = require('./verifyToken')

router.get('/', async (req, res) => {
    try {
        const answers = await Answer
            .find()
            .populate('user')
        res.json(answers)
    } catch (err) {
        res.json({message: err})
    }
})
router.post('/', async (req, res) => {
    // Validate data from user
    const {error} = answerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const answer = new Answer({
        detail: req.body.detail,
        user: req.body.user_id,
        question: req.body.question_id        
    })
    try {
        const savedAnswer = await answer.save()
        res.json(savedAnswer)
    } catch (err) {
        res.json({message: err})
    }
})

// Get answers of a certain question
router.get('/question/:question_id', async (req, res) => {
    try {
        const answers = await Answer
            .find({question: req.params.question_id})
            .populate('user', 'name email')
        res.json(answers)
    } catch (err) {
        res.json({message: err})
    }
})

module.exports = router