const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
	config: {
	   name: "admins",
	   aliases: ["adminlist", "alist"],
	   category: "general",
	},
   run: async (bot, message, args) => {
	let embed = new MessageEmbed()
        .setColor("#576bff")
        .addField("Admins:", `${bot.users.cache.get('484448041609199620').tag}`)
        .setTimestamp()
    return message.channel.send(embed);
      
    }
  }