const { Util, MessageEmbed, Permissions } = require("discord.js");
const { TrackUtils, Player } = require("erela.js");
const { convertTime } = require('../../utils/convert.js');

module.exports = {
    name: "play",
    category: "Music",
    aliases: ["p"],
    description: "Plays audio from YouTube or Spotify",
    args: true,
    usage: "play <YouTube URL | Video Name | Spotify URL>",
    owner: false,
    player: false,
    inVoiceChannel: true,
    sameVoiceChannel: true,
   execute: async (message, args, client, prefix) => {
    
    if (!message.guild.me.permissions.has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])) return message.channel.send({embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`I don't have enough permissions to execute this command! please give me permission \`CONNECT\` or \`SPEAK\`.`)]});
    
    const { channel } = message.member.voice;
   
    if (!message.guild.me.permissionsIn(channel).has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])) return message.channel.send({embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`I don't have enough permissions connect your vc please give me permission \`CONNECT\` or \`SPEAK\`.`)]});
   
    let SearchString = args.join(" ");
    const emojiaddsong = message.client.emoji.addsong;
    const emojiplaylist = message.client.emoji.playlist;
    
    if(SearchString.startsWith("https://open.spotify.com/playlist/")) message.channel.send({ embeds: [new MessageEmbed().setAuthor(`Spotify`, "https://i.imgur.com/cK7XIkw.png").setColor(client.embedColor).setTimestamp().setDescription(`Playlist is loding please wait...`)]}).then(msg => { setTimeout(() => {msg.delete()}, 3000);
       })
       
    const player = client.manager.create({
      guild: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
      selfDeafen: true,
      volume: 80,
    });
    
    if (player.state != "CONNECTED") await player.connect();
    try {
      if (SearchString.match(client.Lavasfy.spotifyPattern)) {
        await client.Lavasfy.requestToken();
        let node = client.Lavasfy.nodes.get(client.config.nodes.id);
        let Searched = await node.load(SearchString);
      if (Searched.loadType === "PLAYLIST_LOADED") {
          let songs = [];
         for (let i = 0; i < Searched.tracks.length; i++)
            songs.push(TrackUtils.build(Searched.tracks[i], message.author));
          player.queue.add(songs);
          if (!player.playing && !player.paused && player.queue.totalSize === Searched.tracks.length)
            player.play();
         const thing = new MessageEmbed()
             .setColor(client.embedColor)
             .setTimestamp()
             .setDescription(`${emojiplaylist} **Added Playlist to queue** [${Searched.playlistInfo.name}](${SearchString}) - [\`${Searched.tracks.length}\`]`)
          return message.channel.send({embeds: [thing]});
     } else if (Searched.loadType.startsWith("TRACK")) {
          player.queue.add(TrackUtils.build(Searched.tracks[0], message.author));
       if (!player.playing && !player.paused && !player.queue.size)
            player.play();
            const thing = new MessageEmbed()
             .setColor(client.embedColor)
             .setTimestamp()
             .setDescription(`${emojiplaylist} **Added to queue** - [${Searched.tracks[0].info.title}](${Searched.tracks[0].info.uri})`)
         return message.channel.send({embeds: [thing]});
           } else {
         return message.channel.send({ embeds: [new MessageEmbed().setColor(client.embedColor).setTimestamp().setDescription('there were no results found.')]});
        }
      } else {
        let Searched = await player.search(SearchString, message.author);
         if (!player)
           return message.channel.send({ embeds: [new MessageEmbed().setColor(client.embedColor).setTimestamp().setDescription("Nothing is playing right now...")]});

         if (Searched.loadType === "NO_MATCHES")
           return message.channel.send({ embeds: [new MessageEmbed()].setColor(client.embedColor).setTimestamp().setDescription(`No matches found for - [this]${SearchString}`)});
        else if (Searched.loadType == "PLAYLIST_LOADED") {
          player.queue.add(Searched.tracks);
          if (!player.playing && !player.paused &&
            player.queue.totalSize === Searched.tracks.length)
            player.play();
         const thing = new MessageEmbed()
             .setColor(client.embedColor)
             .setTimestamp()
             .setDescription(`${emojiplaylist} Playlist added to queue - [${Searched.playlist.name}](${SearchString}) - \`${Searched.tracks.length}\` songs - \`[${convertTime(Searched.playlist.duration)}]\``)
           return message.channel.send({embeds: [thing]});
        } else {
          player.queue.add(Searched.tracks[0], message.author);
          if (!player.playing && !player.paused && !player.queue.size)
            player.play();
        const thing = new MessageEmbed()
             .setColor(client.embedColor)
             .setTimestamp()
             .setDescription(`${emojiaddsong} **Added Song to queue**\n[${Searched.tracks[0].title}](${Searched.tracks[0].uri}) - \`[${convertTime(Searched.tracks[0].duration)}]\``);
           return message.channel.send({embeds: [thing]});
        }
      }
    } catch (e) {
      console.log(e);
    }
  },
}
