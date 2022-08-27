const { MessageButton, MessageActionRow } = require("discord.js");
const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js")
const config = require('../../config.json');
module.exports = {
    name: "invite",
    description: "invite Sigma Bot!",
    category: "info",
    aliases: ["inv" ],
    usage: "inv",
    execute: async (message, args, client, prefix) => {
        const button = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setLabel("Invite")
                .setStyle("LINK")
                .setURL("https://mod-bot.sigmaxii.com")
            );
        message.reply({
            content: 'Invite me.',
            components: [button]
        });
    }
};