const { MessageEmbed, Modal, TextInputComponent, MessageButton, MessageActionRow, } = require('discord.js')
const config = require('../../config.json');
module.exports = {
    name: 'reportbug',
    aliases: ['bug', 'sendbug'],
    description: 'Report a bug that you believe that the bot has.',
    category: "general",
    usage: 'bug <text>',
    execute: async (message, args, client, prefix) => {
       return message.reply({
            embeds: [new MessageEmbed()
                .setTitle('***Click the button to send the bug***')
                .setColor(config.main)
            ], components: [new MessageActionRow().addComponents(
    new MessageButton()
      .setCustomId('bug-button')
      .setStyle('PRIMARY')
      .setLabel('Send bug'),
  )]
        });
    }
}