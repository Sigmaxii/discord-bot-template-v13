<h1 align="center">
  <br>
  Sigma's Discord Bot
  <br>
</h1>

<h4 align="center">Sigma's Discord Bot Template.</h4>

<p align="center">
  <a href="#installation">Installation</a>
  •
  <a href="#join-the-community">Community</a>
</p>

# Installation

```js
//@ src/config.js
module.exports = {
  token: "BOT-TOKEN" || process.env.token,  // bot token 
    prefix: ",", // prefix
  id: "BOT-ID", // bot id
    ownerID: "OWNER-ID", // your id
    mongourl: "MONGO-URI", // If you dont have a mongo uri then your bot wont be able to have changeable prefix  
    embedColor: "#00ffff", 
    avatar: "AVATAR-URL", //or file 
    logs: "CHANNEL-ID", 
  invite: "BOT-INVITE-URL",
  suggestions: "948876964595380255",
  bugLogs: "948876983520071710",
  ready: "CHANNEL-ID", //bot on ready message
  status: "TESTING", //SWITCH IT TO GLOBAL IF YOUR SLASH COMMANDS ARE READY
   guildId: 'GUILD-ID', // add a guild id that u want to test your slash commands , if status is global then guild id is not needed
}
```

# Join the community!

Join us on [Sigma's Discord Server](https://dsc.sigmaxii.com) & Join [Dungeon Server](https://dungeon.sigmaxii.com)!
