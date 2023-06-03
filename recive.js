const amqp = require('amqplib');
const ExchangeName = "topicMessage";
const logType = process.argv.slice(2);
console.log(logType);
async function reciveData(){
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    await channel.assertExchange(ExchangeName , 'topic' );
    const assertedQueue = await channel.assertQueue('' , {exclusive: true});
    for (const pattern of logType) {
        channel.bindQueue(assertedQueue.queue , ExchangeName , pattern);
    }
    channel.consume(assertedQueue.queue , msg =>{
        console.log(msg.content.toString());
    })
}

reciveData()