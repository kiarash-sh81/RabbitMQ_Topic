const amqp = require('amqplib');
const ExchangeName = "topicMessage";
const [logType , message] = process.argv.slice(2);
async function sendData(){
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    await channel.assertExchange(ExchangeName , 'topic' );
    channel.publish(ExchangeName , logType ,Buffer.from(message))
    setTimeout(()=>{
        process.exit(0);
    })
}

sendData()