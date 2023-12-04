const { DataTypes } = require("sequelize")
const sequelize = require("../helpers/bdConfig")

const FruitModel = sequelize.define('Fruit', 
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        family: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        order: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        genus: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        calories: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        fat: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        sugar: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        carbohydrates: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        protein: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }
)




module.exports = FruitModel