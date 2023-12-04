const https = require("https");
const fs = require("fs");

const options = {
    key: fs.readFileSync("./src/certificates/private_key.pem"),
    cert: fs.readFileSync("./src/certificates/server.pem"),
    passphrase: "anna"
};

//Configurando express
const express = require("express")
const cors = require('cors')
const app = express()
const rateLimit = require('express-rate-limit')
const logger = require('./src/helpers/loggerConfig')

//Configuração .env
require("dotenv").config()

//Importantando instalação do banco
const installDB = require('./src/services/installDBService')


//Configurando arquivos públicos e body parser
app.use(express.json(), cors())
const path = require("path")
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

//Criando configuração de limite de requisições
const apiRequestLimiter = rateLimit({
    windowMs: 5000,
    max: 5,
    handler: function (req, res) {
        let messageError = 'Você enviou muitas solicitações. Aguarde um pouco e tente novamente'
        logger.logger.log('error', messageError)
        return res.status(429).json(messageError)
    }
})
app.use(apiRequestLimiter)

//Definindo rotas
app.use("/", require("./src/controllers/authenticationController"))
app.use("/user", require("./src/controllers/userController"))
app.use("/fruit", require("./src/controllers/fruitController"))

https.createServer(options, app).listen(3001, () => {
    // installDB.install()
    //   .then(() => console.log("Banco instalado com sucesso"))
    //   .catch((error) => console.error(error))
    console.log("Rodando na porta 3001")
});
