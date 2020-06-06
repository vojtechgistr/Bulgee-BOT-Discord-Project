const { MessageEmbed } = require("discord.js")
const { cyan } = require("../../colours.json");

module.exports = {
    config: {
        name: "bot-info",
        description: "Pulls the bot global info!",
        usage: "ok bot-info",
        category: "basic",
        accessableby: "Members",
        aliases: ["bi"]
    },

    run: async (bot, message, args) => {

        const moment = require("moment");
         require("moment-duration-format");
        const duration = moment.duration(bot.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        const version = require('../../package.json').version;

        let sEmbed = new MessageEmbed()
            .setColor(cyan)
            .setTitle("Bot Informations")
            .setThumbnail(bot.user.displayAvatarURL())
            .addField("**Bot owner:**", `VojtaG#3107`, false)
            .addField("**Created at:**", `1/26/2020`, false)
            .addField("**Bot On:**", `**${bot.guilds.cache.size}** servers`, false)
            .addField("**Bot Uptime**", `${duration}`, false)
            .addField("**Bot Type**", `Moderation, Fun, Music`, false)
            .addField("**Bot version:**", `${version}`, false)
            .addField("**Bot Prefix**", `ok`, false)
            .addField("**Main Command**", `ok help`, false)
            .addField('\u200b', '\u200b')
            .addField("**Support Server:**", `> https://discord.gg/9sDzhWD`, false)
            .addField("**Invite Link: **", `> https://t.ly/df5i`)
            .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL());
    message.channel.send(sEmbed);

    }
}