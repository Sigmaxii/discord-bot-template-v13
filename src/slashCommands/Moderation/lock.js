const Discord = require('discord.js')

const Logs = require('../../utils/modlogs.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('lock')
    .setDescription('Lock this channel'),
  run: async (client, interaction) => {

    if  (!interaction.member.permissions.has("MANAGE_CHANNEL"))
      return interaction.reply({
        embeds:[
        new MessageEmbed()
          .setColor("#cc0000")
          .setTitle("***You don't have the permission to do that!***")
      ]});

    interaction.channel.permissionOverwrites.edit(interaction.guild.id, { SEND_MESSAGES: false });

    const embed = new Discord.MessageEmbed()
   .setTitle("Channel Is Locked!")
   .setDescription(`🔒 <#${interaction.channel.id}> has been Locked  🔒`)
     .setFooter({ text: `Locked by ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}`})
   .setColor("cc0000");
   await interaction.reply({
     embeds: [embed]
   });
    
			return	Logs.modLog(interaction.guild, `<@${interaction.user.id}> locked <#${interaction.channel.id}>`)
}
}