const { MessageEmbed } = require("discord.js");
const { red_light } = require("../../colours.json");
const db = require("quick.db");
const moderation = require("../../botconfig.json");
const { defaul_logs } = require("../../botconfig.json");
const { defaul_prefix } = require("../../botconfig.json");
const { logs } = require("../../botconfig.json");

module.exports = {
    config: {
        name: "ban",
        description: "Bans a user from the guild!",
        usage: "ok ban",
        category: "moderation",
        accessableby: "Administrators",
    },
    run: async (bot, message, args) => {
        if(message.channel.type === "dm") return;

        let section = db.get(`moderation_${message.guild.id}`)
        if(section === null) section = moderation;

        if(section === "false") return;

        const embed1 = new MessageEmbed()
        .setTitle(':X: Error :X:')
        .setDescription("I don't have enough permissions to do this command. \n - Please, give me permission -> ``BAN MEMBERS``")
        .setColor(0xd12828)

        const embed2 = new MessageEmbed()
        .setTitle(':X: Error :X:')
        .setDescription("You don't have enough permissions to do this command. \n - Required permission -> ``BAN MEMBERS``")
        .setColor(0xd12828)

    if(!message.member.hasPermission(["BAN_MEMBERS"])) {
        message.channel.send(embed2)
        .then(m => m.delete({ timeout: 10000 }));
        return message.delete({ timeout: 10000 });
    }
        if(!message.guild.me.hasPermission(["BAN_MEMBERS"])) {
            message.channel.send(embed1)
            .then(m => m.delete({ timeout: 10000 }));
            return message.delete({ timeout: 10000 });
        }


        
   let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])

   const noreason = new MessageEmbed()
    .setDescription("Please provide a valid user to ban!")

   if(!banMember) {
    message.channel.send(noreason)
    .then(m => m.delete({ timeout: 10000 }));
    return message.delete({ timeout: 10000 });
}

   let reason = args.slice(1).join(" ");
   if(!reason) reason = "No reason given!"

   const embed4 = new MessageEmbed()
        .setDescription("You can't ban yourself!")

   if(banMember.id === message.author.id) {
    message.channel.send(embed4)
    .then(m => m.delete({ timeout: 10000 }));
    return message.delete({ timeout: 10000 });
}

   const embed3 = new MessageEmbed()
        .setDescription("You can't ban a moderator!")

   if(message.guild.member(banMember).hasPermission(["BAN_MEMBERS", "ADMINISTRATOR", "MANAGE_GUILD", "MANAGE_CHANNELS", "KICK_MEMBERS"])) {
    message.channel.send(embed3)
    .then(m => m.delete({ timeout: 10000 }));
    return message.delete({ timeout: 10000 });
}

try {
    await message.guild.members.ban(banMember, { reason: reason})
    await banMember.send(`Hi, you have been banned from \n **${message.guild.name}**! \n\n __**Reason:**__ \n ${reason}`)
   const banned = new MessageEmbed()
   .setTitle("<:SUREbanhammer:716987432230322186> BANNED")
   .setDescription(`User has been banned from this server! \n\n **Reason:** \n ${reason}\n\n[ ${message.author} ]`)
   .setFooter(`Banned by ${message.author.username}#${message.author.discriminator}`)
   .setTimestamp()
   .setColor(red_light);
   message.channel.send(banned);

       let channellog = db.get(`logging_${message.guild.id}`)
           if(channellog === null) {
               channellog = default_logs;
           }
           if(channellog === "none") return;
           
       let section2 = db.get(`logs_${message.guild.id}`) //section logs - on/off
       if(section2 === null) section2 = logs;
       if(section2 === "false") return;
   let embeddw = new MessageEmbed()
   .setColor(red_light)
   .setAuthor(`Modlogs`)
   .addField("Moderation:", "Ban")
   .setThumbnail(message.guild.iconURL())
   .addField("Banned:", `${banMember.user.tag} [${banMember.id}]`)
   .addField("Moderator:", message.author.tag)
   .addField("Reason:", reason)
   .addField("Date:", message.createdAt.toLocaleString())
   
   let lawdw = message.guild.channels.cache.get(channellog)
   lawdw.send(embeddw)
    } catch(err) {
        const embed33 = new MessageEmbed()
        .setDescription(`I don't have enough permissions to do this.. Maybe my role is below user's role, please fix it.`)

        return message.channel.send(embed33);
    }
}
}