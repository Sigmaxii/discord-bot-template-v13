const { MessageEmbed, Permissions } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();const config = require("../../config.json");
const Logs = require('../../utils/modlogs.js');


module.exports = {
    name: "setnick",
    aliases: ["sn", 'nick'],
    category: "moderation",
    description: "Sets Or Changes Nickname Of An User",
    usage: "sn [mention | name | nickname | ID] <nickname>",
   args: true,
  permission: ["MANAGE_NICKNAMES"],
  execute: async (message, args, client, prefix) => {
        if  (!message.member.permissions.has("MANAGE_NICKNAMES"))
      return message.reply({
        embeds:[
        new MessageEmbed()
          .setColor("#cc0000")
          .setTitle("***You don't have the permission to do that!***")
      ]});

        if (!message.guild.me.permissions.has([Permissions.FLAGS.CHANGE_NICKNAME]))
            return message.reply({ content: "**I Dont Have Permissions To Change Nickname! - [CHANGE_NICKNAME]**" });

        if (!args[0]) return message.reply({ content: "**Please Enter A User!**" })

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()) || message.member;
        if (!member) return message.reply({ content: "**Please Enter A Username!**" });

        if (member.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) return message.reply('**Cannot Set or Change Nickname Of This User!**')

        if (!args[1]) return message.reply({ content: "**Please Enter A Nickname**" });

        let nick = args.slice(1).join(' ');

        try {
            member.setNickname(nick)
            const embed = new MessageEmbed()
                .setColor("#00ffff")
                .setDescription(`**Changed Nickname of ${member.displayName} to ${nick}**`)
            message.reply(embed)
        } catch {
            return message.reply({ content: "**Missing Permissions - [CHANGE_NICKNAME]" })
        }

    
    return	Logs.modLog(message.guild, `<@${message.author.id}> changed ${member.displayName}'s nickname to ${nick}.`);

    }
}