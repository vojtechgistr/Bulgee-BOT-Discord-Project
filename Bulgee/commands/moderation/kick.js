const { MessageEmbed } = require("discord.js");
const { red_light } = require("../../colours.json");
const db = require("quick.db");
const moderation = require("../../botconfig.json");
const { default_logs, default_prefix } = require('../../botconfig.json');
const { logs } = require('../../botconfig.json');

module.exports = {
    config: {
        name: "kick",
        usage: "ok kick",
        category: "moderation",
        accessableby: "Administrators",
    },
    run: async (bot, message, args) => {
        if(message.channel.type === "dm") return;

        let section = db.get(`moderation_${message.guild.id}`)
        if(section === null) section = moderation;

        if(section === "false") return
        
const embed1 = new MessageEmbed()
        .setTitle(':X: Error :X:')
        .setDescription("I don't have enough permissions to do this command. \n - Please, give me permission -> ``KICK MEMBERS``")
        .setColor(0xd12828)
        const embed2 = new MessageEmbed()
        .setTitle(':X: Error :X:')
        .setDescription("You don't have enough permissions to do this command. \n - Required permission -> ``KICK MEMBERS``")
        .setColor(0xd12828)
        if(!message.member.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) {
            message.channel.send(embed2)
            .then(m => m.delete({ timeout: 10000 }));
            return message.delete({ timeout: 10000 })
        }
	if(!message.guild.me.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) {
        message.channel.send(embed1)
        .then(m => m.delete({ timeout: 10000 }));
        return message.delete({ timeout: 10000 })
    }

    let kickMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    const embd = new MessageEmbed()
        .setDescription("Please provide a valid user to kick!")
        .setColor(red_light)
    if(!kickMember) {
        message.channel.send(embd)
        .then(m => m.delete({ timeout: 10000 }));
        return message.delete({ timeout: 10000 })
    }

    let reason = args.slice(1).join(" ");
    if(!reason) reason = "- No reason given -";

    const embed4 = new MessageEmbed()
    .setDescription("You can't kick yourself!")
    .setColor(red_light);
    
    if(kickMember.id === message.author.id) {
        message.channel.send(embed4)
        .then(m => m.delete({ timeout: 10000 }));
        return message.delete({ timeout: 10000 })
    }
    const embed3 = new MessageEmbed()
        .setDescription("You can't kick a moderator!")
        .setColor(red_light);

   if(message.guild.member(kickMember).hasPermission(["BAN_MEMBERS", "ADMINISTRATOR", "MANAGE_GUILD", "MANAGE_CHANNELS", "KICK_MEMBERS"])) {
    message.channel.send(embed3)
    .then(m => m.delete({ timeout: 10000 }));
    return message.delete({ timeout: 10000 })
}

try {
    await kickMember.kick();
    await kickMember.send(`Hi, you have been kicked from \n **${message.guild.name}**! \n\n __**Reason:**__ \n ${reason}`);

    message.delete();

    const kicked = new MessageEmbed()
            .setTitle("<:SUREwarning:715481249082245141> KICKED")
            .setDescription(`**${kickMember.user.tag}** has been kicked from this server! \n\n __**Reason:**__ \n ${reason}\n\n[ ${message.author} ]`)
            .setFooter(`Kicked by ${message.author.username}#${message.author.discriminator}`)
            .setTimestamp()
            .setColor(red_light);
            message.channel.send(kicked)
        
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
            .setThumbnail(message.guild.iconURL())
            .addField("Moderation:", "Kick")
            .addField("Kicked:", `${kickMember.user.tag} [${kickMember.id}]`)
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