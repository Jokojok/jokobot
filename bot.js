const Discord = require('discord.js');
const Enmap = require("enmap");
const fs = require("fs");

const client = new Discord.Client();
const embed = new Discord.RichEmbed();
const auth = require('./auth.json');
client.embed = embed;

client.commands = new Enmap({
    name: "commands"
});
client.settings = new Enmap({
    name: "settings",
    cloneLevel: 'deep'
});
client.levels = new Enmap({
    name: "levels"
});

client.defaultSettings = {
    prefix: "!",
    logChannel: "logs",
    modRole: "Moderator",
    adminRole: "Administrator",
    welcomeChannel: "welcome",
    welcomeMessage: "Say hello to {{user}}, everyone!"
}

// This loop reads the /events/ folder and attaches each event file to the appropriate event.
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;

        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];

        client.on(eventName, event.bind(null, client));
        delete require.cache[require.resolve(`./events/${file}`)];
    });
});

fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;

        // Load the command file itself
        const props = require(`./commands/${file}`);

        // Get just the command name from the file name
        let commandName = file.split(".")[0];
        console.log(`Attempting to load command ${commandName}`);

        // Here we simply store the whole thing in the command Enmap. We're not running it right now.
        client.commands.set(commandName, props);
    });
});

client.login(auth.token);