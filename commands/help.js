exports.run = (client, message, [command]) => {
    let indexes = client.commands.indexes;
    let answer = "";
    let cmd = "";
    if (command) {
        cmd = client.commands.get(command);
        if (!cmd) return message.reply(`The command \`${command}\` does not exist.`);
        let name = command;
        let usage = cmd.usage;
        let description = cmd.description;
        answer += `${name} - ${usage} : ${description}\n`;
    }
    else {
        for (i = 0; i < indexes.length; i++) {
            cmd = client.commands.get(indexes[i]);
            let name = indexes[i];
            let usage = cmd.usage;
            let description = cmd.description;
            answer += `${name} - ${usage} : ${description}\n`;
        }
    }
    message.channel.send(answer);
}


exports.usage = "!help [command]";

exports.description = "Show a list of all the commands or show a specific command with it's usage and description.";