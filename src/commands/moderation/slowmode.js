const { MessageEmbed, Permissions } = require('discord.js');
const ms = require('ms');
const config = require('../../config.json');
const { QuickDB } = require('quick.db');
const db = new QuickDB();
const Logs = require('../../utils/modlogs.js');

module.exports = {
    name: 'slowmode',
    aliases: ["sm", "slow", "smode"],
    category: 'moderation',
    description: "Turn on slowmode for 1s to 6h by your choice",
    usage: "sm <s-m-h> <reason> || slowmode off",
   args: true,
  permission: ["MANAGE_CHANNELS"],
  execute: async (message, args, client, prefix) => {


        if (!message.guild.me.permissions.has([Permissions.FLAGS.MANAGE_CHANNELS]))
            return message.reply({ content: 'You do not have **MANAGE_CHANNELS** permission!' });

      if  (!message.member.permissions.has("MANAGE_CHANNELS"))
      return message.reply({
        embeds:[
        new MessageEmbed()
          .setColor("#cc0000")
          .setTitle("***You don't have the permission to do that!***")
      ]});

      
        if (!args[0]) return message.reply({ content: 'You did not specify a time!' });

        const currentCooldown = message.channel.rateLimitPerUser;

        const reason = args[1] ? args.slice(1).join(' ') : 'No reason was provided.';

        const embed = new MessageEmbed()
            .setFooter(`${message.author.tag} | ${message.author.id}`, message.author.displayAvatarURL({ dynamic: true }));

        if (args[0] === 'off') {

            if (currentCooldown === 0) return message.reply({ content: 'Channel cooldown is already off' });
            const offEmbed = new MessageEmbed()
                .setTitle('Slowmode Disabled')
                .setColor(config.main)
            return message.channel.setRateLimitPerUser(0, reason).then(message.reply({ embeds: [offEmbed] }));

        }

        const time = ms(args[0]) / 1000;

        if (isNaN(time)) return message.reply({ content: 'Not a valid time, please try again!' });

        if (time >= 21600) return message.reply({ content: 'That slowmode limit is too high, please enter anything lower than 6 hours.' });

        if (currentCooldown === time) return message.reply({ content: `Slowmode is already set to ${args[0]}` });

        embed.setTitle('Slowmode Enabled')
            .addField('Slowmode: ', args[0])
            .addField('Reason: ', reason)
            .setColor(config.main);

        message.channel.setRateLimitPerUser(time, reason).then(message.reply({ embeds: [embed] }));


    }
}