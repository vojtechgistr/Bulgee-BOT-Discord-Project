const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
	config: {
        name: "removeadmin",
        aliases: ["radmin", "ra", "removemod", "rm"],
        category: "admins",
     },
   run: async (bot, message, args) => {
	if (message.author.id !== "484448041609199620") {
		message.react('❌');
	return message.channel.send(`Only Owner of this bot can add Admins!`)
	}
	
	if(!args[0]) {
		return message.channel.send(`Please enter some id or mention`)
	}
	
	let user = bot.users.cache.get(args[0])
	const admin = db.get(`admin_${user.id}`);
	if(admin === null) {
		db.set(`admin_${user.id}`, "False");
	}

	if(!user) {
		return message.channel.send(`I can't find this user!`);
	}

	if(admin === "False") {
		return message.channel.send(`${user.tag} is not Bot Admin!`);
	}
	if(admin === "True") {
		db.set(`admin_${user.id}`, "False");
		return message.channel.send(`${user.tag} is no longer Admin.`);
	}
  }
}