const express = require('express')
const { userRegister, emailVerification, resendVerification, forgetpassword, resetPassword, signIn, signOut } = require('../controller/userController')
const { userCheck, validate } = require('../validation/validator')
const router = express.Router()

router.post('/register', userCheck, validate, userRegister)
router.get('/emailverification/:token', emailVerification)
router.post('/resendverification',resendVerification)
router.post('/forgetpassword',forgetpassword)
router.post('/resetpassword/:token',resetPassword)
router.post('/signin', signIn)
router.get('/signout' , signOut)


module.exports = router
