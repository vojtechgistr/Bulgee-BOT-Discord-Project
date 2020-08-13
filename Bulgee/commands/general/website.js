const { MessageEmbed } = require('discord.js');
const { cyan } = require("../../colours.json");

module.exports = {
    config: {
        name: "website",
        usage: "ok website",
        category: "basic",
        aliases: ["web", "ws"],
        accessableby: "Members",
    },
    run: async (bot, message, args) => {

        const embed = new MessageEmbed()
        .setDescription(`Hmmm.... <a:SUREbearymad:718488090045448232>`)
        .addField(`Bot's website (desktop only - no responzivity [for now])`, `**[CLICK TO OPEN](http://bulgee.xyz)**`)
        .setThumbnail(bot.user.displayAvatarURL())
        .setColor(cyan);

        return message.channel.send(embed)
    }
}