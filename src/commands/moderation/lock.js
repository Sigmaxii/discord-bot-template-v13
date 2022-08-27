const Discord = require('discord.js')
const { QuickDB } = require('quick.db');
const db = new QuickDB();
const Logs = require('../../utils/modlogs.js');

module.exports = {
   name: "lock",
   args: false,
 category: "moderation",
    description: "Lock the channel so no one has the right to text messages except for Admins.",
    usage: "lock",
  permission: ['MANAGE_CHANNELS'],
  execute: async (message, args, client, prefix) => {
   if  (!message.member.permissions.has("MANAGE_CHANNEL"))
      return message.reply({
        embeds:[
        new MessageEmbed()
          .setColor("#cc0000")
          .setTitle("***You don't have the permission to do that!***")
      ]});

    message.channel.permissionOverwrites.edit(message.guild.id, { SEND_MESSAGES: false });

    const embed = new Discord.MessageEmbed()
   .setTitle("Channel Is Locked!")
   .setDescription(`🔒 ${message.channel} has been Locked 🔒`)
     .setFooter(`Locked by ${message.author.username}`,message.author.displayAvatarURL())
   .setColor("cc0000");
   await message.reply({
     embeds: [embed]
   });

			return	Logs.modLog(message.guild, `<@${message.author.id}> locked <#${message.channel.id}>`);

}
}