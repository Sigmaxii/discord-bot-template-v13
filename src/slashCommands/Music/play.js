const { CommandInteraction, Client, MessageEmbed, Permissions } = require("discord.js");
const { TrackUtils, Player } = require("erela.js");
  const { convertTime } = require('../../utils/convert.js');

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play a song from YouTube or Spotify')
      .addStringOption(option =>
		     option
		     .setName("search")
		     .setDescription("The song to play.")
		     .setRequired(true)
		 ),
  run: async (client, interaction) => {
    await interaction.deferReply({
            ephemeral: true
        });
    if(!interaction.guild.me.permissions.has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])) return interaction.editReply({embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`I don't have enough permissions to execute this command! please give me permission \`CONNECT\` or \`SPEAK\`.`)]});

      const { channel } = interaction.member.voice;

      if(!interaction.guild.me.permissionsIn(channel).has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])) return interaction.editReply({embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`I don't have enough permissions connect your vc please give me permission \`CONNECT\` or \`SPEAK\`.`)]});


      if(!interaction.member.voice.channel) return interaction.editReply({embeds: [new MessageEmbed ().setColor(client.embedColor).setDescription("You are not connect in vc")]});
      
      if(interaction.guild.me.voice.channel && interaction.guild.me.voice.channelId !== interaction.member.voice.channelId) return interaction.editReply({embeds: [new MessageEmbed ().setColor(client.embedColor).setDescription(`You are not connected to <#${interaction.guild.me.voice.channelId}> to use this command.`)]});

      const emojiaddsong = client.emoji.addsong;
      const emojiplaylist = client.emoji.playlist;
      let search = interaction.options.getString("search");
      let res;
    
    let player = client.manager.create({
      guild: interaction.guildId,
      textChannel: interaction.channelId,
      voiceChannel: interaction.member.voice.channelId,
      selfDeafen: true,
      volume: 100
    });
    
      if (player.state != "CONNECTED") await player.connect();
      if (search.match(client.Lavasfy.spotifyPattern)) {
        await client.Lavasfy.requestToken();
        let node = client.Lavasfy.nodes.get(client.config.nodes.id);
        let Searched = await node.load(search);

        switch (Searched.loadType) {
          case "LOAD_FAILED":
            if (!player.queue.current) player.destroy();
            return await interaction.editReply({ embeds: [new MessageEmbed().setColor(client.embedColor).setTimestamp().setDescription('Failed To Load Playlist.')]});

          case "NO_MATCHES":
            if (!player.queue.current) player.destroy();
            return await interaction.editReply({ embeds: [new MessageEmbed().setColor(client.embedColor).setTimestamp().setDescription('there were no results found.')]});
            
          case "TRACK_LOADED":
            player.queue.add(TrackUtils.build(Searched.tracks[0], interaction.user));
            if (!player.playing && !player.paused && !player.queue.length)
              player.play();
         const loadmusic = new MessageEmbed()
             .setColor(client.embedColor)
             .setTimestamp()
             .setDescription(`${emojiplaylist} **Added to queue** - [${Searched.tracks[0].info.title}](${Searched.tracks[0].info.uri})`)
         return await interaction.editReply({embeds: [loadmusic]});
           
          case "SEARCH_RESULT":
            player.queue.add(TrackUtils.build(Searched.tracks[0], interaction.user));
            if (!player.playing && !player.paused && !player.queue.length)
              player.play();
             const searchmusic = new MessageEmbed()
                .setColor(client.embedColor)
                .setTimestamp()
                .setDescription(`${emojiplaylist} **Added to queue** - [${Searched.tracks[0].info.title}](${Searched.tracks[0].info.uri})`)
            return await interaction.editReply({ embeds: [searchmusic] });
            
          case "PLAYLIST_LOADED":
            let songs = [];
            for (let i = 0; i < Searched.tracks.length; i++)
              songs.push(TrackUtils.build(Searched.tracks[i], interaction.user));
            player.queue.add(songs);
            if (
              !player.playing &&
              !player.paused &&
              player.queue.totalSize === Searched.tracks.length
            )
              player.play();
          const playlistload = new MessageEmbed()
             .setColor(client.embedColor)
             .setTimestamp()
             .setDescription(`${emojiplaylist} **Added Playlist to queue** [${Searched.playlistInfo.name}](${search}) - [\`${Searched.tracks.length}\`]`)
         return await interaction.editReply({embeds: [playlistload]});
        }
      } else {
        try {
          res = await player.search(search);
          if (res.loadType === "LOAD_FAILED") {
            if (!player.queue.current) player.destroy();
            return await interaction.editReply({ embeds: [new MessageEmbed().setColor(client.embedColor).setTimestamp().setDescription(`:x: | **There was an error while searching**`)]});
          }
        } catch (err) {
          console.log(err)
        }
        switch (res.loadType) {
          case "NO_MATCHES":
            if (!player.queue.current) player.destroy();
            return await interaction.editReply({ embeds: [new MessageEmbed().setColor(client.embedColor).setTimestamp().setDescription("❌ | **No results were found.**")]});
          case "TRACK_LOADED":
            player.queue.add(res.tracks[0], interaction.user);
            if (!player.playing && !player.paused && !player.queue.length)
              player.play();
            const trackload = new MessageEmbed()
                .setColor(client.embedColor)
                .setTimestamp()
                .setDescription(`${emojiplaylist} Added to queue [${res.tracks[0].title}](${res.tracks[0].uri}) - \`[${convertTime(res.tracks[0].duration)}]\``);
             return await interaction.editReply({embeds: [trackload]});
           case "PLAYLIST_LOADED":
            player.queue.add(res.tracks);
            await player.play();
            
         const playlistloadds = new MessageEmbed()
             .setColor(client.embedColor)
             .setTimestamp()
             .setDescription(`${emojiplaylist} Playlist added to queue [${res.playlist.name}](${interaction.data.options[0].value}) - \`[${convertTime(res.playlist.duration)}]\``);
          return await interaction.editReply({embeds: [playlistloadds]});
          case "SEARCH_RESULT":
            const track = res.tracks[0];
            player.queue.add(track);
            
            if (!player.playing && !player.paused && !player.queue.length) {
               const searchresult = new MessageEmbed()
                .setColor(client.embedColor)
                .setTimestamp()
                .setThumbnail(track.displayThumbnail("3"))
                .setDescription(`${emojiplaylist} Added to queue [${track.title}](${track.uri}) - \`[${convertTime(track.duration)}]`);
                
              player.play();
            return await interaction.editReply({embeds: [searchresult]});
            
            } else {
               const thing = new MessageEmbed()
                .setColor(client.embedColor)
                .setTimestamp()
                .setThumbnail(track.displayThumbnail("3"))
                .setDescription(`${emojiplaylist} Added to queue [${track.title}](${track.uri}) - \`[${convertTime(track.duration)}]\``);
             
                return await interaction.editReply({embeds: [thing]});
          
            }
        }
      }
  }
}
