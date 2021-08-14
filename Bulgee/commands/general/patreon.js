const { MessageEmbed } = require('discord.js');
const { MessageAttachment } = require('discord.js');
const { cyan } = require("../../colours.json");

module.exports = {
    config: {
        name: "patreon",
        description: "Shows owner's patreon",
        usage: "ok patreon",
        category: "basic",
        aliases: ["pa", "pat", "patron"],
        accessableby: "Members",
    },
    run: async (bot, message, args) => {

     const attach = new MessageAttachment('../../images/patreon')

        const embed = new MessageEmbed()
        .addField("__**Bot's Patreon:**__", `> http://patreon.com/bulgee`)
        .setDescription("Do you wanna support us? Look on our patreon!")
        .setThumbnail("https://cdn.discordapp.com/attachments/719923108420517889/719967681792573521/patreon.png")
        .setColor(cyan);
        return message.channel.send(embed)
    }
}