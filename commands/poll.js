exports.run = (client, message) => {
    let pollMsg = message.content.substring(5);
    let pollArg = pollMsg.split(/\s*;\s*/);
    let pollDescription = "";

    if (pollArg.length < 1) return message.reply("You must have at least 1 question.");

    // variables
    const choiceEmojis = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🇯', '🇰', '🇱', '🇲', '🇳', '🇴', '🇵', '🇶', '🇷', '🇸', '🇹', '🇺', '🇻', '🇼', '🇽', '🇾', '🇿'];

    // poll message creation
    pollMsg = client.embed
        .setTitle(`${pollArg[0]}`)
        .setAuthor(message.author.username, message.author.avatarURL)
        .setColor(0x00AE86)
        .setTimestamp();

    for (let i = 1; i < pollArg.length; i++) {
        pollDescription += choiceEmojis[i - 1] + " - " + pollArg[i];
        pollDescription += "\n";
    }
    pollMsg.setDescription(pollDescription);

    // sending poll
    if (pollArg.length === 1) {   // Yes/No
        message.channel.send(pollMsg)
            .then(async sent => {
                sent.react('👍');
                sent.react('👎');
            })
            .then(message.delete());
    }
    else {   // multiple choice poll
        message.channel.send(pollMsg)
            .then(async sent => {
                // affiche les emojis sous le poll
                for (let i = 0; i < pollArg.length - 1 && i < choiceEmojis.length; i++) {
                    await sent.react(choiceEmojis[i]);
                }
            })
            .then(message.delete());
    }
}


exports.usage = "!poll Question[;Answer...]";

exports.description = "Create a poll to get the opinion of people in your chan ; they can vote by reacting. Without any answer, it will be a Yes/No poll.";