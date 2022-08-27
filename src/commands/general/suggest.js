const config = require('../../config.json');
const { MessageEmbed, Modal, TextInputComponent, MessageButton, MessageActionRow, } = require('discord.js')
module.exports = {
    name: 'suggest',
    description: 'Suggests something about the bot, a feature for example!',
    aliases: ["suggestion"],
    category: "general",
  args: true,
    usage: 'suggest <text>',
    execute: async (message, args, client, prefix) => {
//        const channel = client.channels.cache.get(config.suggestions);
      
return message.reply({
            embeds: [new MessageEmbed()
                .setTitle('***Click the button to send the suggestion***')
                .setColor(config.main)
            ], components: [new MessageActionRow().addComponents(
    new MessageButton()
      .setCustomId('sug-button')
      .setStyle('PRIMARY')
      .setLabel('Send Suggestion'),
  )]
        });

    }



};