const { QuickDB } = require('quick.db');
const db = new QuickDB();const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const {SlashCommandBuilder} = require("@discordjs/builders")
module.exports = {
    data: new SlashCommandBuilder()
      .setName('checkwarns')
  .setDescription('Check someone\'s warns')
  .addUserOption(option =>
    option
                .setName('user')
                .setDescription('Mention a user'))
  ,
  run: async(client, interaction) => {

    let user = interaction.options.getMember('user');
    if (!user) user = interaction.user;
    
        let warnings = await db.get(`warnings.${interaction.guild.id}.${user.id}`);

        if (warnings === null) warnings = 0;


        const warn = new MessageEmbed()

        .setDescription(`${user} have **${warnings}** warning(s)`)
            .setTimestamp()
            .setColor(config.main);
        interaction.reply({ embeds: [warn] });
    }
};