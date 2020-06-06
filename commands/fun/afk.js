const { MessageEmbed } = require("discord.js")
const { orange } = require("../../colours.json");

module.exports = {
    config: {
        name: "afk",
        description: "Pong!",
        usage: "ok afk",
        aliases: ["AFK", "Afk", "aFk", "", "AfK", "aFk", "afK"],
        category: "fun",
        accessableby: "Members",
    },

    run: async (bot, message, args) => {
        const emoji = bot.emojis.cache.get('718489096837660693')
        message.channel.send(`${message.author} is now **AFK**.. <:SUREbye:717000075095572523>`).then(msg => {
            msg.react(emoji)
        })
    }
}