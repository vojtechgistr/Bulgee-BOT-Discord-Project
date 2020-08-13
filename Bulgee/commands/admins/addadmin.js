const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
	config: {
	   name: "addadmin",
	   aliases: ["aa", "aadmin", "addmod", "am"],
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
	const admin = db.fetch(`admin_${user.id}`);
	if(admin === null) {
		db.set(`admin_${user.id}`, "False");
	}

	if(!user) {
		return message.channel.send(`I can't find this user!`);
	}

	if(admin === "True") {
		return message.channel.send(`${user.tag} is already Bot Admin!`);
	}
	if(admin === "False") {
		db.set(`admin_${user.id}`, "True");
		return message.channel.send(`${user.tag} is now new Bot Admin!`);
	}
  }
}