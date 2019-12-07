exports.run = async (client, message, [command, ...args]) => {
    let key = args.join(' ');
    if (!command) {
        return message.reply(`You must select a command.`);
    }
    else if (key.length === 0) {
        return message.reply(`You must select a key.`);
    }
    else {
        let userId = message.author.id;

        let instance = client.db.ensure(`${key}`, {
            key: key,
            message: null,
            reactions: null,
            attachments: null,
            userId: userId
        });

        // What command do you want to do?
        switch (command) {
            case "save":
                message.channel.fetchPinnedMessages()
                    .then(messages => {
                        pinnedMessage = messages.array()[0];
                        userId = pinnedMessage.author.id;
                        content = pinnedMessage.content;
                        reactions = pinnedMessage.reactions;    // can't clone that yet(?)
                        attachments = [];
                        array = pinnedMessage.attachments.array();

                        for (i = 0; i < array.length; i++) {
                            attachments[i] = array[i].url;
                        }

                        if (instance.message === null) {
                            client.db.set(key, content, "message");
                            client.db.set(key, reactions, "reactions");
                            client.db.set(key, attachments, "attachments");
                            client.db.set(key, userId, "userId");
                            return message.reply(`The last pinned message has been saved with the key \`${key}\`.`);
                        }
                        else {
                            return message.reply(`This key is already used.`);
                        }
                    })
                    .catch(console.error);
                return;
            case "load":
                if (instance.message === null) {
                    return message.reply(`This key has no message linked.`);
                }
                else {
                    message.channel.send(instance.message, { files: instance.attachments })
                }
                return;
            case "delete":
                // Limited to guild owner
                if (message.author.id !== message.guild.ownerID)
                    return message.reply("You're not the boss of me, you can't do that!");
                client.db.delete(`${key}`);
                return instance.message === null ? message.reply(`There is no message saved to \`${key}\`.`) : message.reply(`The message saved to \`${key}\` has been deleted.`);
            default:
                return;
        }
    }
}


exports.usage = "!db {save | load | delete} key";

exports.description = "Save the last pinned message, load or delete a message with a key into a db in the bot.";