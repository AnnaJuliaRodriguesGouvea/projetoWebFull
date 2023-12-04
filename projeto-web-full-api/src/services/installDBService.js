const sequelize = require("../helpers/bdConfig")

module.exports = {
    install: async function () {
        await sequelize.sync({force: true})
    }
}
