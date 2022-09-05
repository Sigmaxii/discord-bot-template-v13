var exports = module.exports = {};
const { MessageEmbed } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();



exports.modLog = async function(guild, text) {
	if (guild && text) {
		let channel = await db.get(`modlog_${guild.id}`); // dont change this
    var sChannel = guild.channels.cache.get(channel)
            if (!sChannel) return;

		if (channel) {
			var embed = new MessageEmbed(); // this is the modlog embed, test it via the ban command and if change it if you'd like , but make sure that ${text} will be there, otherwise there will be no point of having modlogs
      embed.setTitle("Moderation Logs");
			embed.setDescription(`${text} \n <t:${(Date.now() / 1000) | 0}:R>`);
			embed.setColor('#00ffff');
			sChannel.send({ embeds: [embed] }).catch(e => {});
		}
	}

};
