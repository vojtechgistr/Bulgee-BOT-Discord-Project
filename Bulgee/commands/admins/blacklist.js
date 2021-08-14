const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
	config: {
	   name: "blacklist",
	   aliases: ["bl"],
	   category: "admins",
	},
   run: async (bot, message, args) => {

	const admin = db.fetch(`admin_${message.author.id}`);
	if(admin === null) {
		db.set(`admin_${message.author.id}`, "False");
	}


	if (admin === "False") return message.react('❌');

	if (admin === "True") {
		const user = bot.users.cache.get(args[0]);
		if(!user) return message.channel.send(`Please provide valid user id`);
		if(user.bot) return message.channel.send(`You cannot blacklist a bot..`)
		if(user === admin) {
			return message.channel.send(`Bro.. this user is admin!`);
		}
		if(user.id === message.author.id) {
			return message.channel.send(`You cannot blacklist yourself..`);
		}
		let blacklist = await db.fetch(`blacklist_${user.id}`);
		if(blacklist === null) db.set(`blacklist_${user.id}`, "Not");

		if(blacklist === "Blacklisted") {
			let embed = new MessageEmbed()
				.setDescription(`${user.tag} is already blacklisted!`)
				.setColor('#000000')
				.setTimestamp();
			return message.channel.send(embed)
		}

		if(blacklist === "Not") {
			db.set(`blacklist_${user.id}`, "Blacklisted");
			let embed = new MessageEmbed()
				.setDescription(`${user.tag} has been blacklisted!`)
				.setColor('#000000')
				.setFooter(`By admin: ${message.author.tag}`)
				.setTimestamp();
			message.channel.send(embed);
			db.push("blacklistedusers", {
				user: user.id
			});
			return;

		} else {
		db.set(`blacklist_${user.id}`, "Blacklisted");
			let embed = new MessageEmbed()
				.setDescription(`${user.tag} has been blacklisted!`)
				.setColor('#000000')
				.setFooter(`By admin: ${message.author.tag}`)
				.setTimestamp();
			message.channel.send(embed);

			db.push("blacklistedusers", {
				user: user.id
			});
			return;
	}
}
}
}