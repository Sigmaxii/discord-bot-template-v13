const { Client, CommandInteraction, MessageEmbed, Permissions } = require("discord.js");

const Logs = require('../../utils/modlogs.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('move')
    .setDescription('Delete a specific amount of messages')
      .addUserOption(option =>
        option
       .setName('user')
                     .setDescription('Mention a user')
                     .setRequired(true)
    )
  .addChannelOption(option =>
    option
                   .setName('channel')
                   .setDescription('Select a channel to move this user')
                   .setRequired(true))
  ,

  run: async (client, interaction) => {

    await interaction.deferReply({ ephemeral: true });
		const member = interaction.options.getMember("user");
		const channel = interaction.options.getChannel("channel");
    
       if  (!interaction.member.permissions.has("MOVE_MEMBERS"))
      return interaction.reply({
        embeds:[
        new MessageEmbed()
          .setColor("#cc0000")
          .setTitle("***You don't have the permission to do that!***")
      ]});


		if (!member.voice.channel) {
			return interaction.editReply({ content: ":x: Please provide a valid user or channel.", ephemeral: true });
		}
		if (channel === member.voice.channel) {
			return interaction.editReply({ content: `:x: ${member} is already in the <#${channel.id}>`, ephemeral: true });
		}
		if (!channel) {
			await member.voice.setChannel(interaction.member.voice.channel);
			return interaction.editReply({ content: `✅ ${member.user.username} moved to ${interaction.member.voice.channel.name}`, ephemeral: true });
		}
		if (channel.type != "GUILD_VOICE") {
			return interaction.editReply({ content: ":x: Please provide a voice channel.", ephemeral: true });

		}
		let embed = new MessageEmbed()
			.setDescription(`***<@${interaction.user.id}> moved <@${member.user.id}> to <#${channel.id}>***`)
			.setColor(client.embedColor);
		await member.voice.setChannel(channel);
		interaction.editReply({ embeds: [embed] });

		return	Logs.modLog(interaction.guild, ` <@${member.id}> was moved by <@${interaction.user.id}> to <#${channel.id}>`); 
		 
    
  }
}