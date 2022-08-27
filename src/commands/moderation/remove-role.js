const { MessageEmbed, Permissions } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();const config = require("../../config.json");
const Logs = require('../../utils/modlogs.js');
module.exports = {
    name: 'addrole',
    aliases: ['giverole', 'role'],
    category: "moderation",
    description: 'Add a role to a member',
    usage: "addrole <member> <role>",
   args: true,
    permission: ['MANAGE_ROLES'],
  execute: async (message, args, client, prefix) => {

        if (!message.guild.me.permissions.has([Permissions.FLAGS.MANAGE_ROLES]))
            return message.reply({ content: `You do not have MANAGE_ROLES permission` });

if  (!message.member.permissions.has("MANAGE_ROLES"))
      return message.reply({
        embeds:[
        new MessageEmbed()
          .setColor("#cc0000")
          .setTitle("***You don't have the permission to do that!***")
      ]});

      
        if (!args[0] || !args[1]) return message.reply({
            content: "Incorrect usage, It's `<username || user id> <role name || id>"
        })

        try {

            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            const roleName = message.guild.roles.cache.find(r => (r.name === args[1].toString()) || (r.id === args[1].toString().replace(/[^\w\s]/gi, '')));

            const embed = new MessageEmbed()
                .setTitle(`Role Name: ${roleName.name}`)
                .setDescription(`${message.author} has successfully removed the role ${roleName} from ${member.user}`)
                .setColor('#00ffff')
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                .setFooter({text: `${new Date().toLocaleString()}`})

await member.roles.remove(roleName).then(() => message.reply({ embeds: [embed] }));

			return	Logs.modLog(message.guild, `<@${message.author.id}> removed from <@${member.id}> the role ${roleName}`);

        	
        } catch (e) {
            return message.reply({
                content: 'Something went wrong, maybe the member doesn\'t have that role...'
            }).then(() => console.log(e))
        }





    }
}