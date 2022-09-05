module.exports = {
  token: "BOT-TOKEN",  
    prefix: ",",
  id: "BOT-ID",
    ownerID: "OWNER-ID", 
    mongourl: "MONGO-URI", // If you dont have a mongo uri then your bot wont be able to have changeable prefix  
    embedColor: "#00ffff", 
    avatar: "AVATAR-URL", //or file 
    logs: "CHANNEL-ID", 
  invite: "BOT-INVITE-URL",
  ready: "CHANNEL-ID", //bot on ready message
  status: "TESTING", //SWITCH IT TO GLOBAL IF YOUR SLASH COMMANDS ARE READY
   guildId: 'GUILD-ID', // add a guild id that u want to test your slash commands , if status is global then guild id is not needed
}
