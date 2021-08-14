const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const { red_light } = require('../../botconfig.json');
const moderation = require("../../botconfig.json");
const { default_logs } = require('../../botconfig.json');
const { logs } = require('../../botconfig.json');

module.exports = {
    config: {
        name: "warn",
        description: "Warns mentioned member",
        usage: "ok warn",
        category: "moderation",
        accessableby: "Administrators",
    },
  run: async(bot, message, args) => {
	if(message.channel.type === "dm") return;
	if(message.author.bot) return;

        let section = db.get(`moderation_${message.guild.id}`)
        if(section === null) section = moderation;

        if(section === "false") return

message.delete()

    const embed1 = new MessageEmbed()
            .setTitle(':X: Error :X:')
            .setDescription("I don't have enough permissions to do this command. \n Please, give me permission -> ``MANAGE MESSAGES``")
            .setColor(0xd12828)
            const embed2 = new MessageEmbed()
            .setTitle(':X: Error :X:')
            .setDescription("You don't have enough permissions to use this command. \n - Required permission -> ``MANAGE MESSAGES``")
            .setColor(0xd12828)
                if (!message.guild.member(bot.user).hasPermission('MANAGE_MESSAGES')) return message.channel.send(embed1)
            message.delete({ timeout: 5000 });
                if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(embed2)

        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])

	const embd = new MessageEmbed()
        .setDescription("Please provide a valid user!")
        .setColor(red_light);
    if(!user) return message.channel.send(embd).then(m => m.delete({ timeout: 7000 }));

        const embed4 = new MessageEmbed()
            .setDescription("You can't warn yourself!")
            .setColor(red_light);
    
        if(user.id === message.author.id) return message.channel.send(embed4).then(m => m.delete({ timeout: 7000 }));

	const embed5 = new MessageEmbed()
            .setDescription("You can't warn a bot!")
            .setColor(red_light);
    
        if(user.id === bot.user.id) return message.channel.send(embed5).then(m => m.delete({ timeout: 7000 }));

        const embed3 = new MessageEmbed()
                .setDescription("You can't warn a moderator!")
                .setColor(red_light)
        if(message.guild.member(user).hasPermission(["BAN_MEMBERS", "ADMINISTRATOR", "MANAGE_GUILD", "MANAGE_CHANNELS", "KICK_MEMBERS", "MANAGE_MESSAGES"])) 		return message.channel.send(embed3).then(m => m.delete({ timeout: 7000 }));

	let reason = args.slice(1).join(" ");
	if(!reason) reason = "- No reason given -";

		const emb = new MessageEmbed()
                    .setTitle(`<:SUREwarning:715481249082245141> Warning`)
		    .setDescription(`${user.user.tag} **has been warned - Reason:**\n${reason}`)
		    .setColor(red_light)
		    .setTimestamp();

                message.channel.send(emb);

	let channellog = db.get(`logging_${message.guild.id}`)
            if(channellog === null) {
                channellog = default_logs;
            }
            if(channellog === "none") return;
            
        let section2 = db.get(`logs_${message.guild.id}`)
        if(section2 === null) section2 = logs;
        if(section2 === "false") return;
    let embeddw = new MessageEmbed()
    .setColor(red_light)
    .setAuthor(`Modlogs`)
    .setThumbnail(message.guild.iconURL())
    .addField("Moderation:", "Warn")
    .addField("Warned:", `${user.user.tag} [${user.user.id}]`)
    .addField("Moderator:", message.author.tag)
    .addField("Reason:", reason)
    .addField("Date:", message.createdAt.toLocaleString())

    let lawdw = message.guild.channels.cache.get(channellog);
              return lawdw.send(embeddw);

  }
}