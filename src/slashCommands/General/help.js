const { MessageEmbed, MessageActionRow, MessageButton, CommandInteraction, Client } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders')
const prefix = require('../../config.js').prefix;
const config = require('../../config.json');
module.exports = {
    data: new SlashCommandBuilder()
      .setName('help')
      .setDescription('Get bot commands')
/**  .addStringOption(option =>
   * option
   *              .setName('category')
   *            .setDescription('Get  commands from a specific category')
   *            .addChoices(
   *             { name: 'Config', value: "config"},
   *            { name: 'General', value: 'info'},
   *           { name: 'Moderation', value: 'mod'},
   *          { name: 'Music', value: 'music'},))
    **/        

  ,
     run: async (client, interaction) => {
    
               await interaction.deferReply({
          ephemeral: false
        });
  const embed = new MessageEmbed()
    .setTitle(`${client.user.username} Help`)
     .setDescription(`>>> My prefix is: \`${prefix}\`\nUse the buttons, or \`${prefix}help [category]\`, to view commands base on their category!\n\n[\`Invite Me\`](${config.invite})  |  [\`Support Server\`](${config.support})`)
    .setThumbnail(client.user.displayAvatarURL())    
    .setColor(client.embedColor)
    .setTimestamp()
    
    let but1 = new MessageButton().setCustomId("home").setLabel("Home").setStyle("PRIMARY").setEmoji('🏡');

    let but5 = new MessageButton().setCustomId("mod").setLabel("Moderation").setStyle("PRIMARY").setEmoji('🔨');

    let but2 = new MessageButton().setCustomId("music").setLabel("Music").setStyle("PRIMARY").setEmoji('🎵');
  
    let but3 = new MessageButton().setCustomId("info").setLabel("General").setStyle("PRIMARY").setEmoji('📜');

    let but4 = new MessageButton().setCustomId("config").setLabel("Config").setStyle("PRIMARY").setEmoji('👨‍💻');

     let _commands;
     let editEmbed = new MessageEmbed();
     
     await interaction.editReply({ embeds: [embed], components: [new MessageActionRow().addComponents(but1,but5, but2, but3, but4)] });

    const collector = interaction.channel.createMessageComponentCollector({
      filter: (b) => {
      if(b.user.id === interaction.member.user.id) return true;
       else {
     b.reply({ ephemeral: true, content: `Only **${interaction.member.user.tag}** can use this button, if you want then you've to run the command again.`}); return false;
           };
      },
      time : 60000,
      idle: 60000/2
    });
    collector.on("end", async () => {
        await interaction.editReply({ components: [new MessageActionRow().addComponents(but1.setDisabled(true), but2.setDisabled(true), but3.setDisabled(true), but4.setDisabled(true))] }).catch(() => {});
     });
    collector.on('collect', async (b) => {
        if(b.customId === "home") {
           return await interaction.editReply({ embeds: [embed], components: [new MessageActionRow().addComponents(but1,but5, but2, but3, but4)] })
        }
        if(b.customId === "music") {
         _commands = client.commands.filter((x) => x.category && x.category === "Music").map((x) => `\`${x.name}\``);
             editEmbed.setColor(client.embedColor).setDescription(_commands.join(" | ")).setTitle("Music Commands");
 
           return await interaction.editReply({ embeds: [editEmbed], components: [new MessageActionRow().addComponents(but1,but5, but2, but3, but4)] })
        }
         if(b.customId == "info") {
      
             editEmbed.setColor(client.embedColor).setDescription(" `avatar` | `botinfo` | `help` | `invite` | `ping` | `reportbug` | `suggestion` | `support` | `vote`").setTitle("General Commands")
          return await interaction.editReply({ embeds: [editEmbed], components: [new MessageActionRow().addComponents(but1,but5, but2, but3, but4)] })
         }
         if(b.customId == "config") {
         
             editEmbed.setColor(client.embedColor).setDescription('`setprefix`').setTitle("Config Commands")
          return await interaction.editReply({ embeds: [editEmbed], components: [new MessageActionRow().addComponents(but1,but5, but2, but3, but4)] })
         
        }
      if(b.customId == "mod") {
       
             editEmbed.setColor(client.embedColor).setDescription('`addrole` | `ban` | `checkwarns` | `deafen` | `kick` | `lock` | `lock` | `move` | `purge` | `removerole` | `removewarn` | `setnick` | `stealemoji` | `undeafen` | `warn`').setTitle("Moderation Commands")
          return await interaction.editReply({ embeds: [editEmbed], components: [new MessageActionRow().addComponents(but1,but5, but2, but3, but4)] })
         
        }
     });
   }
 }
