const Joi = require('joi')

const registerValidation = data => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(data)
}
const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(data)
}
const questionValidation = data => {
    const schema = Joi.object({
        title: Joi.string().min(8).required(),
        detail: Joi.string().min(8).required(),
        user_id: Joi.required(),
    })
    return schema.validate(data)
}
const answerValidation = data => {
    const schema = Joi.object({
        detail: Joi.string().min(8).required(),
        user_id: Joi.required(),
        question_id: Joi.required(),
    })
    return schema.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
module.exports.questionValidation = questionValidation
module.exports.answerValidation = answerValidation