import { AMQPClient } from '@cloudamqp/amqp-client';
import { config } from '../config';
import { sendReport } from './utils';

export async function createAmqpConnection() {
  try {
    //Setup a connection to the RabbitMQ server
    const { cloudAmpqUrl } = config;
    const connection = new AMQPClient(cloudAmpqUrl);
    await connection.connect();
    const channel = await connection.channel();
    console.log('[✅✅] Connection over channel established');

    return { channel, connection };
  } catch (error) {
    console.error(error);
    // Retry after 3 second
    setTimeout(() => {
      createAmqpConnection();
    }, 3000);
  }
}

export async function createQueue(channel, queueName, exchangeName, exchangeType) {
  try {
    //Declare the exchange
    await channel.exchangeDeclare(exchangeName, exchangeType);
    //Declare the queue
    const queue = await channel.queue(queueName);
    //Create a binding between the echange and queue with a binding key "notification"
    await channel.queueBind(queueName, exchangeName, 'notification');
    console.log('[📥📥] AMQP queue established');
    return queue;
  } catch (error) {
    console.error(error);
  }
}

export async function publisher(queue, jsonReport, name) {
  try {
    // Publish a report to the AMQP exchange
    await queue.publish(jsonReport, { deliveryMode: 2 });
    console.log('[📥📥] Report sent to queue for user :', name);
  } catch (error) {
    console.error(error);
  }
}

export async function consumer(queue, channel, connection) {
  let counter = 0;
  await queue.subscribe({ noAck: false }, async (msg) => {
    try {
      if (msg) {
        console.log(`[📤📤] Message received (${++counter})`);
        const { content, email, reportType } = await JSON.parse(msg.bodyToString());
        await sendReport(content, email, reportType);
        msg.ack();
      }
    } catch (error) {
      console.error(error);
    }
  });

  // When the process is terminated, close the connection
  process.on('SIGINT', () => {
    channel.close();
    connection.close();
    console.log('[❎❎] Connection closed for AMPQ server');
    process.exit(0);
  });
}
