const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const { QuickDB } = require('quick.db');
const db = new QuickDB();
module.exports = async (client, member) => {

// last member joined
 let guild = member.guild;
  if (guild.id !== '937084834868789278') return;
  const lastchannel = client.channels.cache.get("943272583082704926");

const lastuser = member.user.tag;

 lastchannel.setName(`👻・${lastuser}`);

// member counter
const mcchannel = client.channels.cache.get("943272220740943902")
const serverMembers = guild.memberCount;
const user = member.user.tag;
mcchannel.setName(`👤・Members: ${serverMembers}`)




}