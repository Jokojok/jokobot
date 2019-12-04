module.exports = (client, member) => {
    // First, ensure the settings exist
    client.settings.ensure(member.guild.id, defaultSettings);

    // First, get the welcome message using get: 
    let welcomeMessage = client.settings.get(member.guild.id, "welcomeMessage");

    // Our welcome message has a bit of a placeholder, let's fix that:
    welcomeMessage = welcomeMessage.replace("{{user}}", member.user.tag)

    // we'll send to the welcome channel.
    member.guild.channels
        .find("name", client.settings.get(member.guild.id, "welcomeChannel"))
        .send(welcomeMessage)
        .catch(console.error);
}