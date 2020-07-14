const rabbitmqLib = require('./queue/rabbitmq');

function fnConsumer(msg, callback) {
    console.log("Received message: ", msg.content.toString());
    // we tell rabbitmq that the message was processed successfully
    callback(true);
}

// InitConnection of rabbitmq
rabbitmqLib.InitConnection(() => {
    // start consumer worker when the connection to rabbitmq has been made
    rabbitmqLib.StartConsumer("poc-delayed-queue", fnConsumer);
    // start Publisher when the connection to rabbitmq has been made
    rabbitmqLib.StartPublisher();
});

// We wait 5 seconds after send a message to queue. ONLY FOR TEST PURPOSES
setTimeout(() => {
    // Define options for message. This is optional.
    const options = {
        persistent: true,
        headers: {
            "x-delay": "5000"
        }
    };
    // We send a message to queue
    rabbitmqLib.PublishMessage("poc-delayed-exchange", "", "I'm a string!", options);
}, 5000);
