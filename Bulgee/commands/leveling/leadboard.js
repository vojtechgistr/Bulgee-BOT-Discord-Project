const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const levels = require("../../botconfig.json");
const Enmap = require("enmap");

module.exports = {
	config: {
	   name: "leadboard",
	   usage: "ok leadboard",
	   aliases: ["top", "best", "lb", "leaderboard"],
	   category: "leveling"
},
run: async (bot, message, args) => {
if(message.channel.type === "dm") return;

let section = db.get(`levelsd_${message.guild.id}`)
        if(section === null) section = levels;
      	if(section === "false") return;

    let level = bot.ls.get(`levels-${message.guild.id}`, { sort: '.data'})
    let content = [""];

    for (let i = 0; i < level.length; i++) {
        let user = bot.users.get(level[i].ID.split('-')[2]).username

        content += `#${i+1} ${user} [${level[i].data}]\n`
    
      }

    const embedd = new MessageEmbed()
    .setDescription(`**${message.guild.name}'s Level Leaderboard**\n\n${content}`)
    .setColor("#Jw8dj0");

	return message.channel.send(embedd)
   }
}