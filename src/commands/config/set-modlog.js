const { QuickDB } = require('quick.db');
const db = new QuickDB();
const { Permissions, MessageEmbed } = require("discord.js")
module.exports = {
    name: "setmodlogchannel",
    category: "config",
    aliases: ['setm', 'smc', 'setmodlog'],
    description: "Sets A Channel Where The Bot Can Send Moderation Logs!",
    usage: "smc [channel mention | channel ID | channel name]",
   args: true,
      owner: true,
  permission: ["MANAGE_CHANNELS"],
  execute: async (message, args, client, prefix) => {
        if (!message.guild.me.permissions.has([Permissions.FLAGS.MANAGE_CHANNELS]))
            return message.reply({ content: "**You Do Not Have The Required Permissions! - [MANAGE_CHANNELS]**" })

      if  (!message.member.permissions.has("MANAGE_CHANNELS"))
      return message.reply({
        embeds:[
        new MessageEmbed()
          .setColor("#cc0000")
          .setTitle("***You don't have the permission to do that!***")
      ]});
        if (!args[0]) {
            let b = await db.get(`modlog_${message.guild.id}`);
            let channelName = message.guild.channels.cache.get(b);
            if (message.guild.channels.cache.has(b)) {
                return message.reply({
                    embeds:[
        new MessageEmbed()
          .setColor(client.embedColor)
          .setTitle(`**Modlog Channel Set In This Server Is \`${channelName.name}\`!**`)
      ]
                });
            } else
                return message.reply({
                  embeds:[
        new MessageEmbed()
          .setColor('YELLOW')
          .setTitle("**Please Enter A Channel Name or ID To Set!**")
    ]
                });
        }
        let channel = message.mentions.channels.first() || client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name.toLowerCase() === args.join(' ').toLocaleLowerCase());

        if (!channel || channel.type === 'voice') return message.reply({
            embeds:[
        new MessageEmbed()
          .setColor('YELLOW')
          .setTitle("**Please a valid text channel!**")
    ]});

        try {
            let a = await db.get(`modlog_${message.guild.id}`)

            if (channel.id === a) {
                return message.reply({ embeds:[
        new MessageEmbed()
          .setColor(client.embedColor)
          .setTitle("**This channel is already set as mod log channel.**")
    ]})
            } else {
                client.guilds.cache.get(message.guild.id).channels.cache.get(channel.id).send({embeds:[
        new MessageEmbed()
          .setColor(client.embedColor)
          .setTitle("**Mod Log channel has been set succesfully**")
    ] })
                db.set(`modlog_${message.guild.id}`, channel.id)

                message.reply({ content: `${channel.name}`, embeds:[
        new MessageEmbed()
          .setColor(client.embedColor)
          .setTitle(`**Modlog Channel Has Been Set Successfully in \`${channel.name}\`!**`)
    ]  })
            }
        } catch (e) {
            return message.reply({ content: "**Error - `Missing Permissions Or Channel Is Not A Text Channel!`** " + e });
        }
    }
};