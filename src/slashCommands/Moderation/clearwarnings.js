const { QuickDB } = require('quick.db');
const db = new QuickDB();
const config = require("../../config.json");
const { MessageEmbed, Permissions } = require("discord.js");
const Logs = require('../../utils/modlogs.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clearwarnings')
  .setDescription('Clear all warnings of a user')
  .addUserOption(option =>
    option
                .setName('user')
                .setDescription('Mention a user')
                 .setRequired(true)
                )

    ,
    run: async (client, interaction) => {


        if (!interaction.guild.me.permissions.has([Permissions.FLAGS.MANAGE_GUILD])) {
            return interaction.reply({
                embeds: [
                    new MessageEmbed()
                    .setDescription("***You should have admin perms to use this command***")
                    .setColor(config.main)
                ]
            });
        }

      if  (!interaction.member.permissions.has("MANAGE_GUILD"))
      return interaction.reply({
        embeds:[
        new MessageEmbed()
          .setColor("#cc0000")
          .setTitle("***You don't have the permission to do that!***")
      ]});

        const user = interaction.options.getMember('user');

        if (!user) {
            return interaction.reply({embeds: [
                new MessageEmbed()
                .setDescription("***Please mention the person whose warning you want to reset***")
                .setColor("YELLOW")]}
            );
        }

        

        if (interaction.user.id === user.id) {
            return interaction.reply({embeds:[
                new MessageEmbed()
                .setDescription("***You can't to reset your warnings***")
                .setColor("YELLOW")]}
            );
        }

        let warnings = db.get(`warnings.${interaction.guild.id}.${user.id}`);

        if (warnings === null) {
            return interaction.reply(`${user} do not have any warnings`);
        }

        db.delete(`warnings.${interaction.guild.id}.${user.id}`);
        user.send(
          {content: `Your warnings are cleared up by ${interaction.user.username} from ${interaction.guild.name}`
        });
        await interaction.reply({embeds: [
            new MessageEmbed()
            .setDescription(`All warnings of ${user} has been reseted!`)
            .setFooter(`Action by ${interaction.user.username}`, interaction.user.displayAvatarURL())
            .setColor(config.main)]}
        );

			return	Logs.modLog(interaction.guild, `<@${interaction.user.id}> cleared ${user.id} | ${user.user.username} warnings.`);

    }
};