const { MessageEmbed, Permissions } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();const config = require("../../config.json");
const Logs = require('../../utils/modlogs.js');

module.exports = {
    name: "ban",
    category: "moderation",
    description: "Bans a member permamently from the Server.",
    usage: "ban <user> <reason>",
  args: true,
  permission: ["BAN_MEMBERS"],
  execute: async (message, args, client, prefix) => {
        if (!message.guild.me.permissions.has([Permissions.FLAGS.BAN_MEMBERS])) {
            return message.reply({
                embeds: [
                    new MessageEmbed()
                    .setTitle("***You don't have the permission to do that!***")
                    .setColor("#cc0000")
                ]
            });
        } 
      
      if  (!message.member.permissions.has("BAN_MEMBERS"))
      return message.reply({
        embeds:[
        new MessageEmbed()
          .setColor("#cc0000")
          .setTitle("***You don't have the permission to do that!***")
      ]});

        const user = message.mentions.members.first();
if (!args[0]) {
            return message.reply({
                embeds: [
                    new MessageEmbed()
                    .setTitle("***Please mention someone.***")
                    .setColor("YELLOW")
                ]
            })
        };
      if (message.author.id === user.id) {
            return message.reply({
                embeds: [
                    new MessageEmbed()
                    .setDescription(`***Hey ${message.author.username} you can't ban yourself!***`)
                    .setColor(config.main)
                ]
            });
        }
              
              
        
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        try {
          
            await member.ban();
            await message.reply({
                embeds: [
                    new MessageEmbed()
                    .setDescription(`***${member} has been banned permamently.***`)
                    .setColor("#00ffff")
                ]
            })
        let reason = message.content.split(" ").slice(2).join(" ")
          if (!reason) reason = 'No reason was provided';
			return	Logs.modLog(message.guild, `<@${message.author.id}> banned ${member.id} | ${member.tag}. \n Reason: ${reason}`);

          
        } catch (e) { console.log(e)  }

    }
}