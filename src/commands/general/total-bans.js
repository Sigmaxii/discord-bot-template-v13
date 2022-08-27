const { MessageEmbed } = require('discord.js');
const config = require("../../config.json");
module.exports = {
    name: "bans",
    category: "general",
    aliases: ['totalbans'],
    description: "Shows you Total amount of bans in your server.",
    usage: "bans",
    execute: async (message, args, client, prefix) => {

        message.guild.bans.fetch().then(bans => {
            message.reply({
                embeds: [
                    new MessageEmbed()
                    .setTitle(`***Total bans of this server are :***   \`${bans.size}\``)
                    .setColor(config.main)
                ]
            })
        })

    }
}