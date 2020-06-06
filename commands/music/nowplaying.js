const { Utils } = require("erela.js")
const { MessageEmbed } = require("discord.js")
const { stripIndents } = require("common-tags")
const { purple_medium } = require('..//..//colours.json')

module.exports = { 
    config: {
        name: "nowplaying",
        aliases: ["np", "now"],
        description: "Displays what the bot is currently playing.",
        accessableby: "Member",
        category: "music",
    },
    run: async (bot, message, args) => {

        let nosongs = new MessageEmbed()
            .setDescription("No song/s currently playing")
            .setColor(purple_medium);

        const player = bot.music.players.get(message.guild.id);
        if (!player || !player.queue[0]) return message.channel.send(nosongs);
        const { title, author, duration, thumbnail } = player.queue[0];

        const embed = new MessageEmbed()
            .setAuthor("Current Song:")
            .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL)
            .setThumbnail(thumbnail)
            .setDescription(stripIndents`
            ${player.playing ? "▶️" : "⏸️"} **${title}** \`${Utils.formatTime(duration, true)}\` by ${author}
            `);

        return message.channel.send(embed)
    }
}