const { QuickDB } = require('quick.db');
const db = new QuickDB();
const config = require("../../config.json");
const { MessageEmbed, Permissions } = require("discord.js");
const Logs = require('../../utils/modlogs.js');

module.exports = {
    name: "resetwarns",
    aliases: ["rwarns", "rsetwarns", "resetwarnings", "clearwarnings", "clearwarns", 'cwarns'],
    category: "moderation",
    usage: "rwarns <@user> <reason>",
    description: "Reset warnings of mentioned person",
   args: true,
  permission: ["ADMINISTRATOR"],
  execute: async (message, args, client, prefix) => {


        if (!message.guild.me.permissions.has([Permissions.FLAGS.ADMINISTRATOR])) {
            return message.reply({
                embeds: [
                    new MessageEmbed()
                    .setDescription("***You should have admin perms to use this command***")
                    .setColor(config.main)
                ]
            });
        }

      if  (!message.member.permissions.has("ADMINISTRATOR"))
      return message.reply({
        embeds:[
        new MessageEmbed()
          .setColor("#cc0000")
          .setTitle("***You don't have the permission to do that!***")
      ]});

        const user = message.mentions.members.first();

        if (!user) {
            return message.reply(
                new MessageEmbed()
                .setDescription("***Please mention the person whose warning you want to reset***")
                .setColor("YELLOW")
            );
        }

        if (message.mentions.users.first().bot) {
            return message.reply(
                new MessageEmbed()
                .setDescription("***Bots does not have warnings***")
                .setColor("YELLOW")
            );
        }

        if (message.author.id === user.id) {
            return message.reply(
                new MessageEmbed()
                .setDescription("***You can't to reset your warnings***")
                .setColor("YELLOW")
            );
        }

        let warnings = db.get(`warnings.${message.guild.id}.${user.id}`);

        if (warnings === null) {
            return message.reply(`${message.mentions.users.first().username} do not have any warnings`);
        }

        db.delete(`warnings.${message.guild.id}.${user.id}`);
        user.send(
            `Your all warnings are reseted by ${message.author.username} from ${message.guild.name}`
        );
        await message.reply(
            new MessageEmbed()
            .setDescription(`All warnings of ${message.mentions.users.first().username} has been reseted!`)
            .setFooter(`Action by ${message.author.username}`, message.author.displayAvatarURL())
            .setColor(config.main)
        );

       let reason = message.content.split(" ").slice(2).join(" ")
          if (!reason) reason = 'No reason was provided';
			return	Logs.modLog(message.guild, `<@${message.author.id}> removed the warnings of <@${member.id}>. \n Reason: ${reason}`);

    }
};