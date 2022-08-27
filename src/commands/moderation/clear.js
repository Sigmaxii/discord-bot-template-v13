const { MessageEmbed, Permissions } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();const config = require("../../config.json");
const Logs = require('../../utils/modlogs.js');

module.exports = {
    name: "clear",
    aliases: ['purge', 'c'],
    category: "moderation",
    description: 'Delete from 1 to 100 messages.',
    usage: "c <0-100>",
   args: true,
  permission: ["MANAGE_MESSAGES"],
  execute: async (message, args, client, prefix) => {
        if (!message.guild.me.permissions.has([Permissions.FLAGS.MANAGE_MESSAGES]))
            return message.reply({
                content: `I do not have correct permissions to do this action, ${message.author.username}` // returns this message to user with no perms
            });
if  (!message.member.permissions.has("MANAGE_MESSAGES"))
      return message.reply({
        embeds:[
        new MessageEmbed()
          .setColor("#cc0000")
          .setTitle("***You don't have the permission to do that!***")
      ]});
      
        if (!args[0]) {
            return message.reply({ content: `Please enter a amount 1 to 100` })
        }

        let deleteAmount;

        if (parseInt(args[0]) > 100) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }

        await message.channel.bulkDelete(deleteAmount, true);

        const embed = new MessageEmbed()
            .setTitle(`${message.author.username}`)
            .setThumbnail(message.author.displayAvatarURL())
            .setDescription(`successfully deleted ${deleteAmount}`)
            .setFooter(message.author.username, message.author.displayAvatarURL())
            .setColor('#00ffff')
        await message.channel.send({ embeds: [embed] })

			return	Logs.modLog(message.guild, `<@${message.author.id}> deleted ${deleteAmount} messages in <@${message.channel.id}>`);

    }
}