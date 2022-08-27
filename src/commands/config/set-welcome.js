const { QuickDB } = require('quick.db');
const db = new QuickDB();
const { Permissions } = require("discord.js")
module.exports = {
    name: "setwelcome",
    category: "config",
    aliases: ['setw', 'wlc'],
    owner: false,
    description: "Sets A Channel Where The Bot Can Welcome New Members!",
    usage: "wlc [channel mention | channel ID | channel name]",
   args: true,
  permission: ["MANAGE_CHANNELS"],
  execute: async (message, args, client, prefix) => {
        if (!message.guild.me.permissions.has([Permissions.FLAGS.MANAGE_CHANNELS]))
            return message.reply({ content: "**I Do Not Have The Required Permissions! - [MANAGE_CHANNELS]**" })
      if  (!message.member.permissions.has("MANAGE_CHANNELS"))
      return message.reply({
        content :"***You don't have the permission to do that!***"
      });

        if (!args[0]) {
            let b = await db.get(`welcome_${message.guild.id}`);
            let channelName = message.guild.channels.cache.get(b);
            if (message.guild.channels.cache.has(b)) {
                return message.reply({
                    content: `**Welcome Channel Set In This Server Is \`${channelName.name}\`!**`
                });
            } else
                return message.reply({
                    content: "**Please Enter A Channel Name or ID To Set!**"
                });
        }
        let channel = message.mentions.channels.first() || client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name.toLowerCase() === args.join(' ').toLocaleLowerCase());

        if (!channel || channel.type === 'voice') return message.reply({
            content: "**Please Enter A Valid Text Channel!**"
        });

        try {
            let a = await db.get(`welcome_${message.guild.id}`)

            if (channel.id === a) {
                return message.reply({ content: "**This Channel is Already Set As welcome Channel!**" })
            } else {
                client.guilds.cache.get(message.guild.id).channels.cache.get(channel.id).send({ content: "**welcome channel has been set!**" })
                db.set(`welcome_${message.guild.id}`, channel.id)

                message.reply({ content: `**welcome Channel Has Been Set Successfully in <#${channel.id}>!**` })
            }
        } catch (e) {
            return console.log({ content: "**Error - `Missing Permissions Or Channel Is Not A Text Channel!`** " });
        }
    }
};