const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = async (client, guild) => {
  
  const channel = client.channels.cache.get(client.config.logs);
	
  const Aembed = new MessageEmbed()
    .setThumbnail(guild.iconURL({ dynamic: true, size: 1024}))
    .setTitle(`📥 Joined a Guild !!`)
    .setDescription('I joined a server')
    channel.send({embeds: [Aembed]})


	
}}
