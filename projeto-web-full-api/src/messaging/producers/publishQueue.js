const amqp = require('amqplib/callback_api');
const ON_DEATH = require('death');
const logger = require('../../helpers/loggerConfig')

const url = `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}`;

const publish = (exchange, routerKey, msgPayload) => {

    amqp.connect(url, (connectError, connection) => {

        if (connectError) {
            logger.logger.log('error', `Erro ao realizar conexão com RabbitMQ ${connectError}`)
            throw connectError;
        }

        connection.createChannel((channelError, channel) => {

            if (channelError) {
                logger.logger.log('error', `Falha ao criar canal no RabbitMQ ${channelError}`)
                throw channelError;
            }

            channel.assertExchange(exchange, 'direct', {durable: true});
            channel.publish(exchange, routerKey, Buffer.from(msgPayload));

            logger.logger.log('info', `Mensagem postada na fila: ${routerKey}`)
            return '';
        });

        ON_DEATH((signal, error) => {
            console.log("\nClear...");
            setTimeout(() => {
                connection.close();
                process.emit(0);
            }, 500);
        });
    });
}

module.exports = { publish };
