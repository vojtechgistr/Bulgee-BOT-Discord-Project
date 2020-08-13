const db = require("quick.db");
const basic = require("../../botconfig.json");
const moment = require("moment");
         require("moment-duration-format");

module.exports = {
    config: {
        name: "uptime",
        usage: "ok ping",
        aliases: ["ut"],
        category: "basic",
        accessableby: "Members",
    },

    run: async (bot, message, args) => {
        if(message.channel.type === "dm") return;
        if(message.author.bot) return;

        let section = db.get(`basic_${message.guild.id}`)
        if(section === null) section = basic;

        if(section === "false") return;

        const duration = moment.duration(bot.uptime).format(" D [days], H [hrs], m [mins], s [secs]");

        return message.channel.send(`**Bot's uptime:**\n${duration}`);
    
}
}