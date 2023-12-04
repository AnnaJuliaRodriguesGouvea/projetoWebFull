const FruitModel = require("../models/Fruit")

module.exports = {
    list: async function(limit, page, whereCondition = {}) {
        return await FruitModel.findAndCountAll({
            limit: limit,
            offset: (page - 1) * limit,
            where: whereCondition
        })
    },

    insert: async function(name, family, order, genus, calories, fat, sugar, carbohydrates, protein) {
        return await FruitModel.create({
            name: name,
            family: family,
            order: order,
            genus: genus,
            calories: calories,
            fat: fat,
            sugar: sugar,
            carbohydrates: carbohydrates,
            protein: protein
        })
    },

    getByName: async function(name) {
        return await FruitModel.findOne({ where: { name: name } })
    },
}
