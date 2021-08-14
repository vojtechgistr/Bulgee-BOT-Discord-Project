const { MessageEmbed } = require("discord.js")
const { cyan } = require("../../colours.json");
const db = require("quick.db")
const basic = require("../../botconfig.json")
const { default_prefix } = require('../../botconfig.json')

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
        if(message.author.bot) return;
        if(message.channel.type === "dm") return;

        let section = db.get(`basic_${message.guild.id}`)
        if(section === null) section = basic;

        if(section === "false") return;

                
        let prefix = db.get(`prefix_${message.guild.id}`)
        if(prefix === null) prefix = default_prefix;

        const moment = require("moment");
         require("moment-duration-format");
        const duration = moment.duration(bot.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        const version = require('../../package.json').version;
        const owner = bot.users.cache.get('484448041609199620')

        let sEmbed = new MessageEmbed()
            .setColor(cyan)
            .setTitle("Bot Informations")
            .setThumbnail(bot.user.displayAvatarURL())
            .addField("**Owner:**", owner, false)
            .addField("**Created at:**", `1/26/2020`, false)
            .addField("**Bot on:**", `**${bot.guilds.cache.size}** servers`, false)
            .addField("**Users:**", `**${bot.users.cache.size}** users`, false)
            .addField("**Uptime:**", `${duration}`, false)
            .addField("**Tags:**", `Moderation, Fun, Music, Anime, Leveling, AntiRaid, Utils, Logging`, false)
            .addField("**Library:**", `discord.js`, false)
            .addField("**Version:**", `${version}`, false)
            .addField("**Default Prefix:**", `${default_prefix}`, false)
            .addField("**Main Command:**", `ok help`, false)
            .addField('\u200b', '\u200b')
            .addField("**Support Server:**", `**https://discord.gg/9sDzhWD**`, false)
            .addField("**Invite Link:**", `**[CLICK TO INVITE](https://discord.com/oauth2/authorize?client_id=670963766850224159&scope=bot&permissions=2146958847)**`)
            .addField("**Patreon:**", `**http://patreon.com/bulgee**`)
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());
    message.channel.send(sEmbed);

    }
}