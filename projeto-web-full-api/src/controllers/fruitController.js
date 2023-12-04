const express = require("express")
const router = express.Router()
const fruitService = require("../services/fruitService")
const fruitValidator = require("../validators/fruitValidator")
const authenticationValidator = require("../validators/authenticationValidator")
const paginationValidator = require("../validators/paginationValidator")
const cache = require('../cache/redisConfig')
const redisMiddleware = require("../cache/redisMiddleware")

router.get("/",
    authenticationValidator.validateToken,
    paginationValidator.validateLimit,
    paginationValidator.validatePage,
    fruitValidator.validateFilter,
    fruitValidator.validateSubstring,
    redisMiddleware.cacheValidate,
    async (req, res) => {
        const response = await fruitService.listFruit(
            req.idLogged,
            req.query.limit,
            req.query.page,
            req.query.filter,
            req.query.substring
        )
        res.status(response.status).json(response.data)
    })

router.post("/",
    authenticationValidator.validateToken,
    fruitValidator.validateName,
    fruitValidator.validateFamily,
    fruitValidator.validateOrder,
    fruitValidator.validateGenus,
    fruitValidator.validateCalories,
    fruitValidator.validateFat,
    fruitValidator.validateSugar,
    fruitValidator.validateCarbohydrates,
    fruitValidator.validateProtein,
    cache.invalidate(),
    async (req, res) => {
        const response = await fruitService.registerFruit(
            req.idLogged,
            req.body.name,
            req.body.family,
            req.body.order,
            req.body.genus,
            req.body.calories,
            req.body.fat,
            req.body.sugar,
            req.body.carbohydrates,
            req.body.protein
        )

        res.status(response.status).json(response.data);
    })

module.exports = router
