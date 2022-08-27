const { MessageEmbed, Permissions } = require('discord.js');
const config = require("../../config.json");
const { QuickDB } = require('quick.db');
const Logs = require('../../utils/modlogs.js');

const db = new QuickDB();module.exports = {
    name: 'unban',
    category: 'moderation',
    description: "Unban a banned member from the server by ID.",
    usage: "unban <userID> <reason>",
   args: true,
  permission: ["BAN_MEMBERS"],
  execute: async (message, args, client, prefix) => {

if  (!message.member.permissions.has("BAN_MEMBERS"))
      return message.reply({
        embeds:[
        new MessageEmbed()
          .setColor("#cc0000")
          .setTitle("***You don't have the permission to do that!***")
      ]});
      
      if (!message.guild.me.permissions.has([Permissions.FLAGS.BAN_MEMBERS]))
            return message.reply({ content: 'You are missing **BAN_MEMBERS** permission!' });

        if (!args[0]) return message.reply({ content: 'please enter a users id to unban!' });

        let member;
        try {
            member = await client.users.fetch(args[0])
        } catch (e) {
            console.log(e)
            return message.reply({ content: 'couldn\' find this user' });
        }

        const reason = args[1] ? args.slice(1).join(' ') : 'No reason was provided.';
        const embed = new MessageEmbed()
        message.guild.bans.fetch().then(bans => {
            const user = bans.find(ban => ban.user.id === member.id);
            if (user) {
                embed.setTitle(`Successfully Unbanned ${user.user.tag}`)
                    .setColor(config.main)
                    .addField('User ID', user.user.id, true)
                    .addField('user Tag', user.user.tag, true)
                    .addField('Banned Reason', user.reason != null ? user.reason : 'No reason was provided.')
                    .addField('Unbanned Reason', reason)
                message.guild.members.unban(user.user.id, reason).then(() => message.reply({ embeds: [embed] }))
            } else {
                embed.setTitle(`***User ${member.tag} isn't banned!***`)
                    .setColor(config.main)
                message.reply({ embeds: [embed] })
            }
 
          let reason = message.content.split(" ").slice(2).join(" ")
          if (!reason) reason = 'No reason was provided';
			return	Logs.modLog(message.guild, `<@${message.author.id}> unbanned ${args[0]}. \n Reason: ${reason}`);

        }).catch(e => {
            console.log(e)
            message.reply({ content: 'An error has occurred!' })
        });
    }
}