const { Util, MessageEmbed, Permissions } = require("discord.js");
const { parse } = require("twemoji-parser");
const config = require("../../config.json");
const { QuickDB } = require('quick.db');
const db = new QuickDB();
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stealemoji')
    .setDescription('Steal an emoji from a different server (nitro users only) ')
    .addStringOption(option =>
      option
                    .setName('emoji')
                    .setDescription('Provide an emoji')
                    .setRequired(true)
                    )
    .addStringOption(option =>
      option
                    .setName('customname')
                    .setDescription('Give it a custom name')
                    ),
run: async (client, interaction) => {

                if (!interaction.guild.me.permissions.has([Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS]))
                    return interaction.reply({ content: 'You don\'t have the permissions to manage emojis' })

          if  (!interaction.member.permissions.has("MANAGE_EMOJIS_AND_STICKERS"))
      return interaction.reply({
        embeds:[
        new MessageEmbed()
          .setColor("#cc0000")
          .setTitle("***You don't have the permission to do that!***")
      ]});

                const emoji = interaction.options.getString('emoji');
                const name =  interaction.options.getString('customname');
                if (!emoji) {
                    const embed = new MessageEmbed()
                        .setDescription(`Please Give Me An Emoji!`)
                        .setColor(config.main)
                    return interaction.reply({ embeds: [embed], ephemeral: true })
                }

                try {
                    if (emoji.startsWith("https://cdn.discordapp.com")) {
                        await interaction.guild.emojis.create(emoji, name || "give_name");

                        const embed = new MessageEmbed()
                            .setTitle(`Emoji Added`)
                            .setThumbnail(`${emoji}`)
                            .setColor(config.main)
                            .setDescription(
                                `Emoji Has Been Added! | Name: ${
              name || "give_name"
            } `
                            );
                        return interaction.reply({ embeds: [embed] });
                    }

                    const customEmoji = Util.parseEmoji(emoji);

                    if (customEmoji.id) {
                        const link = `https://cdn.discordapp.com/emojis/${customEmoji.id}.${
          customEmoji.animated ? "gif" : "png"
        }`;

                        await interaction.guild.emojis.create(
                                `${link}`,
                                `${name || `${customEmoji.name}`}`
        );
       
        const embed = new MessageEmbed()
          .setTitle(`Emoji Added <:${customEmoji.name}:${customEmoji.id}>`)
          .setColor(config.main)
          .setThumbnail(`${link}`)
          .setDescription(
            `Emoji Has Been Added! | Name: ${
              name || `${customEmoji.name}`
            } | Preview: [Click me](${link})`
          );
          
        return interaction.reply({ embeds: [embed]});
        
      } else {
        const foundEmoji = parse(emoji, { assetType: "png" });
        if (!foundEmoji[0]) {
           const embed = new MessageEmbed()
               .setDescription(`Please provide a valid emoji. I can't work with this `)
               .setColor('#cc0000')
          return interaction.reply({ embeds: [embed]});
        }
        const embed = new MessageEmbed()
               .setDescription(`This is a default emoji, you have it by default on discord.`)
               .setColor('YELLOW')
        interaction.reply({ embeds: [embed]})
          
        
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
        
        return interaction.reply({ embeds: [embed]})
      }
    }
  },
};