const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const config = require('../../config.json');
module.exports = {
    name: "help",
    category: "Information",
    aliases: [ "h", "commands","cmds" ],
    description: "Return all commands, or one specific command",
    args: false,
    usage: "",
    permission: [],
    owner: false,
 execute: async (message, args, client, prefix) => {
   
let embed1 = new MessageEmbed()
   .setColor(client.embedColor)
   .setTitle(`${args[0]} commands`);
   if(args[0] == "info") {
    _commands = client.commands.filter((x) => x.category && x.category === "general").map((x) => `\`${x.name}\``);
     embed1.setDescription(_commands.join(' | '))
     embed1.setFooter(`Total ${_commands.length} ${args[0]} commands.`)
     message.reply({embeds: [embed1]})
   }
      else if(args[0] == "moderation" || args[0] == "mod") {
    _commands = client.commands.filter((x) => x.category && x.category === "moderation").map((x) => `\`${x.name}\``);
     embed1.setDescription(_commands.join(' | '))
        embed1.setFooter(`Total ${_commands.length} ${args[0]} commands.`)
     message.reply({embeds: [embed1]})
   }
        else if(args[0] == "config") {
    _commands = client.commands.filter((x) => x.category && x.category === "Config").map((x) => `\`${x.name}\``);
     embed1.setDescription(_commands.join(' | '))
          embed1.setFooter(`Total ${_commands.length} ${args[0]} commands.`)
     message.reply({embeds: [embed1]})
   }
  else if (!args[0]) {
  const embed = new MessageEmbed()
    .setTitle(`${client.user.username} Help`)
    .setDescription(`>>> My prefix is: \`${prefix}\`\nUse the buttons, or \`${prefix}help [category]\`, to view commands base on their category!\n\n[\`Invite Me\`](${config.invite})  |  [\`Support Server\`](${config.support})`)
    .setThumbnail(client.user.displayAvatarURL())
    .setColor(client.embedColor)
    .setTimestamp()
    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: 'png', dynamic: true }))
                
    let but1 = new MessageButton().setCustomId("home").setLabel("Home").setStyle("PRIMARY").setEmoji('🏡');

  /*  let but5 = new MessageButton().setCustomId("mod").setLabel("Moderation").setStyle("PRIMARY").setEmoji('🔨');
 
    let but3 = new MessageButton().setCustomId("info").setLabel("General").setStyle("PRIMARY").setEmoji('📜');
*/
    let but4 = new MessageButton().setCustomId("config").setLabel("Config").setStyle("PRIMARY").setEmoji('👨‍💻');



     let _commands;
     let editEmbed = new MessageEmbed();
     
    const m = await message.reply({ embeds: [embed], components: [new MessageActionRow().addComponents(but1, but5, but2, but3, but4)] });

    const collector = m.createMessageComponentCollector({
      filter: (b) => {
      if(b.user.id === message.author.id) return true;
       else {
     b.reply({ ephemeral: true, content: `Only **${message.author.tag}** can use this button, if you want then you've to run the command again.`}); return false;
           };
      },
      time : 100000,
      idle: 100000/2
    });
    collector.on("end", async () => {
		 if(!m) return;
        await m.edit({ components: [new MessageActionRow().addComponents(but1.setDisabled(true), but2.setDisabled(true), but5.setDisabled(true), but3.setDisabled(true), but4.setDisabled(true))] }).catch(() => {});
    });
    collector.on('collect', async (b) => {
        if(b.customId === "home") {
           if(!m) return;
           return await m.edit({ embeds: [embed], components: [new MessageActionRow().addComponents(but1, but5, but2, but3, but4)] })
        }
     /*   if(b.customId === "mod") {
         _commands = client.commands.filter((x) => x.category && x.category === "moderation").map((x) => `\`${x.name}\``);
             editEmbed.setColor(client.embedColor).setDescription(_commands.join(` | `)).setTitle("Moderation Commands").setFooter(`Total ${_commands.length} Moderation commands.`);
           if(!m) return;
           return await m.edit({ embeds: [editEmbed], components: [new MessageActionRow().addComponents(but1, but5, but2, but3, but4)] })
        }
         if(b.customId == "info") {
         _commands = client.commands.filter((x) => x.category && x.category === "general").map((x) => `\`${x.name}\``);
             editEmbed.setColor(client.embedColor).setDescription(_commands.join(` | `)).setTitle("General Commands").setFooter(`Total ${_commands.length} General commands.`)
                     return await m.edit({ embeds: [editEmbed], components: [new MessageActionRow().addComponents(but1, but5, but2, but3, but4)] })
         } */
         if(b.customId == "config") {
         _commands = client.commands.filter((x) => x.category && x.category === "config").map((x) => `\`${x.name}\``);
             editEmbed.setColor(client.embedColor).setDescription(_commands.join(` | `)).setTitle("Config Commands").setFooter(`Total ${_commands.length} Config commands.`)
                     return await m.edit({ embeds: [editEmbed], components: [new MessageActionRow().addComponents(but1, but5, but2, but3, but4)] })
         
        }
     }); return true;
   }
 }
}
