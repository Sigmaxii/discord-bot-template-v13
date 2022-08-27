const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const { convertTime } = require('../../utils/convert.js')
const ms = require('ms');

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('seek')
    .setDescription('Seek through the current playing song.')
      .addStringOption(option =>
		     option
		    .setName('time')
		     .setDescription('10s | 10m | 10h')
		     .setRequired(true)
		 ),

  run: async (client, interaction) => {
  await interaction.deferReply({
            ephemeral: true
        });
      if(!interaction.member.voice.channel) return interaction.editReply({embeds: [new MessageEmbed ().setColor(client.embedColor).setDescription("You are not connect in vc")]});
      if(interaction.guild.me.voice.channel && interaction.guild.me.voice.channelId !== interaction.member.voice.channelId) return interaction.editReply({embeds: [new MessageEmbed ().setColor(client.embedColor).setDescription(`You are not connected to <#${interaction.guild.me.voice.channelId}> to use this command.`)]});

        const args = interaction.options.getString("time");
    	const player = interaction.client.manager.get(interaction.guildId);

        if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("There is no music playing.");
           return await interaction.editReply({embeds: [thing]});
        }

        const time = ms(args)
        const position = player.position;
        const duration = player.queue.current.duration;

        const emojiforward = client.emoji.forward;
        const emojirewind = client.emoji.rewind;

        const song = player.queue.current;
        
        if (time <= duration) {
            if (time > position) {
                player.seek(time);
                let thing = new MessageEmbed()
                    .setDescription(`${emojiforward} **Forward**\n[${song.title}](${song.uri})\n\`${convertTime(time)} / ${convertTime(duration)}\``)
                    .setColor(client.embedColor)
                    .setTimestamp()
                 return await interaction.editReply({embeds: [thing]});
            } else {
                player.seek(time);
                let thing = new MessageEmbed()
                    .setDescription(`${emojirewind} **Rewind**\n[${song.title}](${song.uri})\n\`${convertTime(time)} / ${convertTime(duration)}\``)
                    .setColor(client.embedColor)
                    .setTimestamp()
           return await interaction.editReply({embeds: [thing]});
            }
        } else {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription(`Seek duration exceeds Song duration.\nSong duration: \`${convertTime(duration)}\``);
             return await interaction.editReply({embeds: [thing]});
        }
	
    }
};
