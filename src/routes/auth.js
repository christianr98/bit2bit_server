const router = require('express').Router()
//const User = require('../index')
const User = require('../model/User')
const Joi = require('joi')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {registerValidation, loginValidation} = require('../../validation')

//Add a new User
router.post('/register', async (req,res) => {

    // Validate data from user
    const {error} = registerValidation(req.body)
    if (error) return res.status(400).send({message: error.details[0].message})

    //Check if email already exists
    const emailExists = await User.findOne({email: req.body.email})
    if(emailExists) return res.status(400).send({message:'Correo ingresado no existe'})
    
    //Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password,salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    try {
        const savedUser = await user.save()
        res.send({user: user.id})
    } catch (err) {
        res.status(400).send({message: error.details[0].message})
    }
})

// Login
router.post('/login', async (req,res) => {
    // Validate login
    const {error} = loginValidation(req.body)
    if (error) return res.status(400).send({message: error.details[0].message})


    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send({message: 'Correo ingresado no existe'})

    const validPass = await bcrypt.compare(req.body.password,user.password)
    if(!validPass) return res.status(400).send({message:'Contraseña incorrecta'})

    const token = jwt.sign({_id: user.idUser}, process.env.TOKEN)
    res.header('auth-token',token).send({id: user._id, token: token})    
})

    //Hash the password
    //const salt = bcrypt.genSalt(10)
    //req.body.password = bcrypt.hash(req.body.password,salt)
    //res.send(req.body.password)

    //Add the user
    //User.create(req.body)
    //.then(user => res.json(user))
    //.catch(err => res.status(400).send(err))

module.exports = router