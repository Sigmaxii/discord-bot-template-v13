const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = async (client, guild) => {
  
  const channel = client.channels.cache.get(client.config.logs);
  let own = await guild.fetchOwner()
  const Aembed = new MessageEmbed()
    .setThumbnail(guild.iconURL({ dynamic: true, size: 1024}))
    .setTitle(`📥 Joined a Guild !!`)
    .addField('Name', `\`${guild.name}\``)
    .addField('ID', `\`${guild.id}\``)
    .addField('Owner', `\`${guild.members.cache.get(own.id) ? guild.members.cache.get(own.id).user.tag : "Unknown user"}\` ${own.id}\``)
    .addField('Member Count', `\`${guild.memberCount}\` Members`)
    .addField('Creation Date', `\`${moment.utc(guild.createdAt).format('DD/MMM/YYYY')}\``)
    .addField('Joined:', ` \n <t:${(Date.now() / 1000) | 0}:R>`)
    .setColor(client.embedColor)
    .addField(`${client.user.username}'s Server Count`, `\`${client.guilds.cache.size}\` Severs`)
    .setTimestamp()
    channel.send({embeds: [Aembed]})

  var channels = await guild.channels.fetch();
							if (channels) {
								var jch = channels.find(c => c.type == "GUILD_TEXT");
								if (jch) {
									var embed = new MessageEmbed;
									embed.setColor(client.embedColor);
									embed.setTitle("Sigma Bot");
									embed.setThumbnail(client.avatar);
									embed.setDescription("Hey there! \n \n I am a multipurpose discord bot! Thanks for inviting me, use `,help` to see what I can do!");
									await jch.send({ embeds: [embed] }).catch(e => {

									});
								}

	
}}