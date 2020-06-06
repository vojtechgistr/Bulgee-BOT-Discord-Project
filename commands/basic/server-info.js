const { MessageEmbed } = require("discord.js")
const { cyan } = require("../../colours.json");
const moment = require('moment')

module.exports = {
    config: {
        name: "server-info",
        description: "Pulls the serverinfo of the guild!",
        usage: "ok server-info",
        category: "basic",
        accessableby: "Members",
        aliases: ["si"]
    },

    run: async (bot, message, args) => {
    let invite = await message.channel.createInvite({ 
        unique: false,
        maxAge: 0
         })

      let texts = message.guild.channels.cache.filter(c => c.type === 'text').size;
      let categories = message.guild.channels.cache.filter(c => c.type === 'category').size;
      let voices = message.guild.channels.cache.filter(c => c.type === 'voice').size;
      let verifLevels = ["None", "Low", "Medium", "(╯°□°）╯︵  ┻━┻", "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"];

    let sEmbed = new MessageEmbed()
        .setColor(cyan)
        .setTitle("Server Informations")
        .setThumbnail(message.guild.iconURL())
        .addField("**Server Name:**", `${message.guild.name}`, false)
        .addField("**Server Owner:**", `${message.guild.owner} [owner id: ${message.guild.owner.id}]`, false)
        .addField("**User Count:**", `**${message.guild.members.cache.size}** total, **${message.guild.members.cache.filter(member => !member.user.bot).size}** users, **${message.guild.members.cache.filter(member => member.user.bot).size}** bots`, false)
        .addField("**Server Created At:**", `${moment(message.guild.createdAt).format("MMMM Do YYYY, h:mm:ss a")}`, false)
        .addField("**Server Level:**", `Level **${message.guild.premiumTier}** - **${message.guild.premiumSubscriptionCount}** server boosts`, false)
        .addField("**Channel Count:**", `**${texts}** text, **${voices}** voice, **${categories}** categories`, false)
        .addField("**Role Count:**", `${message.guild.roles.cache.size}`, false)
        .addField("Server Verification Level", `${message.guild.verificationLevel}`, false)
        .addField('\u200b', '\u200b', false)
        .addField("**Server Permanent Invite:**", `${invite}`, false)
        .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL());
    message.channel.send(sEmbed);
    }
    
}