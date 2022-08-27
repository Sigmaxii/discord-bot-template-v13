const { QuickDB } = require('quick.db');
const db = new QuickDB();const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const Logs = require('../../utils/modlogs.js');

module.exports = {
    name: "warnings",
    description: "Get the warnings of yours or mentioned person",
    aliases: ["warns"],
    category: "moderation",
    usage: "warns <user>",
   args: true,
  permission: ["@everyone"],
  execute: async (message, args, client, prefix) => {
        const user = message.mentions.members.first() || message.author;

        let warnings = await db.get(`warnings.${message.guild.id}.${user.id}`);

        if (warnings === null) warnings = 0;


        const warn = new MessageEmbed()

        .setDescription(`${user} have **${warnings}** warning(s)`)
            .setTimestamp()
            .setColor(config.main);
        message.reply({ embeds: [warn] });
    }
};