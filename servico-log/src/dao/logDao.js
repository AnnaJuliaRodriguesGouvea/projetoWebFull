const LogModel = require("../model/Log.js")

module.exports = {
    inserir: async function(data, acao, autorId, autorEmail, filter, substring) {
        return await LogModel.create({
            data: data,
            acao: acao,
            autorId: autorId,
            autorEmail: autorEmail,
            filter: filter,
            substring: substring
        })
    }
}
