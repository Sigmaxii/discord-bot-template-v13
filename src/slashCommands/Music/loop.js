const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('loop')
    .setDescription('Delete a specific amount of messages')
      .addStringOption(option =>
        option
       .setName('toggle')
      .setDescription('Toggle loop')
        .addChoices(
      { name: "Track", value: "track" },
			{ name: "Queue", value: "queue" },
        )
        .setRequired(true)
    ),

  run: async (client, interaction) => {
  await interaction.deferReply({
            ephemeral: true
        });
        if (!interaction.replied) await interaction.deferReply().catch(() => {});
        if(!interaction.member.voice.channel) return interaction.editReply({embeds: [new MessageEmbed ().setColor(client.embedColor).setDescription("You are not connect in vc")]});
        if(interaction.guild.me.voice.channel && interaction.guild.me.voice.channelId !== interaction.member.voice.channelId) return interaction.editReply({embeds: [new MessageEmbed ().setColor(client.embedColor).setDescription(`You are not connected to <#${interaction.guild.me.voice.channelId}> to use this command.`)]});

       const input = interaction.options.getString("input");
    
        let player = client.manager.get(interaction.guildId);
          if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("There is no music playing.");
            return message.channel.send({embeds: [thing]});
        }
	  	  const emojiloop = client.emoji.loop;
	  	  
        if(input === "track") {
            if(player.trackRepeat) {
                player.setTrackRepeat(false);
            return await interaction.editReply({
              embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`${emojiloop} Loop track is now disabled`)]})   
            } else {
            player.setTrackRepeat(true);
            return await interaction.editReply({
              embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`${emojiloop} Loop track is now enabled`)]})
          }
        } else if(input === "queue") {
            if(!player.queue.size) return await interaction.editReply({
              embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`No more songs left in the queue to loop`)]})
         if(player.queueRepeat) {
                player.setQueueRepeat(false);
            return await interaction.editReply({
              embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`${emojiloop} Loop queue is now disabled`)]})
          } else {
          player.setQueueRepeat(true);
          return await interaction.editReply({
              embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`${emojiloop} Loop queue is now enabled`)]})
          };
       }
    }
};
