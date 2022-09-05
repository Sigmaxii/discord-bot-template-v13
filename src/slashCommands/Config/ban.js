const { Client, CommandInteraction, MessageEmbed, Permissions } = require("discord.js");
const Logs = require('../../utils/modlogs.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('ban a user from the guild')
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

  run: async (client, interaction) => {  const member = interaction.options.getMember('user');
    const reason = interaction.options.getString('reason');
    if (!reason) {
      reason = 'No reason was provided';
    };

     if (!interaction.guild.me.permissions.has([Permissions.FLAGS.BAN_MEMBERS])) {
            return interaction.reply({
                embeds: [
                    new MessageEmbed()
                    .setTitle("***You don't have the permission to do that!***")
                    .setColor("#cc0000")
                ]
            });
        } 
      
      if  (!interaction.member.permissions.has("BAN_MEMBERS"))
      return interaction.reply({
        embeds:[
        new MessageEmbed()
          .setColor("#cc0000")
          .setTitle("***You don't have the permission to do that!***")
      ]});

       
      if (interaction.user.id === member) {
            return interaction.reply({
                embeds: [
                    new MessageEmbed()
                    .setDescription(`***Hey ${interaction.author.username} you can't ban yourself!***`)
                    .setColor(client.embedColor)
                ]
            });
        }
                      try {
          
            await member.ban({reason: `${reason}`});
            await interaction.reply({
                embeds: [
                    new MessageEmbed()
                    .setDescription(`***${member} has been banned permamently.***`)
                    .setColor("#00ffff")
                ]
            })
      

          if (!reason) reason = 'No reason was provided';
			return	Logs.modLog(interaction.guild, `<@${interaction.user.id}> banned ${member.id} | ${member.user.username}. \n Reason: ${reason}`);

        } catch (e) {
            return interaction.reply({
                embeds: [
                    new MessageEmbed()
                    .setTitle("***I can't find this user or I cant ban this user.***")
                    .setColor("YELLOW")
                ]
            })
        }
    

  }
}
