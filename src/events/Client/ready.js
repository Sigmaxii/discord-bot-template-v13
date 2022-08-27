const { prefix } = require("../../config.js");
const { MessageEmbed } = require('discord.js');
module.exports = async (client) => {

  const usercount = client.guilds.cache
      .reduce((a, b) => a + b.memberCount, 0);
  var scount = `${Math.floor(usercount / 1000)}k`;
var schann = `${Math.floor(client.channels.cache.size / 1000)}k`
    client.manager.init(client.user.id);
    client.logger.log(`${client.user.username} online!`, "ready");
    client.logger.log(`Ready on ${client.guilds.cache.size} servers, for a total of ${scount} users`, "ready");

  const arrayOfStatus = [
     `${client.guilds.cache.size} servers | /invite`,
    `${schann} channels | /invite`,
    ` ${scount} users | /invite`,
    `For music do /play | /invite`
//    `${client.commands.size} commands | ${prefix}invite`,
   ];
  const ch = client.channels.cache.get('994053345784385678');
  ch.setName(`🤖・Bot Users: ${scount}`);
   let index = 0;
  setInterval(() => {
    if (index === arrayOfStatus.length) index = 0;
    const status = arrayOfStatus[index];
   //  console.log(`Streaming ${status}`);
     client.user.setActivity(`${status}`, {
			type: "WATCHING" 
		 });
     index++;
 }, 8000);
   console.log(`Bot: ${client.user.tag}\nServers:  ${client.guilds.cache.size}\nUsers: ${scount}`);

}
