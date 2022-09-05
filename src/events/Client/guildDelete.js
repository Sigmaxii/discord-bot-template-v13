const { MessageEmbed } = require('discord.js');

module.exports = async (client, guild) => {
  
  const channel = client.channels.cache.get(client.config.logs);
  
  const embed = new MessageEmbed()
    .setThumbnail(guild.iconURL({ dynamic: true, size: 1024}))
    .setTitle(`📤 Left a Guild !!`)
    .setDescription('I left a server -1');
    channel.send({embeds: [embed]})
}
