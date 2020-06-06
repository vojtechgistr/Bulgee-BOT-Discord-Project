const { MessageEmbed, Discord } = require("discord.js")
const { red_light } = require("../../colours.json");

module.exports = {
    config: {
        name: "unban",
        description: "Unban a user from the guild!",
        usage: "ok unban",
        category: "moderation",
        accessableby: "Administrators",
    },
    run: async (bot, message, args) => {

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
        if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send(embed1)

	const id = new MessageEmbed()
      .setTitle(":X: Error :X:")
      .setDescription("You need to provide an ID.")
      .setTimestamp()
      .setColor(red_light);

    const idprovide = new MessageEmbed()
      .setTitle(":X: Error :X:")
      .setDescription("Please provide a user id to unban someone!")
      .setTimestamp()
      .setColor(red_light);

    
  if(isNaN(args[0])) return message.channel.send(id)

    let bannedMember = await bot.users.fetch(args[0])
        if(!bannedMember) return message.channel.send(idprovide)

    let reason = args.slice(1).join(" ")
        if(!reason) reason = "- No reason given -"

    if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send(embed2)
    const embed4 = new MessageEmbed()
    .setDescription("You're not banned!")
    .setColor(red_light)
if(bannedMember.id === message.author.id) return message.channel.send(embed4).then(m => m.delete({ timeout: 5000 }));
    message.delete()
    try {
    const unbanned = new MessageEmbed()
        .setTitle("<:SUREbanhammer:716987432230322186> UNBANNED <:SUREbanhammer:716987432230322186>")
        .setDescription(`${bannedMember.tag} has been unbanned from this server!`)
        .setFooter(`UnBanned by ${message.author.username}#${message.author.discriminator}`)
        .setTimestamp()
        .setColor(red_light);
        message.delete();
        message.guild.members.unban(bannedMember, reason).catch(error => {
            
        if (error.code === 10026) {
            let dwnj = new MessageEmbed()
            .setDescription("This user is not banned!")
            .setColor(red_light)
            return message.channel.send(dwnj).then(m => m.delete({ timeout: 5000 }));
        } else if (error.code !== 10026) {
            message.channel.send(unbanned)
        }
        
        })
}catch(err) {
    
}
    }
}