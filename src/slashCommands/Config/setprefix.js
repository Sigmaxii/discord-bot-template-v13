const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const pre = require("../../schema/prefix.js");
const mongoose = require('mongoose')
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setprefix')
    .setDescription('Set prefix')
      .addUserOption(option =>
        option
       .setName('prefix')
                     .setDescription('Input a custom prefix for this guild')
                     .setRequired(true)
    ),

  run: async (client, interaction) => {
     const args = interaction.options.getString("prefix");

      if (!interaction.member.permissions.has('MANAGE_GUILD')) return await interaction.editReply({ ephemeral: true, embeds: [new MessageEmbed().setColor(client.embedColor).setDescription("You must have `Manage Guild` permission to use this command.")]
    }).catch(() => {});

  if (!args[0]) {
    const embed = new MessageEmbed()
        .setDescription("Please give the prefix that you want to set")
        .setColor(client.embedColor)
      return await interaction.editReply({ embeds: [embed] });
    }

    if (args[1]) {
       const embed = new MessageEmbed()
        .setDescription("You can not set prefix a double argument")
        .setColor(client.embedColor)
      return await interaction.editReply({ embeds: [embed] });
    }

    if (args[0].length > 3) {
       const embed = new MessageEmbed()
        .setDescription("You can not send prefix more than 3 characters")
        .setColor(client.embedColor)
      return await interaction.editReply({ embeds: [embed] });
    }

    const res = await pre.findOne({ guildid:interaction.guildId })
      let prefix = args();
      let p;
      if (!res) p = "!"
      else p = res.prefix;
      const noperms = new MessageEmbed()
        .setColor("#651FFF")
        .setDescription(`The prefix for this server is \`${p}\``)
      let newprefix = args();
      if (!args[0]) return interaction.editReply({embeds: [noperms]});
      else {
        pre.findOne({ guildid: interaction.guildId }).then(result => {
          let duck = new pre({
            _id: new mongoose.Types.ObjectId(),
            guildid: interaction.guildId,
            prefix: prefix
          })
          let send = new MessageEmbed()
            .setDescription(`Changed prefix to \`${newprefix}\``)
            .setTimestamp()
            .setColor("#651FFF")
         return interaction.editReply({embeds: [send]});
          if (!result || result == []) {
            duck.save().catch(console.error);
          } else {
            pre.deleteOne({ guildid: interaction.guildId }).catch(console.error)
            duck.save().catch(console.error)
          }
      })}
   }
}
