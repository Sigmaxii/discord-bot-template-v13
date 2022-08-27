const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Show avatar')
      .addUserOption(option =>
        option
       .setName('user')
                     .setDescription('Mention a user')
                     .setRequired(false)
    ),

  run: async (client, interaction) => {
    const user = interaction.options.getUser("user");
 let member;
 if(user) member = interaction.guild.members.cache.get(user.id);
 else member = interaction.member;

  let avs = new MessageEmbed()
      .setAuthor(
        `Avatar from: ${member.user.tag}`,
        member.user.displayAvatarURL({ dynamic: true }))     
      .setColor(client.embedColor)
      .setURL(
        member.user.displayAvatarURL({
          dynamic: true,
          size: 2048, format: 'png' }))
      .setImage(
        member.user.displayAvatarURL({
          dynamic: true,
          size: 2048, format: 'png' }));

      interaction.reply({embeds : [avs]})
  },
};
