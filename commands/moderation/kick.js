const { MessageEmbed } = require("discord.js")
const { red_light } = require("../../colours.json");

module.exports = {
    config: {
        name: "kick",
        description: "Mute all users in Voice Channel!",
        usage: "ok kick",
        category: "moderation",
        accessableby: "Administrators",
    },
    run: async (bot, message, args) => {
        message.delete();
const embed1 = new MessageEmbed()
        .setTitle(':x: Error :x:')
        .setDescription("I don't have enough permissions to do this command. \n - Please, give me permission -> ``KICK MEMBERS``")
        .setColor(0xd12828)
        .setTimestamp();
        const embed2 = new MessageEmbed()
        .setTitle(':x: Error :x:')
        .setDescription("You don't have enough permissions to do this command. \n - Required permission -> ``KICK MEMBERS``")
        .setColor(0xd12828)
        .setTimestamp();
        if(!message.member.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return message.channel.send(embed2)
            .then(m => m.delete({ timeout: 5000 }));


    let kickMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) 
    if(!kickMember) return message.channel.send("Please provide a user to kick!")
        .then(m => m.delete({ timeout: 5000 }));


    let reason = args.slice(1).join(" ")
    if(!reason) reason = "- No reason given -"

    if(!message.guild.me.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return message.channel.send(embed1)
        .then(m => m.delete({ timeout: 5000 }));


    const embed4 = new MessageEmbed()
    .setDescription("You can't kick yourself!")
    .setColor(red_light)
    
    if(kickMember.id === message.author.id) return message.channel.send(embed4);
    const embed3 = new MessageEmbed()
        .setDescription("You can't kick a moderator!")
        .setColor(red_light)
   if(message.guild.member(kickMember).hasPermission(["BAN_MEMBERS", "ADMINISTRATOR", "MANAGE_GUILD", "MANAGE_CHANNELS", "KICK_MEMBERS"])) return message.channel.send(embed3)
    .then(m => m.delete({ timeout: 5000 }));

    kickMember.send(`Hi, you have been kicked from \n **${message.guild.name}**! \n\n __**Reason:**__ \n ${reason}`).then(() => 
    kickMember.kick()).catch(err => console.log(err))

    const kicked = new MessageEmbed()
    .setTitle("<:SUREwarning:715481249082245141> KICKED <:SUREwarning:715481249082245141>")
    .setDescription(`**${kickMember.user.tag}** has been kicked from this server! \n\n __**Reason:**__ \n ${reason}`)
    .setFooter(`Kicked by ${message.author.username}#${message.author.discriminator}`)
    .setTimestamp()
    .setColor(red_light);
    message.channel.send(kicked)

    let embed = new MessageEmbed()
    .setColor(red_light)
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
    .addField("Moderation:", "Kick")
    .addField("Kicked:", kickMember.user.username)
    .addField("Moderator:", message.author.username)
    .addField("Reason:", reason)
    .addField("Date:", message.createdAt.toLocaleString())
    
        let sChannel = message.guild.channels.cache.find(c => c.name === "logs")
        sChannel.send(embed)
    }
}