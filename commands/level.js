exports.run = (client, message, [command, ...args]) => {
    // Show current advancement
    if (!command) {
        const key = `${message.author.id}`;
        return message.channel.send(`You currently have ${client.levels.get(key, "experiences")} experiences, and are level ${client.levels.get(key, "level")}!`);
    }
    else {
        let usersArray = client.levels.array();
        // What command do you want to do?
        switch (command) {
            case "leaderboard":
                const sorted = usersArray.sort((a, b) => b.levels - a.levels);
                const top10 = sorted.splice(0, 10);

                const embed = client.embed
                    .setTitle("Leaderboard")
                    .setAuthor(client.user.username, client.user.avatarURL)
                    .setDescription("Our top 10 levels leaders!")
                    .setColor(0x00AE86);
                for (const data of top10) {
                    embed.addField(client.users.get(data.user).tag, `${data.experiences} experiences (level ${data.level})`);
                }
                return message.channel.send({ embed });
            case "give":
                // Limited to guild owner
                if (message.author.id !== message.guild.ownerID)
                    return message.reply("You're not the boss of me, you can't do that!");

                const user = message.mentions.users.first() || client.users.get(args[0]);
                if (!user) return message.reply("You must mention someone or give their ID!");

                const experiencesToAdd = parseInt(args[1], 10);
                if (!experiencesToAdd)
                    return message.reply("You didn't tell me how many experiences to give...")

                // Ensure there is a experiences entry for this user.
                client.levels.ensure(`${user.id}`, {
                    user: user.id,
                    experiences: 0,
                    level: 0,
                    lastTalked: Date.now()
                });

                // Get their current experiences.
                let userExperiences = client.levels.get(`${user.id}`, "experiences");
                userExperiences += experiencesToAdd;

                // And we save it!
                client.levels.set(`${user.id}`, userExperiences, "experiences")

                return message.channel.send(`${user.tag} has received ${experiencesToAdd} experiences and now stands at ${userExperiences} experiences.`);
            case "cleanup":
                const rightNow = Date.now();
                const toRemove = usersArray.filter(data => {
                    return rightNow - 2592000000 > data.lastTalked;   // clean user which hasn't been seen in ~1 month
                });

                toRemove.forEach(data => {
                    client.levels.delete(`${data.user}`);
                });
                if (toRemove.length === undefined) return message.channel.send(`There was no old farts to remove.`);
                return message.channel.send(`I've cleaned up ${toRemove.length} old farts.`);
            default:
                return;
        }
    }
}


exports.usage = "!level [leaderboard | give @mention {experience} | cleanup]";

exports.description = "Show the current level of the user or the leaderbord with top10 of the players or give a mentionned user some experience or clean old fart.";