const { MessageEmbed, CommandInteraction, Client } = require("discord.js")

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('shuffle')
    .setDescription('Shuffle queue.'),

  run: async (client, interaction) => {
  await interaction.deferReply({
            ephemeral: true
        });
      if(!interaction.member.voice.channel) return interaction.editReply({embeds: [new MessageEmbed ().setColor(client.embedColor).setDescription("You are not connect in vc")]});
      if(interaction.guild.me.voice.channel && interaction.guild.me.voice.channelId !== interaction.member.voice.channelId) return interaction.editReply({embeds: [new MessageEmbed ().setColor(client.embedColor).setDescription(`You are not connected to <#${interaction.guild.me.voice.channelId}> to use this command.`)]});

        const player = interaction.client.manager.get(interaction.guildId);              
       if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("There is no music playing.");
             return interaction.editReply({embeds: [thing]});
        }
        player.queue.shuffle();
        
        const emojishuffle = client.emoji.shuffle;

        let thing = new MessageEmbed()
            .setDescription(`${emojishuffle} Shuffled the queue`)
            .setColor(client.embedColor)
            .setTimestamp()
         return interaction.editReply({embeds: [thing]});
	
    }
};
