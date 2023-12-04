const logger = require('./loggerConfig')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const encodePassword = async (password) => {
    try {
        const hash = await bcrypt.hash(password, saltRounds);
        return { status: 200, data: hash };
    } catch (err) {
        let messageError = 'Ocorreu um erro ao realizar a criptografia da senha';
        logger.logger.log('error', messageError);
        return { status: 500, data: err };
    }
}

const comparePassword = async (password, hash) => {
    try {
        const result = await bcrypt.compare(password, hash)
        return { status: 200, data: result };
    } catch (err) {
        let messageError = 'Ocorreu um erro ao comparar a senha criptografada'
        logger.logger.log('error', messageError)
        return {status: 500, data: err}
    }
}

module.exports = { encodePassword, comparePassword }
