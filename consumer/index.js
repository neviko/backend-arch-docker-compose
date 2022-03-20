const amqplib = require('amqplib');
const { connectMongo } = require("./database/mongoose.connect")
const amqpUrl = process.env.AMQP_URL || 'amqp://localhost:5673';
const Book = require('./database/mongoose.models')

async function processMessage(bookTitle) {
  const newBook = new Book(bookTitle)
  newBook.save(function (err, book) {
    if (err) return console.error(err);
    console.log(newBook.title + " saved to bookstore collection.");
    });
}



(async () => {
  connectMongo()
  const connection = await amqplib.connect(amqpUrl, "heartbeat=60");
  const channel = await connection.createChannel();
  channel.prefetch(10);
  const queue = 'user.sign_up_email';
  process.once('SIGINT', async () => { 
    console.log('got sigint, closing connection');
    await channel.close();
    await connection.close(); 
    process.exit(0);
  });

  await channel.assertQueue(queue, {durable: true});
  await channel.consume(queue, async (msg) => {
    console.log('processing messages');      
    await processMessage(msg);
    await channel.ack(msg);
  }, 
  {
    noAck: false,
    consumerTag: 'email_consumer'
  });
  console.log(" [*] Waiting for messages. To exit press CTRL+C");
})();