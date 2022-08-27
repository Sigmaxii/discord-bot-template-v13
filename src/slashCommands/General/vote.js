const { MessageEmbed, CommandInteraction, Client, MessageButton, MessageActionRow } = require("discord.js")
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('vote')
    .setDescription('Give me a vote on Top.GG'),

  run: async (client, interaction) => {    
    const row = new MessageActionRow()
			.addComponents(
        new MessageButton()
    .setLabel("vote")
    .setStyle("LINK")
    .setURL(`https://top.gg/bot/${client.id}/vote`),
  //  new MessageButton()
 //   .setLabel("Support Developer")
 //   .setStyle("LINK")
    //.setURL("https://dev.sigmaxii.com/")
			);

          const vote = new MessageEmbed() .setColor(client.embedColor)
            .setDescription(`Got to top.gg profile and [vote](https://top.gg/bot/${client.id}/vote)!`)
           await interaction.reply({embeds: [vote], components: [row]})
    }
}