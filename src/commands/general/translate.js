const { Client, Message, MessageEmbed } = require("discord.js");
const translate = require('@iamtraction/google-translate');
const config = require("../../config.json");
module.exports = {
    name: "translate",
    aliases: ['tr'],
    category: "general",
    description: "Translate any language (only) in to **English.**",
    usage: "translate <text>",
    execute: async (message, args, client, prefix) => {
        const query = args.join(" ");
        if (!query) return message.reply("Please specify a text to translate");


        const translated = await translate(query, { to: 'auto' });
        message.channel.send({
            embeds: [
                new MessageEmbed()
                .setTitle("Translated")
                .setDescription(`${translated.text}`)
                .setColor(client.embedColor)
            ]
        })
    }
}