const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    config: {
  name: "bot-admininfo",
  aliases: ["bai"],
  category: "owner",
    },
  run: async (bot, message, args) => {
    const admin = db.get(`admin_${message.author.id}`);
	if(admin === null) {
		db.set(`admin_${message.author.id}`, "False");
	}

    if(admin === "False") return message.react('❌');
    
    if(admin === "True") {

        message.channel.send(`**__Total servers__**: \n${bot.guilds.cache.size}\n\n**__Total Users__**: \n${bot.users.cache.size}\nBot id: 670963766850224159\n`)
  }
}
}