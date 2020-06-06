const { MessageEmbed } = require("discord.js")
const { cyan } = require("../../colours.json");

const moment = require('moment')

module.exports = {
    config: {
        name: "user-info",
        description: "Pulls the user info!",
        usage: "ok user-info",
        category: "basic",
        accessableby: "Members",
        aliases: ["ui"]
    },

    run: async (bot, message, args) => {
        const embed2 = new MessageEmbed()
        .setTitle(':x: Error :x:')
        .setDescription("You don't have enough permissions to use this command. \n - Required permission -> ``MANAGE MESSAGES``")
        .setColor(0xd12828)
        .setTimestamp();
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(embed2)
        .then(m => m.delete({ timeout: 30000 }));
        message.delete({ timeout: 30000 });

        let invalid = new MessageEmbed()
            .setDescription("Enter valid id or username!")
            .setColor(cyan);
        
        let cannotfind = new MessageEmbed()
            .setDescription("User is not on this server!")
            .setColor(cyan);

        let botuserlmao = new MessageEmbed()
            .setDescription("Bot is not a real person! Try someone else..")
            .setColor(cyan);


    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!args[0]) return message.channel.send(invalid)
        .then(m => m.delete({ timeout: 30000 }));
            message.delete({ timeout: 30000 });

    if(!user) return message.channel.send(cannotfind)
        .then(m => m.delete({ timeout: 30000 }));
    message.delete({ timeout: 30000 });

    if(user.user.bot) return message.channel.send(botuserlmao)
        .then(m => m.delete({ timeout: 30000 }));
            message.delete({ timeout: 30000 });

    let sEmbed = new MessageEmbed()
        .setColor(cyan)
        .setTitle("User Informations")
        .setThumbnail(user.user.displayAvatarURL)
        .addField("**User Name:**", `${user.user.username}`, false)
        .addField("**User Tag:**", `${user.user.discriminator}`, false)
        .addField("**User ID:**", `${user.user.id}`, false)
        .addField("**User Status:**", `${user.presence.status}`, false)
        .addField("**MFA Account:**", `${user.mfa_enabled ? "Yes" : "No"}`, false)
        .addField('\u200b', '\u200b')
        .addField("**Joined on this server:**", moment(message.member.guild.members.cache.get(user.id).joinedAt).format("MMMM Do YYYY, h:mm:ss a"), false)
        .addField("**Account Created at:**", moment(message.member.guild.members.cache.get(user.id).user.createdAt).format("MMMM Do YYYY, h:mm:ss a"), false)
        .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL());
    message.channel.send(sEmbed);
    }
}