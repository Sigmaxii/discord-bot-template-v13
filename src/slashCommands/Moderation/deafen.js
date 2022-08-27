const { Client, CommandInteraction, MessageEmbed, Permissions } = require("discord.js");

const Logs = require('../../utils/modlogs.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('deafen')
    .setDescription('deafen a user from a VC')
      .addUserOption(option =>
        option
       .setName('user')
                     .setDescription('Mention a user')
                     .setRequired(true)
    )
  .addStringOption(option =>
        option
       .setName('reason')
                     .setDescription('Provide a reason')
                     .setRequired(false)
    ),

  run: async (client, interaction) => {
var member = interaction.options.getMember('user');
    let reason = interaction.options.getString('reason');

    if (!interaction.guild.me.permissions.has([Permissions.FLAGS.DEAFEN_MEMBERS])) {
            return interaction.reply({ content: `I am unable to kick members`, ephemeral: true })
        }

      if  (!interaction.member.permissions.has("DEAFEN_MEMBERS"))
      return interaction.reply({
        embeds:[
        new MessageEmbed()
          .setColor("#cc0000")
          .setTitle("***You don't have the permission to do that!***")
      ],
        ephemeral: true
      
      });



		if (!member.voice.channel) {
			return interaction.reply({ content: ":x: Member is not in a voice channel", ephemeral: true });
		}
		if (!reason) reason = "No reason was provided.";

		let embed = new MessageEmbed()
			.setTitle(`***${member} has been deafened succesfully!***\nReason: \`${reason}\``)
			.setColor(client.embedColor);

		await member.voice.setDeaf(true);

		return interaction.reply({ embeds: [embed], ephemeral: true });

} }