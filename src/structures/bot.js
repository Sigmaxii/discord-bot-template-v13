const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, Discord, Intents,Modal, TextInputComponent } = require("discord.js");
const { QuickDB } = require('quick.db');
const { LavasfyClient } = require("lavasfy");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { ChalkAdvanced } = require('chalk-advanced');
const { Manager } = require("erela.js");
const { readdirSync } = require("fs");
const { path } = require("path");
const deezer = require("erela.js-deezer");
const apple = require("erela.js-apple");
const facebook = require("erela.js-facebook");
const mongoose = require('mongoose');
const config = require("../config.json");
require("./PlayerBase"); 




class Sigma extends Client {
	 constructor() {
        super({
            shards: "auto",
            allowedMentions: {
                parse: ["roles", "users", "everyone"],
                repliedUser: false
            },
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MESSAGES, 
                Intents.FLAGS.GUILD_MEMBERS, 
                Intents.FLAGS.GUILD_VOICE_STATES
            ]
        });
		 this.commands = new Collection();
     this.slashcommands = new Collection();
     this.config = require("../config.js");
     this.owner = this.config.ownerID;
     this.prefix = this.config.prefix;
     this.embedColor = this.config.embedColor;
     this.aliases = new Collection();
     this.commands = new Collection();
     this.logger = require("../utils/logger.js");
     this.emoji = require("../utils/emoji.json");
     if(!this.token) this.token = this.config.token;
   /**  
    *  Database
    */
		 const dbOptions = {
        useNewUrlParser: true,
        autoIndex: false,
        connectTimeoutMS: 10000,
        family: 4,
        useUnifiedTopology: true,
      };
        mongoose.connect(this.config.mongourl, dbOptions);
        mongoose.Promise = global.Promise;
        mongoose.connection.on('connected', () => {
              this.logger.log('[DB] DATABASE CONNECTED', "ready");
              });
        mongoose.connection.on('err', (err) => {
                  console.log(`Mongoose connection error: \n ${err.stack}`, "error");
              });
        mongoose.connection.on('disconnected', () => {
                  console.log('Mongoose disconnected');
              });
        
    /**
     * Error Handler
     */
    this.on("disconnect", () => console.log("Bot is disconnecting..."))
    this.on("reconnecting", () => console.log("Bot reconnecting..."))
    this.on('warn', error => console.log(error));
    this.on('error', error => console.log(error));
    process.on('unhandledRejection', error => console.log(error));
    process.on('uncaughtException', error => console.log(error));
		    const client = this;

		   this.Lavasfy = new LavasfyClient(
      {
        clientID: this.config.SpotifyID,
        clientSecret: this.config.SpotifySecret,
        playlistPageLoadLimit: 4,
        filterAudioOnlyResult: true,
        autoResolve: true,
        useSpotifyMetadata: true,
      },
      [
        {
          id: this.config.nodes.id,
          host: this.config.nodes.host,
          port: this.config.nodes.port,
          password: this.config.nodes.password,
          secure: this.config.nodes.secure,
        },
      ]
    );

    this.manager = new Manager({
      plugins: [
        new deezer(),
        new apple(),
        new facebook(),
      ],
      nodes: [
        {
          identifier: this.config.nodes.id,
          host: this.config.nodes.host,
          port: this.config.nodes.port,
          password: this.config.nodes.password,
          secure: this.config.nodes.secure,
        },
      ],
      send(id, payload) {
        const guild = client.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
      },
    })
		  
/**
 * Client Events
 */
	readdirSync("./src/events/Client/").forEach(file => {
    const event = require(`../events/Client/${file}`);
    let eventName = file.split(".")[0];
    this.logger.log(`Loading Events Client ${eventName}`, "event");
    this.on(eventName, event.bind(null, this));
});
/**
 * Erela Manager Events
 */ 
  readdirSync("./src/events/Lavalink/").forEach(file => {
    const event = require(`../events/Lavalink/${file}`);
    let eventName = file.split(".")[0];
    client.logger.log(`Loading Events Lavalink ${eventName}`, "event");
    client.manager.on(eventName, event.bind(null, client));
});

     /**
 * Import all commands
 */
  readdirSync("./src/commands/").forEach(dir => {
    const commandFiles = readdirSync(`./src/commands/${dir}/`).filter(f => f.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`../commands/${dir}/${file}`);
        this.logger.log(`Loading ${command.category} commands ${command.name}`, "cmd");
        this.commands.set(command.name, command);
    }
})

     
/*
slash commands
*/

  const slashcommands = [];
    readdirSync("./src/slashCommands/").forEach((dir) => {
        const scommandsFiles = readdirSync(`./src/slashCommands/${dir}/`).filter((file) => file.endsWith('.js'));

      
        for (const file of scommandsFiles) {
            const scommand = require(`../slashCommands/${dir}/${file}`);
            slashcommands.push(scommand.data.toJSON());
        }
    });
    const CLIENT_ID = '737040516687986808';

    const rest = new REST({ version: '9' }).setToken(this.token);
    (async() => {
        try {
            if (this.config.status === 'GLOBAL') {
              
                await rest.put(Routes.applicationCommands(CLIENT_ID), {
                    body: slashcommands,
                });
                console.log(`${ChalkAdvanced.white('Sigma Bot')} ${ChalkAdvanced.gray('>')} ${ChalkAdvanced.green('Successfully registered commands globally')}`);
            } else {
                await rest.put(
                    Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID), {
                        body: slashcommands,
                    },
                );

                console.log(`${ChalkAdvanced.white('Sigma Bot')} ${ChalkAdvanced.gray('>')} ${ChalkAdvanced.green('Successfully registered commands locally')}`);
            }
        } catch (err) {
            if (err) console.error(err);
        }
    })();
     
	  this.on("ready", async () => {

    readdirSync("./src/slashCommands/").forEach((dir) => {
        const scommandsFiles = readdirSync(`./src/slashCommands/${dir}/`).filter((file) => file.endsWith('.js'));

      for (const file of scommandsFiles) {
            const scommand = require(`../slashCommands/${dir}/${file}`);
              this.slashcommands.set(scommand.data.name, scommand);

        }
    })
                                                })



  /*
slash commands end
*/

     
// auto delete at verify channel in my server 
let autodeletechannels = {
   "894046119682768918": 20000,

  "912818929494265876": 1500,
  "928848415473954866": 25000,
  "919259760908464228": 1500, // rocket dust
  "951563992881582130": 2000,//error gang
  "994055143702155375": 7000 // bot commands sigmas club
}
this.on("messageCreate", async (message) => {
   if(message.guild) { //if the channel is in the setup, and the timeout is not not (aka is) a number
      if(autodeletechannels[`${message.channel.id}`] && !isNaN(autodeletechannels[`${message.channel.id}`])) {
         setTimeout(() => { //delete the message  after the timeout
            message.delete().catch(console.error);
         }, Number(autodeletechannels[`${message.channel.id}`]))
      }
   }
});
     // welcome message mutli guild
this.on("guildMemberAdd", async member => {
  const db = new QuickDB();
  const guild = member.guild;
  let channel = await db.get(`welcome_${guild.id}`);
            if (!channel) return false;

  const wembed = new MessageEmbed()
    
  .setAuthor(member.user.tag, member.user.avatarURL())
  .setFooter(`${guild.name} | Members: ${guild.memberCount}`, guild.iconURL)
  .setDescription(`<a:s_welcome:972555131080032297> Hey **${member.user.tag}**, \n> Welcome to ${guild.name}! `)
  .setThumbnail(member.user.avatarURL())
  .setColor('#00ffff');
  
  var sChannel = guild.channels.cache.get(channel)
            if (!sChannel) return;
sChannel.send({
  embeds: [wembed]
}).catch(console.error);
});


     /**
bug modal 
     */
     this.on("interactionCreate", async (interaction) => {

       if (interaction.isButton()) {
    if (interaction.customId === 'bug-button') {
      const bug = new Modal()
        .setCustomId('bug-modal')
        .setTitle('Report a Bug')
        .addComponents([
          new MessageActionRow().addComponents(
            new TextInputComponent()
              .setCustomId('bug-input')
              .setLabel('Bug')
              .setStyle('SHORT')
              .setMinLength(10)
              .setMaxLength(2000)
              .setPlaceholder('Please specify the bug you found')
              .setRequired(true),
          ),
        ]);

      await interaction.showModal(bug);
    } else if (interaction.customId === 'sug-button') {
      const suggestion = new Modal()
        .setCustomId('sug-modal')
        .setTitle('Send a Suggestion')
        .addComponents([
          new MessageActionRow().addComponents(
            new TextInputComponent()
              .setCustomId('sug-input')
              .setLabel('Suggestion')
              .setStyle('SHORT')
              .setMinLength(30)
              .setMaxLength(2000)
              .setPlaceholder('Please write your suggestion here.')
              .setRequired(true),
          ),
        ]);

      await interaction.showModal(suggestion);
    }
  }

  if (interaction.isModalSubmit()) {
    if (!interaction.isModalSubmit()) return;
    if (interaction.customId === 'bug-modal') {
      const response =
        interaction.fields.getTextInputValue('bug-input');
      
      interaction.reply({content: `Your bug is submitted: \n> \`${response}\``, ephemeral: true});
      
const invite = await interaction.channel.createInvite({ maxAge: 0, maxUses: 0 })
        const content = new MessageEmbed()
            .setTitle("Bug")
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            .addField("<:s_users:993659656335532132>User", `${interaction.user.username}#${interaction.user.discriminator}`, true)
            .addField("<:s_users:993659656335532132>User ID", `${interaction.user.id}`, true)
            .addField("<:s_server:993659554351026216>Server Name:", `**${interaction.guild.name}**`, true)
            .addField(`<:s_server:993659554351026216>Server ID:`, ` **${interaction.guild.id}**`, true)
            .addField(`Server Invite`, `**[Click Here](${invite})**`, true)
            .addField(`:writing_hand:Reported:`, `> ${response}`)

        .setColor(config.main);
              const channel = this.channels.cache.get(config.bugLogs);

      channel.send({
            embeds: [content]
        })
      
    } else 
    if (interaction.customId === 'sug-modal') {
      const response =
        interaction.fields.getTextInputValue('sug-input');
      
      interaction.reply({content: `Your suggestion is submitted: \n> \`${response}\``, ephemeral: true});
      
const invite = await interaction.channel.createInvite({ maxAge: 0, maxUses: 0 })
        const content = new MessageEmbed()
            .setTitle("Suggestion")
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            .addField("<:s_users:993659656335532132>User", `${interaction.user.username}#${interaction.user.discriminator}`, true)
            .addField("<:s_users:993659656335532132>User ID", `${interaction.user.id}`, true)
            .addField("<:s_server:993659554351026216>Server Name:", `**${interaction.guild.name}**`, true)
            .addField(`<:s_server:993659554351026216>Server ID:`, ` **${interaction.guild.id}**`, true)
            .addField(`Server Invite`, `**[Click Here](${invite})**`, true)
            .addField(`:writing_hand:Suggested:`, `> ${response}`)

        .setColor(config.main);
              const channel = this.channels.cache.get(config.suggestions);

      channel.send({
            embeds: [content]
        })
      
    }
  }

     })
	 }



  
		 connect() {
        return super.login(this.token);
    };

};

module.exports = Sigma;
