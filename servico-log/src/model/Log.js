const { DataTypes } = require("sequelize")
const sequelize = require("../helpers/bd-config")

const LogModel = sequelize.define('Log',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        data: {
            type: DataTypes.DATE,
            allowNull: false
        },
        acao: {
            type: DataTypes.STRING,
            allowNull: false
        },
        autorId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        autorEmail: {
            type: DataTypes.STRING,
            allowNull: false
        },
        filter: {
            type: DataTypes.STRING,
            allowNull: false
        },
        substring: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }
)

module.exports = LogModel
