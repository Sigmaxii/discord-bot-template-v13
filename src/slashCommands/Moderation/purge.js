const { Client, CommandInteraction, MessageEmbed, Permissions } = require("discord.js");

const Logs = require('../../utils/modlogs.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('purge')
    .setDescription('Delete a specific amount of messages')
      .addNumberOption(option =>
        option
       .setName('amount')
                     .setDescription('Specify an amount of messages from 1 to 100')
                     .setRequired(true)
    ),

  run: async (client, interaction) => {
  if (!interaction.guild.me.permissions.has([Permissions.FLAGS.MANAGE_MESSAGES]))
            return interaction.reply({
                content: `I do not have correct permissions to do this action, ${interaction.user.username}` // returns this interaction to user with no perms
            });
if  (!interaction.member.permissions.has("MANAGE_MESSAGES"))
      return interaction.reply({
        embeds:[
        new MessageEmbed()
          .setColor("#cc0000")
          .setTitle("***You don't have the permission to do that!***")
      ]});
      
        
const amount = interaction.options.getNumber('amount');
        let deleteAmount;

        if (parseInt(amount) > 100) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(amount);
        }

        await interaction.channel.bulkDelete(deleteAmount, true);

        const embed = new MessageEmbed()
            .setTitle(`${interaction.user.username}`)
            .setThumbnail(interaction.user.displayAvatarURL())
            .setDescription(`successfully deleted ${deleteAmount}`)
            .setFooter(interaction.user.username, interaction.user.displayAvatarURL())
            .setColor('#00ffff')
        await interaction.channel.send({ embeds: [embed], ephemeral: true })
   
  }
}