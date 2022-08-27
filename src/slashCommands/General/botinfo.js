const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')
const os = require('os')
const Discord = require('discord.js');

const { SlashCommandBuilder } = require('@discordjs/builders')
module.exports = {
    data: new SlashCommandBuilder()
      .setName('botinfo')
      .setDescription('Get bot\'s info'),      
    run: async (client, interaction) => {
      const msq = Math.round(client.ws.ping);
      let em1 = '<:s_20ms:993662176034300005>', em2 = '<:s_90ms:993662200533233664>', em3 = '<:s_150ms:993662221974507640>', em4 = '<:s_250ms:993662241993937036>';
      const em = '<:s_20ms:993662176034300005>';
      if (msq > 90 && msq < 140) {
        let em = em2
      }
     else if (msq > 141 && msq < 249) {
        let em = em3
      }
      else if (msq > 250) {
        let em = em4 
      };
      const usercount = client.guilds.cache
      .reduce((a, b) => a + b.memberCount, 0);
  var scount = `${Math.floor(usercount / 1000)}k`;
      var schann = `${Math.floor(client.channels.cache.size / 1000)}k`

      const button = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setLabel("Click Here")
            .setStyle("LINK")
            .setURL("https://mod-bot.sigmaxii.com")
          );
            
        const embed = new MessageEmbed()
            .setThumbnail(client.user.displayAvatarURL())
            .setAuthor('Bot Info', "https://i.imgur.com/mDQVRsF.png")
            .setColor('#00ffff')
            .setImage('https://cdn.discordapp.com/attachments/773219541400420393/869943372650004520/image1.gif')
            .addFields(
                {
                    name: '<:s_server:993659554351026216> Servers',
                    value: `Serving ${client.guilds.cache.size} servers.`,
                    inline: true
                },
                {
                    name: '<:s_channel:993659607908094102> Channels',
                    value: `Serving ${schann} channels.`,
                    inline: true
                },
                {
                    name: '<:s_users:993659656335532132> Members',
                    value: `Serving ${scount} users`,
                    inline: true
                },
                {
                    name: ':date: Join Date',
                    value: `${client.user.createdAt}`,
                    inline: true
                },
                {
                    name: `${em} Ping`,
                    value: `${msq}ms`,
                    inline: true
                },
                {
                    name: '<:s_server:993659554351026216> Server Info',
                    value: `Cores: ${os.cpus().length}`,
                    inline: true
                },
                {
                  name: "<:s_ram:993670340989427743> Memory Usage",
                  value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB/ ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)}GB`,
                  inline: true
                },
                {
                  name: "<:s_djs:993670537421266984> Discord.js",
                  value: `v${Discord.version}`,
                  inline: true,
                },
                {
                  name: "<:s_nodejs:993671757628194926> Node",
                  value: `${process.version}`,
                  inline: true,
                }
            )

        interaction.reply({
    components: [button],
    embeds: [embed]});
    }
}