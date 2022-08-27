const { MessageEmbed, Permissions } = require('discord.js')
const config = require('../../config.json');
const { QuickDB } = require('quick.db');
const Logs = require('../../utils/modlogs.js');

const db = new QuickDB();module.exports = {

    name: "vcmove",
    category: "moderation",
    aliases: ["vcm", 'move'],
    description: "moves a member in from one voice channel to another",
    usage: "vcmove <user> <channel>",
   args: true,
  permission: ["MOVE_MEMBERS"],
  execute: async (message, args, client, prefix) => {
        if (!message.guild.me.permissions.has([Permissions.FLAGS.MOVE_MEMBERS]) && !ownerID.includes(message.author.id))
            return message.reply({ content: "**You Dont Have The Permissions To Ban Users! - [MOVE_MEMBERS]**" });

if  (!message.member.permissions.has("MOVE_MEMBERS"))
      return message.reply({
        embeds:[
        new MessageEmbed()
          .setColor("#cc0000")
          .setTitle("***You don't have the permission to do that!***")
      ]});

      
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase());

        if (!member) return message.reply({ content: "Unable to find the mentioned user in this guild." })

        let channel = message.mentions.channels.first() || bot.guilds.cache.get(message.guild.id).channels.cache.get(args[1]) || message.guild.channels.cache.find(c => c.name.toLowerCase() === args.slice(1).join(' ').toLocaleLowerCase());
        if (!channel.type === "voice")
            return message.reply({ content: "Unable to locate the voice channel. Make sure to mention a voice channel not a text channel!" })

        try {
            const embed = new MessageEmbed()
                .setDescription(`***Moved ${args[0]} to ${channel}***`)
                .setColor(config.main)
            member.voice.setChannel(channel);
            message.reply({ embeds: [embed] });
			return	Logs.modLog(message.guild, `<@${message.author.id}> moved ${args[0]} to ${channel}. \n Reason: ${reason}`);


        } catch (error) {
            console.log(error);
            message.reply({ content: "Oops! An unknown error occured. Please try again later." })
        }

    }
}