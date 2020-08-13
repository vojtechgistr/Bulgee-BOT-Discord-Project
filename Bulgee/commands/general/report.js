const { MessageEmbed } = require("discord.js")
const { red_light } = require("../../colours.json");
const db = require("quick.db")
const basic = require("../../botconfig.json")

module.exports = {
    config: {
        name: "report",
        usage: "ok report",
        category: "basic",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        if(message.channel.type === "dm") return;

        let section = db.get(`basic_${message.guild.id}`)
        if(section === null) basics = basic;

        if(section === "false") return
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
	message.delete();
    const embd = new MessageEmbed()
        .setDescription("Please provide a valid user to report!")
        .setColor(red_light)
    if(!user) return message.channel.send(embd).then(m => m.delete({ timeout: 7000 }));

const embed5 = new MessageEmbed()
            .setDescription("You can't report a bot!")
            .setColor(red_light);
    
        if(user.id === bot.user.id) return message.channel.send(embed5).then(m => m.delete({ timeout: 7000 }));


const embed4 = new MessageEmbed()
    .setDescription("You can't report yourself!")
    .setColor(red_light)
    
    if(user.id === message.author.id) return message.channel.send(embed4).then(m => m.delete({ timeout: 7000 }));

	const provide = new MessageEmbed()
		.setDescription(`Please provide a reason!`)
		.setColor(red_light);

    let reason = args.slice(1).join(" ");
    if(!reason) return message.channel.send(provide);

	const owner = message.guild.owner

    owner.send(`Hi! **${message.author.tag}** reported **${user.user.tag}** on your server ( ${message.guild.name} )!\n\n__**Report:**__\n${reason}`);
    user.send(`Hi, you has been reported by **${message.author.tag}** on **${message.guild.name}**! \n\n __**Report:**__ \n ${reason}`);

    const reported = new MessageEmbed()
    .setTitle("<:SUREwarning:715481249082245141> REPORT")
    .setDescription(`**${user.user.tag}** has been reported!\n\n __**Report:**__ \n ${reason}`)
    .setFooter(`Reported by ${message.author.tag}`)
    .setTimestamp()
    .setColor(red_light);
    message.channel.send(reported)

    const logs = require('../../botconfig.json') //
    const default_logs = require('../../botconfig.json') //default logs channel
message.delete()
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
    .addField("Moderation:", "Report")
    .addField("Reported:", `${user.user.tag} [${user.user.id}]`)
    .addField("Member:", message.author.tag)
    .addField("Report:", reason)
    .addField("Date:", message.createdAt.toLocaleString())

    let lawdw = message.guild.channels.cache.get(channellog)
              return lawdw.send(embeddw)
    }
}