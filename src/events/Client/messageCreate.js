const { MessageEmbed, Permissions } = require("discord.js");
const pre= require("../../schema/prefix.js");
module.exports = async (client, message) => {
   
   if (message.author.bot) return;
   if (!message.guild) return;
    let prefix = client.prefix;
    const channel = message?.channel;
    const ress =  await pre.findOne({guildid: message.guild.id})
   if(ress && ress.prefix)prefix = ress.prefix;
  
   if (message.content.match(`kosovo is serbia`)){
    const alemb = new MessageEmbed()
    .setColor('#ff0000')
    .setImage("https://i1.prth.gr/images/963x541/files/2017/11/22/albania-kosovo.jpg")
    .setTitle('UÇK')
    .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/UCK_KLA_NEW.png/640px-UCK_KLA_NEW.png');
    message.reply({content: 'IN YOUR DREAM ONLY, SERBITCH :flag_al: :flag_xk:!!!', embeds: [alemb]})
  };
    const mention = new RegExp(`^<@!?${client.user.id}>( |)$`);
    if (message.content.match(mention)) {
      const embed = new MessageEmbed()
        .setColor(client.embedColor)
        .setDescription(`**› My prefix in this server is \`${prefix}\`**\n**› You can see my commands by doing  \`${prefix}\`help**`);
      message.reply({embeds: [embed]})
    };
   const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
    if (!prefixRegex.test(message.content)) return;

    const [ matchedPrefix ] = message.content.match(prefixRegex);

    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) ||
        client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;
    if(!message.guild.me.permissions.has(Permissions.FLAGS.SEND_MESSAGES)) return await message.author.dmChannel.send({ content: `I don't have **\`SEND_MESSAGES\`** permission in <#${message.channelId}> to execute this **\`${command.name}\`** command.` }).catch(() => {});

    if(!message.guild.me.permissions.has(Permissions.FLAGS.VIEW_CHANNEL)) return;

    if(!message.guild.me.permissions.has(Permissions.FLAGS.EMBED_LINKS)) return await message.reply({ content: `I don't have **\`EMBED_LINKS\`** permission to execute this **\`${command.name}\`** command.` }).catch(() => {});
    
    const embed = new MessageEmbed()
        .setColor(client.embedColor);

    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;
        let footer = `Description: `;
        

      if(command.description) {
        footer += `${command.description}`;
      } else {
        footer+= 'No description.'
      }

      
      if (command.usage) {
        	reply += `\n> Usage: \`${prefix}${command.usage}\``;
        }

      if(command.aliases){
        reply+= `\n> Aliases: \`${command.aliases}\``;
      }

      if(command.permission) {
        reply+= `\n> Permission: \`${command.permission}\``;
      }
       
        embed.setDescription(reply);
       embed.setFooter(footer);
        return message.reply({embeds: [embed]});
    }

    if (command.permission && !message.member.permissions.has(command.permission)) {
        embed.setTitle("***You can't use this command.***");
        return message.reply({embeds: [embed]});
    }
   if (!channel.permissionsFor(message.guild.me)?.has(Permissions.FLAGS.EMBED_LINKS) && client.user.id !== userId) {
        return channel.send({ content: `Error: I need \`EMBED_LINKS\` permission to work.` });
      }
    if (command.owner && message.author.id !== `${client.owner}`) {
        embed.setDescription("***Only <@453370780387115019> can use this command!***");
        return message.reply({embeds: [embed]});
    }

    const player = message.client.manager.get(message.guild.id);

    if (command.player && !player) {
        embed.setTitle("***There is no player for this guild.***");
        return message.reply({embeds: [embed]});
    }

    if (command.inVoiceChannel && !message.member.voice.channel) {
        embed.setTitle("***You must be in a voice channel!***");
        return message.reply({embeds: [embed]});
    }

    if (command.sameVoiceChannel) {
    if(message.guild.me.voice.channel) {
        if (message.guild.me.voice.channelId !== message.member.voice.channelId) {
            embed.setTitle(`***You must be in the same channel as me!***`);
            return message.reply({embeds: [embed]});
        }
    }
}

    try {
        command.execute(message, args, client, prefix);
    } catch (error) {
        console.log(error);
        embed.setDescription(`There was an error executing that command.\nI have contacted the owner of the bot to fix it immediately. \n> Try doing \`${prefix}bug <text>\` to report this bug.`);
        return message.reply({embeds: [embed]});



 

    }
  }
