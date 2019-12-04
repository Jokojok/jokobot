exports.run = (client, message, args) => {
    message.reply("I'm alive !").catch(console.error);
}


exports.usage = "!ping";

exports.description = "Ping yourself.";