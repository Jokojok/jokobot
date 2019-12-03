exports.run = (client, message, [cleanNumber, ...reason]) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return notPerm(message, "!clean");

    if (isNaN(cleanNumber) || Number.isInteger(cleanNumber)) return message.reply("Must provide a number to clean.");

    if (cleanNumber > 100) return message.reply("The number cannot be > 100, else it won't work.");

    previousMsg = message.channel.fetchMessages({ limit: cleanNumber })
        .then(messages => message.channel.bulkDelete(messages))
        .catch(console.error);
    message.delete()
        .then(message => {
            if (reason.length === 0) {
                message.channel.send(`Cleaned ${cleanNumber} messages by ${message.author.username}`);
            }
            else {
                message.channel.send(`Cleaned ${cleanNumber} messages by ${message.author.username} or this reason :\n\`${reason}\``);
            }
        })
        .catch(console.error);
}