module.exports = (client, message) => {
    const prefix = client.config.prefix;
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    let args = message.content.substring(prefix.length).trim().split(/ +/g);
    let command = args.shift().toLowerCase();

    // Grab the command data from the client.commands Enmap
    let cmd = client.commands.get(command);

    // If that command doesn't exist, silently exit and do nothing
    if (!cmd) return;

    // Run the command
    cmd.run(client, message, args);
};