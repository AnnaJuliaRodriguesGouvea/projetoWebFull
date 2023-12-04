const Ouvinte = require('./ouvinteRabbitmq')
const BuscaRealizadaService = require('../../services/buscaRealizadaService')

const iniciaOuvinte = () => {
    Ouvinte.consumer('SistemaLogExchange',
        'busca_fruits_realizada_log_queue',
        'busca-fruits-realizada-log',
        (msg) => {
            BuscaRealizadaService.salva(msg)
        });
}

module.exports = {iniciaOuvinte};

