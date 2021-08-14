const { MessageEmbed } = require('discord.js');
const { cyan } = require("../../colours.json");

module.exports = {
    config: {
        name: "vote",
        usage: "ok vote",
        category: "basic",
        aliases: ["topgg", "top.gg"],
        accessableby: "Members",
    },
    run: async (bot, message, args) => {

        const embed = new MessageEmbed()
        .addField(`You can vote on this website:`, "**[CLICK HERE TO VOTE](https://top.gg/bot/670963766850224159)**")
        .setDescription(`Do you wanna support me? WOW, thanks!`)
        .setThumbnail(bot.user.displayAvatarURL())
        .setColor(cyan);

        return message.channel.send(embed)
    }
}