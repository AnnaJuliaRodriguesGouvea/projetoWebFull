var express = require('express')
var router = express.Router()
const authenticationService = require("../services/authenticationService")
const authenticationValidator = require("../validators/authenticationValidator")
const userValidator = require("../validators/userValidator")

router.post('/login', 
    userValidator.validateEmail,
    authenticationValidator.validatePassword,
    async function(req, res) {
        const response = await authenticationService.login(req.body.email, req.body.password)
        res.status(response.status).json(response.data)
})

module.exports = router