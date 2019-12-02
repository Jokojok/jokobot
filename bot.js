let Discord = require('discord.js');
let auth = require('./auth.json');
let config = require('./config.json');

// Initialize Discord client
let client = new Discord.Client();

client.on('ready', () => {
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
    client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on('message', async message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    let args = message.content.substring(1).split(' ');
    let cmd = args[0];

    args = args.splice(1);
    switch (cmd) {
        case 'ping':
            message.reply("I'm alive !");
            break;
        case 'loop':
            message.channel.send("!loop");
            break;
        // Just add any case commands if you want to..
    }
});

client.on("guildCreate", guild => {
    // This event triggers when the bot joins a guild.
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
    // this event triggers when the bot is removed from a guild.
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.login(auth.token);