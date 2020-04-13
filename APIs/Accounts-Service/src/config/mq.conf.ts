import amqp from 'amqplib/callback_api';
import { environment } from '../environments/environment';

let ch = null;

amqp.connect(environment.queueURL, function (err, conn) {
   conn.createChannel(function (err, channel) {
      ch = channel;
   });
});

const publishToQueue = async (queueName, data) => {
   ch.sendToQueue(queueName, Buffer.from(data));
}

const publishToExchange = async (queueName, data) => {
    ch.publish(queueName,'', Buffer.from(data));
 }

process.on('exit', (code) => {
   ch.close();
   console.log(`Closing rabbitmq channel`);
});

export {publishToQueue, publishToExchange}