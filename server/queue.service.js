const amqplib = require('amqplib');

const exchange = 'user.signed_up';
const queue = 'user.sign_up_email';
const routingKey = 'sign_up_email';

const amqpUrl = process.env.AMQP_URL || 'amqp://guest:guest@rabbitmq:5672';
let connection
let channel 

const init = async _=>{
    connection = await amqplib.connect(amqpUrl, 'heartbeat=60');
    channel = await connection.createChannel();
    console.log('queue server initialize');
}

const sendMessage = async msg=>{
    try {
        console.log('Publishing');
        await channel.assertExchange(exchange, 'direct', {durable: true});
        await channel.assertQueue(queue, {durable: true});
        await channel.bindQueue(queue, exchange, routingKey);
        
        await channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(msg)));
        console.log('Message published');
    } catch(e) {
        console.error('Error in publishing message', e);
    }
}


module.exports = {
    sendMessage,
    init
}
