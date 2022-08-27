const Discord = require('discord.js')
const { QuickDB } = require('quick.db');
const db = new QuickDB();
const Logs = require('../../utils/modlogs.js');


module.exports = {
   name: "unlock",
  args: false,
  category: "moderation",
    description: "Unlock the locked channel so the members can talk.",
    usage: "unlock",
 permission: ['MANAGE_CHANNELS'],
  execute: async (message, args, client, prefix) => {
   if  (!message.member.permissions.has("MANAGE_CHANNEL"))
      return message.reply({
        embeds:[
        new MessageEmbed()
          .setColor("#cc0000")
          .setTitle("***You don't have the permission to do that!***")
      ]});

    message.channel.permissionOverwrites.edit(message.guild.id, { SEND_MESSAGES: true });
   const embed = new Discord.MessageEmbed()
   .setTitle("Channel Is Unlocked")
   .setDescription(`🔓 ${message.channel}  has been Unlocked 🔓`)
     .setFooter(`🔓Unlocked by ${message.author.username}`,message.author.displayAvatarURL())
   .setColor(client.embedColor);
   await message.reply({embeds:[embed]});
    
			return	Logs.modLog(message.guild, `<@${message.author.id}> unlocked <#${message.channel.id}>`)
}
}