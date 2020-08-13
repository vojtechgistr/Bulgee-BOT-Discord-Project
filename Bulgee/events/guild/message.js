const { default_prefix } = require('../../botconfig.json')
const db = require("quick.db")
const { MessageEmbed } = require('discord.js')

module.exports = async (bot, message) => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = db.get(`prefix_${message.guild.id}`)
        if(prefix === null) prefix = default_prefix;


    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    if(!message.content.toLowerCase().startsWith(prefix)) return;
    let blacklist = await db.fetch(`blacklist_${message.author.id}`)
	let em = new MessageEmbed()
		.setTitle(`<:Blacklisted:725276034706178099> Sorry, but you are on the blacklist!`)
		.setDescription(`__Probable causes__:\n• Rule violation\n• Bug abusing\n• TOS Violation\n\nIf this didn't help you, contact our Bot Admins!`)
		.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
		.setColor('#000000')
		.setThumbnail(message.author.displayAvatarURL({ dynamic: true }));
    if(blacklist === "Blacklisted") return message.channel.send(em);
    
    let commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd))
    if(commandfile) commandfile.run(bot, message, args)
}