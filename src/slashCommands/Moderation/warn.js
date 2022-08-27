const { MessageEmbed, Permissions } = require("discord.js");
const { QuickDB } = require('quick.db');
const db = new QuickDB();const config = require("../../config.json");
const Logs = require('../../utils/modlogs.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
  data: new SlashCommandBuilder()
  .setName('warn')
  .setDescription('Give a warning')
  .addUserOption(option =>
    option
                .setName('user')
                .setDescription('Mention a user to warn.')
                .setRequired(true)
                )
  .addStringOption(option => option
                  .setName('reason')
                   .setDescription('Provide a reason.')
                  )
  
  ,
  run: async (client, interaction) => {
        if (!interaction.guild.me.permissions.has([Permissions.FLAGS.MANAGE_MESSAGES])) {
            return interaction.reply({
                content: "I don't have permission to do that!"
            });
        };

      if  (!interaction.member.permissions.has("MANAGE_MESSAGES"))
      return interaction.reply({
        embeds:[
        new MessageEmbed()
          .setColor("#cc0000")
          .setTitle("***You don't have the permission to do that!***")
      ]});

        const user = interaction.options.getMember('user');

        if (!user) {
            return interaction.reply({
                embeds: [
                    new MessageEmbed()
                    .setAuthor(interaction.guild.name, interaction.guild.iconURL())
                    .setDescription(`***I can't find this user***`)
                    .setColor(config.main)
                ]
            });
        }

        

        if (interaction.user.id === user.id) {
            return interaction.reply({
                embeds: [
                    new MessageEmbed()
                    .setAuthor(interaction.guild.name, interaction.guild.iconURL())
                    .setDescription(`***Hey ${interaction.user.username} you can't warn yourself!***`)
                    .setColor(config.main)
                ]
            });
        }

        let reason = interaction.options.getString('reason');

        if (!reason) reason = 'No reason provided.';

        let warnings = db.get(`warnings.${interaction.guild.id}.${user.id}`);

        if (warnings === null) {
            db.set(`warnings.${interaction.guild.id}.${user.id}`, 1);
            user.send({
                embeds: [
                    new MessageEmbed()
                    .setAuthor(interaction.guild.name, interaction.guild.iconURL())
                    .setDescription(`Hey ${interaction.user.username}, You have been warned in **${interaction.guild.name}** for: \n \`${reason}\``)
                    .setColor(config.main)
                ]
            }).catch(() => interaction.reply({ content: "User wasnt informed, since his DMs are closed!", ephemeral: true }));
            await interaction.reply({
                embeds: [
                    new MessageEmbed()
                    .setAuthor(interaction.guild.name, interaction.guild.iconURL())
                    .setDescription(`***Warned ${interaction.mentions.users.first().username} for: \n \`${reason}\`***`)
                    .setFooter(`Warned by ${interaction.user.username}`, interaction.user.displayAvatarURL())
                    .setColor(config.main)
                ]
            });
          

        } else if (warnings !== null) {

            db.add(`warnings.${interaction.guild.id}.${user.id}`, 1);

            user.send({
                embeds: [
                    new MessageEmbed()
                    .setAuthor({ name: `${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()}`})
                    .setDescription(`Hey ${interaction.user.username}, You have been warned in **${interaction.guild.name}** for ${reason}`)
                    .setColor(config.main)
                ]
            }).catch(() => interaction.reply({ content: "User wasnt informed, since his DMs are closed!", ephemeral: true }));
            await interaction.reply({
                embeds: [
                    new MessageEmbed()
                    .setAuthor({ name: `${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()}`})
                    .setDescription(`***Warned ${user} for: \n \`${reason}\`***`)
                    .setFooter({ text: `Warned by ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}`})
                    .setColor(config.main)
                ]
            });

			return	Logs.modLog(interaction.guild, `<@${interaction.user.id}> warned ${user.id} | ${user.user.username}. \n Reason: ${reason}`);



        }
    }
};