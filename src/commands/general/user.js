const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "userinfo",
    category: "utility",
    aliases: ['user', 'userinf'],
    description: "Gives you or the mentioned user the information about you/him.",
    usage: "userinfo <user>",
    execute: async (message, args, client, prefix) => {
      
      let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        

        const embed = new MessageEmbed()
            .setTitle(`${user.user.username} stats`)
            .setColor(`#00ffff`)
            .setThumbnail(user.user.displayAvatarURL({dynamic : true}))
            .addFields(
                {
                    name: "Name: ",
                    value: user.user.username,
                    inline: true
                },
                {
                    name: "#️⃣ Discriminator: ",
                    value: `#${user.user.discriminator}`,
                    inline: true
                },
                {
                    name: "🆔 ID: ",
                    value: user.user.id,
                    inline: true
                },
                {
                    name: 'Avatar link: ',
                    value: `[Click Here](${user.user.displayAvatarURL()})`,
                    inline: true
                },
                {
                    name: 'Creation Date: ',
                    value: user.user.createdAt.toLocaleDateString("en-us"),
                    inline: true
                },
                {
                    name: 'Joined Date: ',
                    value: user.joinedAt.toLocaleDateString("en-us"),
                    inline: true
                },
                {
                    name: 'User Roles: ',
                    value: user.roles.cache.map(role => role.toString()).join(" ,"),
                    inline: true
                }
            )

        await message.reply({embeds: [embed]})
    }
}