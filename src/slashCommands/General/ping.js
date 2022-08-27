const { MessageEmbed, CommandInteraction, Client } = require("discord.js")
const { SlashCommandBuilder } = require('@discordjs/builders')
module.exports = {
    data: new SlashCommandBuilder()
      .setName('ping')
      .setDescription('Get ping'),
     run: async (client, interaction) => {
        await interaction.deferReply({
            ephemeral: true
        });
        await interaction.editReply({ content: "Pining..." }).then(async () => {
            const ping = Date.now() - interaction.createdAt;
            const api_ping = client.ws.ping;

            await interaction.editReply({
                content: "`🏓`",
                embeds: [new MessageEmbed().setAuthor(`Pong`, client.user.displayAvatarURL({ dynamic: true })).setColor(client.embedColor).setFooter(`Requested by ${interaction.member.user.username}`, interaction.member.user.displayAvatarURL({ dynamic: true })).addFields([{ name: "Bot Latency", value: `\`\`\`ini\n[ ${ping}ms ]\n\`\`\``, inline: true }, { name: "API Latency", value: `\`\`\`ini\n[ ${api_ping}ms ]\n\`\`\``, inline: true }]).setTimestamp()]
            });
        })
    }
			}