const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs/dist/bcrypt')
const express = require('express')
const router = express.Router()
const User = require('../model/userSchema')
require('../db/conn')

router.get('/', (req, res) => {
    res.send('Hello World from the server router')
}) 

router.post('/register', async (req, res) => { 
    const { name, email, phone, work, password, cpassword } = req.body
    if ( !name || !email || !phone || !work || !password || !cpassword ) {
        return res.status(422).json({ error: "Plz filled the field properly "})
    }

    try {
        const userExist = await User.findOne({ email: email })
        if (userExist) {
            return res.status(422).json({ error: "Email already exist"})
        } else if (password != cpassword){
            return res.status(422).json({ error: "password are not matching "})
        } else {
            const user = new User({ name, email, phone, work, password, cpassword })
            await user.save()
            res.status(201).json({ message: "user registered succesfully"})
        }
        
    } catch (err) {
        console.log(err)
    }
})

// login route
router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body
        if ( !email || !password ) {
            return res.status(400).json({ error: "Plz filled the data"})
        }
        const userLogin = await User.findOne({ email: email })
        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password)
            const token = await userLogin.generateAuthToken()
            console.log(token)
        if ( !isMatch ) {
            res.status(400).json({ error: "invalid credentials password "})
        } else {
            res.json({ message: "user Signin successfully"})
        }
        } else {
            res.status(400).json({ error: "Invalid credentials"})
        }
    } catch (err) {
        console.log(err)
    }
})



module.exports = router