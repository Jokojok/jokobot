exports.run = (client, message, args) => {
    message.channel.send("!loop").catch(console.error);
}