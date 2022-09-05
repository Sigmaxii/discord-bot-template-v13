const { prefix } = require("../../config.js");
const { MessageEmbed } = require('discord.js');
module.exports = async (client) => {

    client.manager.init(client.user.id);
    client.logger.log(`${client.user.username} online!`, "ready");

  const arrayOfStatus = [
     `${client.guilds.cache.size} servers | /invite`,
    `${client.guilds.cache.size} servers | ${prefix}invite`
   ];
   let index = 0;
  setInterval(() => {
    if (index === arrayOfStatus.length) index = 0;
    const status = arrayOfStatus[index];
     client.user.setActivity(`${status}`, {
			type: "WATCHING" 
		 });
     index++;
 }, 8000);
   console.log(`Bot: ${client.user.tag}\nServers:  ${client.guilds.cache.size}`);

}
