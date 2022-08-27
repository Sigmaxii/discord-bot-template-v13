const Discord = require('discord.js');
const config = require("../../config.json");

module.exports = {
    name: 'avatar',
    aliases: ['av'],
    description: 'Fetches a user\'s avatar.',
    category: "general",
    usage: 'avatar <user>',
   args: true,
    execute: async (message, args, client, prefix) => {

        let avatar = message.mentions.users.size ? message.mentions.users.first().avatarURL({ format: 'png', dynamic: true, size: 2048 }) : message.author.avatarURL({ format: 'png', dynamic: true, size: 2048 });
        if (message.mentions.users.size > 0) {
            const embed = new Discord.MessageEmbed()
                .setColor(config.main)
                .setImage(`${avatar}`)
            message.reply({
                embeds: [embed]
            });
        }
    }
}