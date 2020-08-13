const { MessageEmbed } = require("discord.js")
const { orange } = require("../../colours.json");
const db = require("quick.db")
const fun = require("../../botconfig.json")

module.exports = {
    config: {
        name: "afk",
        description: "Just normal.. AFK",
        usage: "ok afk",
        category: "fun",
        accessableby: "Members",
    },

    run: async (bot, message, args) => {
        if(message.channel.type === "dm") return;

        let section = db.get(`fun_${message.guild.id}`)
        if(section === null) section = fun;

        if(section === "false") return

        const emoji = bot.emojis.cache.get('718489096837660693')
        message.channel.send(`${message.author} is now **AFK**.. <:SUREbye:717000075095572523>`).then(msg => {
            msg.react(emoji)
        })
}
}