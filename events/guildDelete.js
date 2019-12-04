module.exports = (guild) => {
    // When the bot leaves or is kicked, delete settings to prevent stale entries.
    client.settings.delete(guild.id);

    // This event triggers when the bot is removed from a guild.
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    client.user.setActivity(`Serving ${client.guilds.size} servers`);
};