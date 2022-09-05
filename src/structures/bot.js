const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, Discord, Intents,Modal, TextInputComponent } = require("discord.js");
const { QuickDB } = require('quick.db');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { ChalkAdvanced } = require('chalk-advanced');
const { readdirSync } = require("fs");
const { path } = require("path");
const mongoose = require('mongoose');



class Bot extends Client {
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
            ]
        });
		 
     this.commands = new Collection();
     this.aliases = new Collection();
     this.commands = new Collection();
     this.slashcommands = new Collection();
     this.config = require("../config.js");
     this.owner = this.config.ownerID;
     this.prefix = this.config.prefix;
     this.embedColor = this.config.embedColor;
     this.logger = require("../utils/logger.js");
     this.token = this.config.token;
     this.id = this.config.id;
     this.guild = this.guildID;
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

    const rest = new REST({ version: '9' }).setToken(this.token);
    (async() => {
        try {
            if (this.config.status === 'GLOBAL') {
              
                await rest.put(Routes.applicationCommands(this.id), {
                    body: slashcommands,
                });
                console.log(`${ChalkAdvanced.white('Bot')} ${ChalkAdvanced.gray('>')} ${ChalkAdvanced.green('Successfully registered commands globally')}`);
            } else {
                await rest.put(
                    Routes.applicationGuildCommands(this.id, this.guild), {
                        body: slashcommands,
                    },
                );

                console.log(`${ChalkAdvanced.white('Bot')} ${ChalkAdvanced.gray('>')} ${ChalkAdvanced.green('Successfully registered commands locally')}`);
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

     // welcome message for mutli-guilds
this.on("guildMemberAdd", async member => {
  const db = new QuickDB();
  const guild = member.guild;
  let channel = await db.get(`welcome_${guild.id}`);
            if (!channel) return false;

  const wembed = new MessageEmbed()
    
  .setAuthor(member.user.tag, member.user.avatarURL())
  .setFooter(`${guild.name} | Members: ${guild.memberCount}`, guild.iconURL)
  .setDescription(`Hey **${member.user.tag}**, \n> Welcome to ${guild.name}! `)
  .setThumbnail(member.user.avatarURL())
  .setColor('#00ffff');
  
  var sChannel = guild.channels.cache.get(channel)
            if (!sChannel) return;
sChannel.send({
  embeds: [wembed]
}).catch(console.error);
});


	 }
  
		 connect() {
        return super.login(this.token);
    };

};

module.exports = Bot;
