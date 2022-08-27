const { MessageEmbed, CommandInteraction, Client, MessageButton, MessageActionRow } = require("discord.js")
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('invite')
    .setDescription('invite me'),

  run: async (client, interaction) => {
               
    const row = new MessageActionRow()
			.addComponents(
        new MessageButton()
    .setLabel("Invite")
    .setStyle("LINK")
    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=36768832&scope=applications.commands%20bot`),
    new MessageButton()
    .setLabel("Support")
    .setStyle("LINK")
    .setURL("https://discord.gg/KRMhhu2UWh")
			);

          const mainPage = new MessageEmbed()
            

             .setColor('#303236')
            .setDescription(`**[Click Here](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=36768832&scope=applications.commands%20bot) to invite the bot**`, true)
           await interaction.reply({content: '[Quick Links](https://mod-sigmaxii.com)', embeds: [mainPage], components: [row]})
    }
		}