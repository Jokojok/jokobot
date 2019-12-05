module.exports = (client, message) => {
    const guildConf = client.settings.ensure(message.guild.id, client.defaultSettings);
    const prefix = guildConf.prefix;

    // Check if author is a bot
    if (message.author.bot) return;
    // Check if not direct message
    if (!message.guild) return;

    // For levels
    const key = `${message.author.id}`;
    client.levels.ensure(`${key}`, {
        user: key,
        experiences: 0,
        level: 0,
        lastTalked: Date.now()
    });
    client.levels.inc(key, "experiences");
    client.levels.set(key, Date.now(), "lastTalked");

    const curLevel = Math.floor(0.1 * Math.sqrt(client.levels.get(key, "experiences")));

    if (client.levels.get(key, "level") < curLevel) {
        message.reply(`You've leveled up to level **${curLevel}**! Ain't that dandy?`);
        client.levels.set(key, curLevel, "level");
    }

    // Check if prefix is here
    if (!message.content.startsWith(prefix)) return;

    // Decoding command
    let args = message.content.substring(prefix.length).trim().split(/ +/g);
    let supArgs = [];
    let command = args.shift().toLowerCase();

    // Prepare the possibilities of supplementary arguments
    let possibleSupArgs = message.content.substring(prefix.length).trim().split(/\-+/g);
    for (i = 1; i < possibleSupArgs.length; i++) {
        supArgs[i - 1] = possibleSupArgs[i].trim().split(/ +/g);
    }

    // Grab the command data from the client.commands Enmap
    let cmd = client.commands.get(command);

    // If that command doesn't exist, silently exit and do nothing
    if (!cmd) return;

    // Run the command
    cmd.run(client, message, args, supArgs);
};