const { MessageEmbed } = require('discord.js');
const { red_light } = require("../../colours.json");

module.exports = {
    config: {
        name: "unfreeze",
        description: "UnFreezes current channel!",
        usage: "ok freeze",
        category: "moderation",
        accessableby: "Administrators",
    },
    run: async (bot, message, args) => {
        const embed1 = new MessageEmbed()
        .setTitle(':x: Error :x:')
        .setDescription("I don't have enough permissions to use this command. \n Please, give me permission -> ``MANAGE MESSAGES``")
        .setColor(0xd12828)
        const embed2 = new MessageEmbed()
        .setTitle(':x: Error :x:')
        .setDescription("You don't have enough permissions to use this command. \n - Required permission -> ``MANAGE MESSAGES``")
        .setColor(0xd12828)
            if (!message.guild.member(bot.user).hasPermission('MANAGE_CHANNELS')) return message.channel.send(embed1)
            .then(msg => {msg.delete(5000)})
            if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(embed2).then(msg => {msg.delete(5000)});
        const embed = new MessageEmbed()
        .setTitle(":X: REOPENED :X:")
        .setTimestamp()
        .setColor(red_light)
        .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`)
        .setDescription("This channel has been reopened");

        message.channel.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: true });
    
        message.channel.send(embed);
        message.delete();
    }
}