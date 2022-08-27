const { MessageEmbed, Permissions } = require("discord.js");
const { QuickDB } = require('quick.db');
const db = new QuickDB();const config = require("../../config.json");
const Logs = require('../../utils/modlogs.js');

module.exports = {
    name: "warn",
    category: "moderation",
    usage: "warn <@mention> <reason>",
    description: "Warn anyone who do not obey the rules",
   args: true,
  permission: ["MANAGE_MESSAGES"],
  execute: async (message, args, client, prefix) => {
        if (!message.guild.me.permissions.has([Permissions.FLAGS.MANAGE_MESSAGES])) {
            return message.reply({
                content: "I don't have permission to do that!"
            });
        };

      if  (!message.member.permissions.has("MANAGE_MESSAGES"))
      return message.reply({
        embeds:[
        new MessageEmbed()
          .setColor("#cc0000")
          .setTitle("***You don't have the permission to do that!***")
      ]});

        const user = message.mentions.members.first();

        if (!user) {
            return message.reply({
                embeds: [
                    new MessageEmbed()
                    .setAuthor(message.guild.name, message.guild.iconURL())
                    .setDescription(`***Hey ${message.author.username} try to use warn @user <reason>***`)
                    .setFooter(`You can also use the command ,help <cmd-name>! `, message.author.displayAvatarURL())
                    .setColor(config.main)
                ]
            });
        }

        if (message.mentions.users.first().bot) {
            return message.reply({
                embeds: [
                    new MessageEmbed()
                    .setAuthor(message.guild.name, message.guild.iconURL())
                    .setDescription(`***Hey ${message.author.username} you can't warn a bot!***`)
                    .setColor(config.main)
                ]
            });
        }

        if (message.author.id === user.id) {
            return message.reply({
                embeds: [
                    new MessageEmbed()
                    .setAuthor(message.guild.name, message.guild.iconURL())
                    .setDescription(`***Hey ${message.author.username} you can't warn yourself!***`)
                    .setColor(config.main)
                ]
            });
        }

        const reason = args.slice(1).join(" ");

        if (!reason) {
            return message.reply({
                embeds: [
                    new MessageEmbed()
                    .setAuthor(message.guild.name, message.guild.iconURL())
                    .setDescription(`***Hey ${message.author.username} try to use warn @user <reason>***`)
                    .setFooter(`You can also use the command help <cmd-name>! `, message.author.displayAvatarURL())
                    .setColor(config.main)
                ]
            });
        }

        let warnings = db.get(`warnings.${message.guild.id}.${user.id}`);

        if (warnings === null) {
            db.set(`warnings.${message.guild.id}.${user.id}`, 1);
            user.send({
                embeds: [
                    new MessageEmbed()
                    .setAuthor(message.guild.name, message.guild.iconURL())
                    .setDescription(`Hey ${message.author.username}, You have been warned in **${message.guild.name}** for: \n \`${reason}\``)
                    .setColor(config.main)
                ]
            }).catch(() => message.reply({ content: "User wasnt informed, since his DMs are closed!" }));
            await message.reply({
                embeds: [
                    new MessageEmbed()
                    .setAuthor(message.guild.name, message.guild.iconURL())
                    .setDescription(`***Warned ${message.mentions.users.first().username} for: \n \`${reason}\`***`)
                    .setFooter(`Warned by ${message.author.username}`, message.author.displayAvatarURL())
                    .setColor(config.main)
                ]
            });
          
			

        } else if (warnings !== null) {

            db.add(`warnings.${message.guild.id}.${user.id}`, 1);

            user.send({
                embeds: [
                    new MessageEmbed()
                    .setAuthor(message.guild.name, message.guild.iconURL())
                    .setDescription(`Hey ${message.author.username}, You have been warned in **${message.guild.name}** for ${reason}`)
                    .setColor(config.main)
                ]
            }).catch(() => message.reply({ content: "User wasnt informed, since his DMs are closed!" }));
            await message.reply({
                embeds: [
                    new MessageEmbed()
                    .setAuthor(message.guild.name, message.guild.iconURL())
                    .setDescription(`***Warned ${message.mentions.users.first().username} for: \n \`${reason}\`***`)
                    .setFooter(`Warned by ${message.author.username}`, message.author.displayAvatarURL())
                    .setColor(config.main)
                ]
            });

return	Logs.modLog(message.guild, `<@${message.author.id}> warned ${user.id} | ${user.tag}. \n Reason: ${reason}`);


        }
    }
};