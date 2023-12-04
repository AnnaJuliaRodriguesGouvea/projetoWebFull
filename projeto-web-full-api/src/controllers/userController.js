const express = require("express")
const router = express.Router()
const userValidator = require("../validators/userValidator")
const userService = require("../services/userService")

router.post("/",
    userValidator.validateEmail,
    userValidator.validatePassword,
    async (req, res) => {
        const response = await userService.registerUser(req.body.email, req.body.password)
        res.status(response.status).json(response.data)
})

module.exports = router