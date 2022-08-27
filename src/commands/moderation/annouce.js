const Discord = require('discord.js')
const { MessageEmbed, Permissions } = require('discord.js')

module.exports = {
    name: "announce",
    category: "moderation",
  aliases: ['ann'],
    description: "Convert your message into embed for a good looking announcement or even for rules section etc.",
    usage: "announce <text>",
   args: true,
  permission: ["MANAGE_CHANNELS"],
  execute: async (message, args, client, prefix) => {
        if (!message.guild.me.permissions.has([Permissions.FLAGS.MANAGE_CHANNELS]))
            return message.reply({
                content: `I dont have MANAGE_CHANNELS permission `
            })

if  (!message.member.permissions.has("MANAGE_CHANNELS"))
      return message.reply({
        embeds:[
        new MessageEmbed()
          .setColor("#cc0000")
          .setTitle("***You don't have the permission to do that!***")
      ]});

      
        await message.delete();
        let say = message.content.split(" ").slice(1).join(" ")
        if (!say) return message.reply({ content: "Please write something..." })
        let embed = new MessageEmbed()
            .setAuthor(message.author.username, message.author.avatarURL())
            .setDescription(`${say}`)
            .setColor("00ffff")
            .setFooter(` ${message.guild}`)
            .setTimestamp()
        message.channel.send({
            embeds: [embed]
        })
    
    }
}