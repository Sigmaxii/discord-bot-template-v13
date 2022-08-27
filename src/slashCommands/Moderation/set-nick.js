const { Client, CommandInteraction, MessageEmbed, Permissions } = require("discord.js");

const Logs = require('../../utils/modlogs.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setnick')
    .setDescription('Delete a specific amount of messages')
      .addUserOption(option =>
        option
       .setName('user')
                     .setDescription('Mention a user')
                     .setRequired(true)
    )
  .addStringOption(option =>
    option
                  .setName('nickname')
                  .setDescription('Give this user a nickname'))
  ,

  run: async (client, interaction) => {
  
   if  (!interaction.member.permissions.has("MANAGE_NICKNAMES"))
      return interaction.reply({
        embeds:[
        new MessageEmbed()
          .setColor("#cc0000")
          .setTitle("***You don't have the permission to do that!***")
      ], ephemeral: true
      });

        if (!interaction.guild.me.permissions.has([Permissions.FLAGS.CHANGE_NICKNAME]))
            return interaction.reply({ content: "**I Dont Have Permissions To Change Nickname! - [CHANGE_NICKNAME]**", ephemeral: true });


        let member = interaction.options.getMember('user');

        if (member.roles.highest.comparePositionTo(interaction.guild.me.roles.highest) >= 0) return interaction.reply({content:'**Cannot Set or Change Nickname Of This User!**', ephemeral: true})

        let nick = interaction.options.getString('nickname');

        try {
            member.setNickname(nick)
            const embed = new MessageEmbed()
                .setColor("#00ffff")
                .setDescription(`**Changed Nickname of ${member.displayName} to ${nick}**`)
            interaction.reply(embed)
        } catch {
            return interaction.reply({ content: "**Missing Permissions - [CHANGE_NICKNAME]", ephemeral: true })
        }


    return	Logs.modLog(interaction.guild, `<@${interaction.user.id}> changed ${member.displayName}'s nickname to ${nick}.`);


  }
}