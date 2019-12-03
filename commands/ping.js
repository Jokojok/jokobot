exports.run = (client, message, args) => {
    message.reply("I'm alive !").catch(console.error);
}