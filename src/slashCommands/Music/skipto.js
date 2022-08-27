const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('skipto')
    .setDescription('skip to a specific track from the queue.')
      .addNumberOption(option =>
		     option
		    .setName('id')
		     .setDescription('Specify track id')
		     .setRequired(true)
		 ),

  run: async (client, interaction) => {
    await interaction.deferReply({
            ephemeral: true
        });
        if(!interaction.member.voice.channel) return interaction.editReply({embeds: [new MessageEmbed ().setColor(client.embedColor).setDescription("You are not connect in vc")]});
      if(interaction.guild.me.voice.channel && interaction.guild.me.voice.channelId !== interaction.member.voice.channelId) return interaction.editReply({embeds: [new MessageEmbed ().setColor(client.embedColor).setDescription(`You are not connected to <#${interaction.guild.me.voice.channelId}> to use this command.`)]});

      const args = interaction.options.getNumber("id");
    	const player = interaction.client.manager.get(interaction.guildId);

        if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("There is no music playing.");
           return await interaction.editReply({embeds: [thing]});
        }

        const position = Number(args);
		
		if (!position || position < 0 || position > player.queue.size) { 
			let thing = new MessageEmbed()
        .setColor("RED")
				.setDescription(`Usage: ${prefix}volume <Number of song in queue>`)
            return await interaction.editReply({embeds: [thing]});
		}

        player.queue.remove(0, position - 1);
        player.stop();
		
		const emojijump = client.emoji.jump;

		let thing = new MessageEmbed()
			.setDescription(`${emojijump} Forward **${position}** Songs`)
			.setColor(client.embedColor)
			.setTimestamp()
			
		return await interaction.editReply({embeds: [thing]});
	
    }
};
