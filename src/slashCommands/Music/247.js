const { MessageEmbed, CommandInteraction, Client } = require("discord.js")

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('247')
    .setDescription('Keep the bot in VC 24/7')
    ,

  run: async (client, interaction) => {
  await interaction.deferReply({
            ephemeral: true
        });
    if (!interaction.member.voice.channel) return interaction.editReply({ embeds: [new MessageEmbed().setColor(client.embedColor).setDescription("You are not connect in vc")] });
    if (interaction.guild.me.voice.channel && interaction.guild.me.voice.channelId !== interaction.member.voice.channelId) return interaction.editReply({ embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`You are not connected to <#${interaction.guild.me.voice.channelId}> to use this command.`)] });

    const player = interaction.client.manager.get(interaction.guildId);
    if (!player) {
      const embed = new MessageEmbed()
        .setDescription('there is nothing playing')
        .setColor(client.embedColor)
      return interaction.editReply({ embeds: [embed] });
    }
    const { channel } = interaction.member.voice

    if (player.twentyFourSeven) {
      player.twentyFourSeven = false;
      const embed = new MessageEmbed()
        .setDescription("24/7 mode is **disabled**")
        .setColor(client.embedColor)
      return interaction.editReply({ embeds: [embed] });
    } else {
      player.twentyFourSeven = true;
      const embed = new MessageEmbed()
        .setDescription("24/7 mode is **Enabled**")
        .setColor(client.embedColor)
      return interaction.editReply({ embeds: [embed] });

    }
  }
}
