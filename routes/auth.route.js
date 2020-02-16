const {Router} = require('express')
const bcr = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()
const config = require('../config/default')

/*
    POST

    Register User
*/
router.get('/register', (req, res) => {
    res.send('is working')
})

router.post(
    '/register', 
    [
        check('email', 'Its not email!').isEmail(),
        check('password', 'Password should be longer then 6 chars')
            .isLength({min: 6})
    ],
    async (req, res) => {
    try {

        console.log(req.body)
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'register errors'
            })
        }
        const {email, password} = req.body
        const checkUser = await User.findOne({ email })
        if (checkUser) {
            return res.status(400).json({message: 'User exist'})
        }
        const hashPass = await bcr.hash(password, 12)
        const user = new User({email, password: hashPass})
        await user.save()
        res.status(201).json({message: 'user created'})
    } catch (e) {
        res.status(500).json({message: 'catching error'})
    }
})



router.post(
    '/login',
    [
        check('email', 'Invalid email').normalizeEmail().isEmail(),
        check('password', 'Password not exist').exists()
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'login errors'
            })
        }

        const {email, password} = req.body
        const user =  await User.findOne({email})

        if(!user) {
            return res.status(400).json({message: 'User dosnt exist'})
        }

        const isMatch = await bcr.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({message: 'User dosnt exist'})
        }

        const token = jwt.sign(
            {userId: user.id},
            config.jwtKey,
            { expiresIn: '1h' }
        )

        res.json({token, userId: user.id})
        


    } catch (e) {
        res.status(500).json({message: 'catching error'})
    }
})

module.exports = router