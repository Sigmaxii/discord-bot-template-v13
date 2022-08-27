const { MessageEmbed, Permissions } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();const config = require("../../config.json");
const Logs = require('../../utils/modlogs.js');

module.exports = {
    name: "kick",
    category: "moderation",
    description: "Kick a member from the server",
    usage: 'kick <user> <reason>',
   args: true,
  permission: ["KICK_MEMBERS"],
  execute: async (message, args, client, prefix) => {
        if (!message.guild.me.permissions.has([Permissions.FLAGS.KICK_MEMBERS])) {
            return message.reply({ content: `I am unable to kick members` })
        }

      if  (!message.member.permissions.has("KICK_MEMBERS"))
      return message.reply({
        embeds:[
        new MessageEmbed()
          .setColor("#cc0000")
          .setTitle("***You don't have the permission to do that!***")
      ]});

      
        if (!args[0]) {
            return message.reply({ content: `Please mention a user!` })
        }
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        try {
            await member.kick();
            const embed = new MessageEmbed()
                .setDescription(`***${member} has been kicked!***`)
                .setColor("#00ffff")
            await message.reply({ embeds: [embed] })

          let reason = message.content.split(" ").slice(2).join(" ")
          if (!reason) reason = 'No reason was provided';
			return	Logs.modLog(message.guild, `<@${message.author.id}> kicked ${member.id} | ${member.tag}. \n Reason: ${reason}`);

        } catch (e) {
            return message.reply({ content: `User isn't in this server!` })
        }

    }
}