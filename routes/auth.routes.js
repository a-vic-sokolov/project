const {Router} = require('express')
const bcrypt = require('bcryptjs')
const {check, validatorResult} = require('express-validator')
const User = require('../models/Users')
const router = Router()

router.post('/register',
    [
        check('email', 'Uncorrectly email').isEmail(),
        check('password', 'Uncorrectly password. Minimal 6 symbols').isLength({min:6, max: 30})
    ],
    async (req, res) => {
    try {

        const errors = validatorResult(req)

        if(!errors.isEmpty())
        {
            return res.status(400).json({errors: "Invalid form"})
        }

        const {email, password} = req.body

        const candidate = await User.findOne({email})

        if (candidate)
        {
            return res.status(400).json({message:"User finded"})
        }

        const  hashed_password = await bcrypt.hash(password, config.get('secret_string'))
        const user = new User({email, password: hashed_password})

        await user.save()

        res.status(201).json({message: "User created"})


    } catch (e) {
        res.status(500).json({message: 'Ошибка'})
    }
})
router.post('/login', (req, res) => {

})

module.exports = router