const LogDao = require('../dao/logDao')

const salva = (payload) => {
    LogDao.inserir(payload.data, payload.acao, payload.autorId, payload.autorEmail, payload.filter, payload.substring)
}

module.exports = {salva};
