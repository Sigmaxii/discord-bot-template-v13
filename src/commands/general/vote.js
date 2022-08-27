const { MessageButton, MessageActionRow } = require("discord.js");
const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js")
const config = require('../../config.json');
module.exports = {
    name: "vote",
    description: "Vote Sigma Bot in Top.gg!",
    category: "info",
    aliases: ["topgg", "votebot", "sigmavote", "botvote", "sigmabotvote", ],
    usage: "vote",
    execute: async (message, args, client, prefix) => {
        const button = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setLabel("TopGG")
                .setStyle("LINK")
                .setURL("https://top.gg/bot/737040516687986808/vote")
            );
        const overdose = new MessageEmbed()
            .setAuthor("Sigma Vote", "https://media.discordapp.net/attachments/773219541400420393/884687081820004362/image1.png")
            .setThumbnail("https://media.discordapp.net/attachments/773219541400420393/884686181877547018/882751053110583317.png")
            .setDescription("**__[Vote Sigma Bot in Top.GG .](https://top.gg/bot/737040516687986808/vote)__**")
            .setColor(config.main)
        message.reply({
            embeds: [overdose],
            components: [button]
        });
    }
};