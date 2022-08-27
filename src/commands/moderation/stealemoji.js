const { Util, MessageEmbed, Permissions } = require("discord.js");
const { parse } = require("twemoji-parser");
const config = require("../../config.json");
const { QuickDB } = require('quick.db');
const Logs = require('../../utils/modlogs.js');

const db = new QuickDB();module.exports = {
        name: "stealemoji",
        aliases: ['addemoji', 'steal'],
        category: "moderation",
        usage: "steal <emoji> (emoji custom name)",
        description: "Steal an emoji from a different server",
   args: true,
  permission: ["MANAGE_EMOJIS_AND_STICKERS"],
  execute: async (message, args, client, prefix) => {

                if (!message.guild.me.permissions.has([Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS]))
                    return message.reply({ content: 'You don\'t have the permissions to manage emojis' })

          if  (!message.member.permissions.has("MANAGE_EMOJIS_AND_STICKERS"))
      return message.reply({
        embeds:[
        new MessageEmbed()
          .setColor("#cc0000")
          .setTitle("***You don't have the permission to do that!***")
      ]});

                const emoji = args[0];
                const name = args.slice(1).join(" ");
                if (!emoji) {
                    const embed = new MessageEmbed()
                        .setDescription(`Please Give Me A Emoji!`)
                        .setColor(config.main)
                    return message.reply({ embeds: [embed] })
                }

                try {
                    if (emoji.startsWith("https://cdn.discordapp.com")) {
                        await message.guild.emojis.create(emoji, name || "give_name");

                        const embed = new MessageEmbed()
                            .setTitle(`Emoji Added`)
                            .setThumbnail(`${emoji}`)
                            .setColor(config.main)
                            .setDescription(
                                `Emoji Has Been Added! | Name: ${
              name || "give_name"
            } `
                            );
                        return message.reply({ embeds: [embed] });
                    }

                    const customEmoji = Util.parseEmoji(emoji);

                    if (customEmoji.id) {
                        const link = `https://cdn.discordapp.com/emojis/${customEmoji.id}.${
          customEmoji.animated ? "gif" : "png"
        }`;

                        await message.guild.emojis.create(
                                `${link}`,
                                `${name || `${customEmoji.name}`}`
        );
       
        const embed = new MessageEmbed()
          .setTitle(`Emoji Added <a:${customEmoji.name}:${customEmoji.id}>`)
          .setColor(config.main)
          .setThumbnail(`${link}`)
          .setDescription(
            `Emoji Has Been Added! | Name: ${
              name || `${customEmoji.name}`
            } | Preview: [Click me](${link})`
          );
      await Logs.modLog(message.guild, `<@${message.author.id}> added <:${customEmoji.name}:${customEmoji.id}> emoji.`)    
                      
        return message.reply({ embeds: [embed]});
			
        
      } else {
        const foundEmoji = parse(emoji, { assetType: "png" });
        if (!foundEmoji[0]) {
           const embed = new MessageEmbed()
               .setDescription(`Please provide a valid emoji. I can't work with this `)
               .setColor('#cc0000')
          return message.reply({ embeds: [embed]});
        }
        const embed = new MessageEmbed()
               .setDescription(`This is a default emoji, you have it by default on discord.`)
               .setColor('YELLOW')
        message.reply({ embeds: [embed]})
          
        
      }
    } catch (e) {
      if (
        String(e).includes(
          "DiscordAPIError: Maximum number of emojis reached :/"
        )
      ) {
         const embed = new MessageEmbed()
               .setDescription(`Maximum emoji count reached for this Server!`)
               .setColor('#cc0000')
        
        return message.reply({ embeds: [embed]})
      }
    }
  },
};