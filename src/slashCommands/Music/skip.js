const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('kip current playing track'),

  run: async (client, interaction) => {
  await interaction.deferReply({
            ephemeral: true
        });
      if(!interaction.member.voice.channel) return interaction.editReply({embeds: [new MessageEmbed ().setColor(client.embedColor).setDescription("You are not connect in vc")]});
      if(interaction.guild.me.voice.channel && interaction.guild.me.voice.channelId !== interaction.member.voice.channelId) return interaction.editReply({embeds: [new MessageEmbed ().setColor(client.embedColor).setDescription(`You are not connected to <#${interaction.guild.me.voice.channelId}> to use this command.`)]});

   	const emojiskip = client.emoji.skip;
  if(!interaction.member.voice?.channel) return await interaction.editReply({embeds: [new MessageEmbed().setColor(client.embedColor).setDescription("You are not connected to a voice channel to use this command.")]
    }).catch(() => {});
    
  if(interaction.guild.me.voice.channel && interaction.member.voice?.channelId !== interaction.guild.me.voice.channelId) return await interaction.editReply({ embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`are not connected to ${interaction.guild.me.voice.channel} to use this command.`)]
    }).catch(() => {});
      const player = client.manager.get(interaction.guildId);
    if(!player) return await interaction.editReply({ embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`Nothing is playing right now.`)]
    }).catch(() => {});
    if(player && player.state !== "CONNECTED") {
       player.destroy(); 
      return await interaction.editReply({ embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`Nothing is playing right now.`)]
      }).catch(() => {});
    };
   if(!player.queue) return await interaction.editReply({ embeds: [new MessageEmbed().setColor(client.embedColor).setDescription("Nothing is playing right now.")]
   }).catch(() => {});
        if(!player.queue.current) return await interaction.editReply({ embeds: [new MessageEmbed().setColor(client.embedColor).setDescription("Nothing is playing right now.")]
      }).catch(() => {});

        if(!player.queue.size) return await interaction.editReply({ embeds: [new MessageEmbed().setColor(client.embedColor).setDescription("No songs left in the queue to skip.")]
      }).catch(() => {});

        player.stop();
        return await interaction.editReply({
            embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`${emojiskip} **Skipped** \n[${player.queue.current.title}](${player.queue.current.uri})`)]
        }).catch(() => {});
  }
					}
