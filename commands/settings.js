exports.run = (client, message, [setting, ...args]) => {
    const guildConf = client.settings.ensure(message.guild.id, client.defaultSettings);

    // Show settings
    if (!setting) {
        let configProps = Object.keys(guildConf).map(prop => {
            return `${prop}  :  ${guildConf[prop]}\n`;
        }).join('');
        message.channel.send(`The following are the server's current configuration:
        \`\`\`${configProps}\`\`\``);
    }
    else if (args.length > 0) {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You must be an Administrator to use this command.");

        const [prop, ...value] = [setting, args];

        if (!client.settings.has(message.guild.id, prop)) {
            return message.reply("This key is not in the configuration.");
        }

        client.settings.set(message.guild.id, value.join(" "), prop);

        message.channel.send(`Guild configuration item \`${prop}\` has been changed to:\n\`${value.join(" ")}\``);
    }
    else {
        message.reply("Missing one or more arguments.");
    }
}


exports.usage = "!settings [setting value]";

exports.description = "Show the current settings or change some settings for the server.";