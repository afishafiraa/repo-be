const express = require('express');
const router = express.Router();
// const { get, getById, create, destroy } = require('../app/controller/users')
const controller = require('../app/controller')
const { auth }  = require('../utils/jwt')

const passport = require('../utils/passport');
const passportOAUTH = require('../utils/oauth');

router.post('/api/auth/login', controller.auth.login)
router.post('/api/auth/register', controller.auth.register)
router.get('/api/auth/whoami', auth, controller.auth.whoami)

//view register
router.get('/register', (req, res) => {
    res.render('register.ejs')              //render untuk menampilkan html/view engine
})
router.post('/register', controller.auth.registerForm)

//view login
router.get('/login', (req, res) => {
    res.render('login.ejs')              //render untuk menampilkan html/view engine
})
router.get('/forgetpassword', (req, res) => {
    res.render('forgetpassword.ejs')              //render untuk menampilkan html/view engine
})
//integrasikan passport ke router
router.post('/login', passport.authenticate('local',{
    successRedirect: '/dashboard',
    failureRedirect: '/login'
}))

router.get('/auth/google', 
    passportOAUTH.authenticate('google', {
        scope: ['profile', 'email', ]
    })
)
router.get('/auth/google/callback',
    passportOAUTH.authenticate('google', {
        failureRedirect: '/login',
        session: false
    }), controller.auth.oauth
)

module.exports = router;