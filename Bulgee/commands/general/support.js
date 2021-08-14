const { MessageEmbed } = require('discord.js');
const { cyan } = require("../../colours.json");

module.exports = {
    config: {
        name: "support",
        description: "Shows support server",
        usage: "ok support",
        category: "basic",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        if(message.author.bot) return;
        if(message.channel.type === "dm") return;

        let i = bot.guilds.cache.get('673944511231295508');

        const embed = new MessageEmbed()
        .addField("__**Bot's Support Server:**__", `https://discord.gg/9sDzhWD`)
        .setDescription("Do you have any questions? Right!")
        .setThumbnail(i.iconURL())
        .setColor(cyan);
        return message.channel.send(embed)
    }
}