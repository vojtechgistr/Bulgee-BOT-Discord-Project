const { MessageEmbed } = require("discord.js")
const { red_light } = require("../../colours.json");

module.exports = {
    config: {
        name: "ban",
        description: "Bans a user from the guild!",
        usage: "ok ban",
        category: "moderation",
        accessableby: "Administrators",
    },
    run: async (bot, message, args) => {
        message.delete();

        const embed1 = new MessageEmbed()
        .setTitle(':x: Error :x:')
        .setDescription("I don't have enough permissions to do this command. \n - Please, give me permission -> ``BAN MEMBERS``")
        .setColor(0xd12828)
        .setTimestamp();
        const embed2 = new MessageEmbed()
        .setTitle(':x: Error :x:')
        .setDescription("You don't have enough permissions to do this command. \n - Required permission -> ``BAN MEMBERS``")
        .setColor(0xd12828)
        .setTimestamp();
    if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send(embed2)
        .then(m => m.delete({ timeout: 5000 }));
        if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send(embed2)
        .then(m => m.delete({ timeout: 5000 }));

        
   let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])

   const noreason = new MessageEmbed()
    .setTitle(":X: Error :X:")
    .setDescription("Please provide a user to ban!")
    .setTimestamp()
    .setColor(red_light)

   if(!banMember) return message.channel.send(noreason)
        .then(m => m.delete({ timeout: 5000 }));

   let reason = args.slice(1).join(" ");
   if(!reason) reason = "No reason given!"

   const embed4 = new MessageEmbed()
        .setDescription("You can't ban yourself!")
        .setColor(red_light)
   if(banMember.id === message.author.id) return message.channel.send(embed4)
    .then(m => m.delete({ timeout: 5000 }));

   const embed3 = new MessageEmbed()
        .setDescription("You can't ban a moderator!")
        .setColor(red_light)
   if(message.guild.member(banMember).hasPermission(["BAN_MEMBERS", "ADMINISTRATOR", "MANAGE_GUILD", "MANAGE_CHANNELS", "KICK_MEMBERS"])) return message.channel.send(embed3)
        .then(m => m.delete({ timeout: 5000 }));

   banMember.send(`Hi, you have been banned from \n **${message.guild.name}**! \n\n __**Reason:**__ \n ${reason}`).then(() =>
   message.guild.members.ban(banMember, { reason: reason})).catch(err => console.log(err))

    const banned = new MessageEmbed()
    .setTitle("<:SUREbanhammer:716987432230322186> BANNED")
    .setDescription(`User has been banned from this server! \n\n **Reason:** \n ${reason}`)
    .setFooter(`Banned by ${message.author.username}#${message.author.discriminator}`)
    .setTimestamp()
    .setColor(red_light);
    message.delete();
    message.channel.send(banned);

    let embed = new MessageEmbed()
    .setColor(red_light)
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
    .addField("Moderation:", "Ban")
    .addField("Banned:", banMember.user.username)
    .addField("Moderator:", message.author.username)
    .addField("Reason:", reason)
    .addField("Date:", message.createdAt.toLocaleString())
    
        let sChannel = message.guild.channels.cache.find(c => c.name === "logs")
        sChannel.send(embed)
    }
}