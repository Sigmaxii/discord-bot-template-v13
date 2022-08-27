const { Client, CommandInteraction, MessageEmbed, Permissions } = require("discord.js");
const Logs = require('../../utils/modlogs.js');

const { QuickDB } = require('quick.db');
const db = new QuickDB();
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('addrole')
    .setDescription('add a role to a user')
      .addUserOption(option =>
        option
       .setName('user')
                     .setDescription('Mention a user')
                     .setRequired(true)
    )
  .addRoleOption(option =>
        option
       .setName('role')
                     .setDescription('Mention a role')
                     .setRequired(true)
    ),

  run: async (client, interaction) => {
        if (!interaction.guild.me.permissions.has([Permissions.FLAGS.MANAGE_ROLES]))
            return interaction.reply({ content: `I do not have MANAGE_ROLES permission`, ephemeral: true });

if  (!interaction.member.permissions.has("MANAGE_ROLES"))
      return interaction.reply({
        embeds:[
        new MessageEmbed()
          .setColor("#cc0000")
          .setTitle("***You don't have the permission to do that!***")
      ],
      ephemeral: true 
      });
        try {

            const member = interaction.options.getMember('user');
            const roleName = interaction.options.getRole('role');
            const alreadyHasRole = member._roles.includes(roleName.id);

          const embed = new MessageEmbed()
                .setTitle(`Role Name: ${roleName.name}`)
                .setDescription(`<@${interaction.user.id}> has successfully added the role ${roleName} from ${member.user}`)
                .setColor('#00ffff')
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                .setFooter({text: `${new Date().toLocaleString()}`})

           if (alreadyHasRole) { interaction.reply({
                content: 'User already has that role',
              ephemeral: true
            });
}else{
 
await member.roles.add(roleName).then(() => interaction.reply({ embeds: [embed] }));
}
            
			return	Logs.modLog(interaction.guild, `<@${interaction.user.id}> gave <@${member.id}> the role ${roleName}`);



        } catch (e) {
            return interaction.reply({
                content: 'Try to give a role that exists next time...',
              ephemeral: true
            }).then(() => console.log(e))
        }





  }

}