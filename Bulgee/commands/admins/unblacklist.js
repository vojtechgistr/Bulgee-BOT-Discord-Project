const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
	config: {
	   name: "unblacklist",
	   aliases: ["unbl"],
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
		if(user.bot) return message.channel.send(`Bot cannot be blacklisted..`)
		if(user === admin) {
			return message.channel.send(`Bro.. this user is admin! Admins cannot be blacklisted`);
		}
		if(user.id === message.author.id) {
			return message.channel.send(`You cannot unblacklist yourself, cuz you can't be blacklisted..`);
		}
		let blacklist = await db.fetch(`blacklist_${user.id}`);
		if(blacklist === null) db.set(`blacklist_${user.id}`, "Not");
		

		if(blacklist === "Not") {
			let embed = new MessageEmbed()
				.setDescription(`${user.tag} is not blacklisted!`)
				.setColor('#000000')
				.setTimestamp();
			return message.channel.send(embed);

		} else if(blacklist === "Blacklisted") {

			db.set(`blacklist_${user.id}`, "Not");
			let embed = new MessageEmbed()
				.setDescription(`${user.tag} has been unblacklisted!`)
				.setColor('#000000')
				.setFooter(`By admin: ${message.author.tag}`)
				.setTimestamp();
			message.channel.send(embed)
			db.delete("blacklistedusers", {
				user: user.id
			});
		} else {
		db.set(`blacklist_${user.id}`, "Not");
			let embed = new MessageEmbed()
				.setDescription(`${user.tag} has been unblacklisted!`)
				.setColor('#000000')
				.setFooter(`By admin: ${message.author.tag}`)
				.setTimestamp();
			message.channel.send(embed);
			db.delete("blacklistedusers", {
				user: user.id
			});
}
   }
}
}