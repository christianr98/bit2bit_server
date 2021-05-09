const router = require('express').Router()
const Question = require('../model/Question')
const { questionValidation } = require('../../validation')
const verify = require('./verifyToken')

router.get('/', async (req, res) => {
    try {
        const questions = await Question
            .find()
            .populate('user', 'name email')
            
        res.json(questions)
    } catch (err) {
        res.json({message: err})
    }
})
router.post('/', async (req, res) => {
    // Validate data from user
    const {error} = questionValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const question = new Question({
        title: req.body.title,
        detail: req.body.detail,
        user: req.body.user_id        
    })
    try {
        const savedQuestion = await question.save()
        res.json(savedQuestion)
    } catch (err) {
        res.json({message: err})
    }
})


module.exports = router