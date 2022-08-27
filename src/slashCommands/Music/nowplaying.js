const { MessageEmbed, CommandInteraction, Client } = require("discord.js")
const { convertTime } = require('../../utils/convert.js');
const { progressbar } = require('../../utils/progressbar.js')

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('nowplaying')
    .setDescription('Shows you the track which is playing right now')
     ,

  run: async (client, interaction) => {
  await interaction.deferReply({
            ephemeral: true
        });
         const player = interaction.client.manager.get(interaction.guildId);

        if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("There is no music playing.");
            return interaction.editReply({embeds: [thing]});
        }

        const song = player.queue.current
        const emojimusic = client.emoji.music;
        var total = song.duration;
        var current = player.position;

        let embed = new MessageEmbed()
            .setDescription(`${emojimusic} **Now Playing**\n[${song.title}](${song.uri}) - \`[${convertTime(song.duration)}]\` \n\n\`${progressbar(player)}\``)
            .setThumbnail(song.displayThumbnail("3"))
            .setColor(client.embedColor)
            .addField("\u200b", `\`${convertTime(current)} / ${convertTime(total)}\``)
         return interaction.editReply({embeds: [embed]})
            
    }
};
