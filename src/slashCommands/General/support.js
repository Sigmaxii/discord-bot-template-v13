const { MessageEmbed, CommandInteraction, Client, MessageButton, MessageActionRow } = require("discord.js")
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('support')
    .setDescription('support server'),

  run: async (client, interaction) => {
           
    const row = new MessageActionRow()
			.addComponents(
        new MessageButton()
    .setLabel("Support Server")
    .setStyle("LINK")
    .setURL(`https://dsc.sigmaxii.com`),
    new MessageButton()
    .setLabel("Quick Links")
    .setStyle("LINK")
    .setURL("https://mod-bot.sigmaxii.com/")
			);

          const mainPage = new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`Got to my [Support Server](https://dsc.sigmaxii.com)!`, true)
           await interaction.reply({embeds: [mainPage], components: [row]})
    }
		}