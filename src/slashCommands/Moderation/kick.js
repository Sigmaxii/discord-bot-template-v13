const { Client, CommandInteraction, MessageEmbed, Permissions } = require("discord.js");

const Logs = require('../../utils/modlogs.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('kick a user')
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
         if (!interaction.guild.me.permissions.has([Permissions.FLAGS.KICK_MEMBERS])) {
            return interaction.reply({ content: `I am unable to kick members`, ephemeral: true })
        }

      if  (!interaction.member.permissions.has("KICK_MEMBERS"))
      return interaction.reply({
        embeds:[
        new MessageEmbed()
          .setColor("#cc0000")
          .setTitle("***You don't have the permission to do that!***")
      ],
        ephemeral: true
      
      });

      
        
        const member = interaction.options.getMember('user');
let reason = interaction.options.getString('reason');
    if (!reason) {
      reason = 'No reason was provided'
    };

    
        try {
            await member.kick();
            const embed = new MessageEmbed()
                .setDescription(`***${member} has been kicked!***`)
                .setColor("#00ffff")
            await interaction.reply({ embeds: [embed] })
			return	Logs.modLog(interaction.guild, `<@${interaction.user.id}> kicked ${member.id} | ${member.user.username}. \n Reason: ${reason}`);
        } catch (e) {
            return interaction.reply({ content: `User isn't in this server!`, ephemeral: true })
        }


  }
}