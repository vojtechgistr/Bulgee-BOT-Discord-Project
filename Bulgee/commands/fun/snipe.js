const { MessageEmbed } = require('discord.js');
const { orange } = require("../../colours.json");
const db = require("quick.db")
const fun = require("../../botconfig.json")

module.exports = {
    config: {
        name: "snipe",
        usage: "ok snipe",
        category: "fun",
        accessableby: "Members",
    },

    run: async (bot, message, args) => {
        if(message.channel.type === "dm") return;

        let section = db.get(`fun_${message.guild.id}`)
        if(section === null) section = fun;

        if(section === "false") return;
	
	const msg = bot.snipes.get(message.channel.id);
	if(!msg) return message.channel.send(`Here is nothing to snipe!`);
	const embw = new MessageEmbed()
		.setAuthor(`HAH! ${msg.author.tag} got snipe!`, msg.author.displayAvatarURL({ dynamic: true, size: 256 }))
        	.setDescription(msg.content)
		.setTimestamp()
		.setColor(orange);
		if(msg.image) embw.setImage(msg.image)
	return message.channel.send(embw);
}
}