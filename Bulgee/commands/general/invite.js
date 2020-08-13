const { MessageEmbed } = require('discord.js');
const { cyan } = require("../../colours.json");

module.exports = {
    config: {
        name: "invite",
        description: "Shows bot's invite",
        usage: "ok invite",
        category: "basic",
        aliases: ["inv"],
        accessableby: "Members",
    },
    run: async (bot, message, args) => {

        const embed = new MessageEmbed()
        .setDescription(`Do you like this bot? You can invite him!`)
        .addField(`Bot's invite:`, `**[CLICK TO INVITE THIS BOT ON YOUR SERVER](https://discord.com/oauth2/authorize?client_id=670963766850224159&scope=bot&permissions=2146958847)**`)
        .setThumbnail(bot.user.displayAvatarURL())
        .setColor(cyan);

        return message.channel.send(embed)
    }
}