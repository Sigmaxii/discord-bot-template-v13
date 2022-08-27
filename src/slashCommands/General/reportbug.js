const { MessageEmbed, Modal, TextInputComponent, MessageButton, MessageActionRow, } = require('discord.js')
const config = require('../../config.json');
const { SlashCommandBuilder } = require('@discordjs/builders')
module.exports = {
    data: new SlashCommandBuilder()
      .setName('reportbug')
      .setDescription('Report a bug that you believe that the bot has.'),
     run: async (client, interaction) => {
       return interaction.reply({
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