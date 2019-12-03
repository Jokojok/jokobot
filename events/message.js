module.exports = (client, message) => {
    const prefix = client.config.prefix;
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    let args = message.content.substring(prefix.length).trim().split(/ +/g);
    let supArgs = [];
    let command = args.shift().toLowerCase();

    // Prepare the possibilities of supplementary arguments
    let possibleSupArgs = message.content.substring(prefix.length).trim().split(/\-+/g);
    for (i = 1; i < possibleSupArgs.length; i++) {
        supArgs[i-1] = possibleSupArgs[i].trim().split(/ +/g);
    }

    // Grab the command data from the client.commands Enmap
    let cmd = client.commands.get(command);

    // If that command doesn't exist, silently exit and do nothing
    if (!cmd) return;

    // Run the command
    cmd.run(client, message, args, supArgs);
};