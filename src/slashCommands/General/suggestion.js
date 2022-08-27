const { MessageEmbed, Modal, TextInputComponent, MessageButton, MessageActionRow, } = require('discord.js')
const config = require('../../config.json');
const { SlashCommandBuilder } = require('@discordjs/builders')
module.exports = {
    data: new SlashCommandBuilder()
      .setName('suggestion')
      .setDescription('Send a suggestion to the bot developer.'),
     run: async (client, interaction) => {
       return interaction.reply({
            embeds: [new MessageEmbed()
                .setTitle('***Click the button to send the suggestion***')
                .setColor(config.main)
            ], components: [new MessageActionRow().addComponents(
    new MessageButton()
      .setCustomId('sug-button')
      .setStyle('PRIMARY')
      .setLabel('Send Suggestion'),
  )]
        });
    }
}