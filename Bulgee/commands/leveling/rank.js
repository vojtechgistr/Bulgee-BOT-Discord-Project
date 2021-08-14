const { createCanvas, loadImage} = require('canvas');
const db = require('quick.db');
const levels = require("../../botconfig.json")
const { MessageAttachment, MessageEmbed } = require('discord.js');
const { join } = require('path');
const Enmap = require("enmap");

module.exports = {
	config: {
	   name: "rank",
	   usage: "ok rank",
	   category: "leveling",
	   aliases: ["level"]
},
run: async (bot, message, args) => {
	if(message.channel.type === "dm") return;
	
    let section = db.get(`levelsd_${message.guild.id}`)
        if(section === null) section = levels;

		if(section === "false") return;

		const embed1 = new MessageEmbed()
        .setTitle(':X: Error :X:')
        .setDescription("I don't have enough permissions to do this command. \n Please, give me permission -> ``ATTACH FILES``")
        .setColor(0xd12828)
		if(!message.guild.me.hasPermission('ATTACH_FILES')) return message.channel.send(embed1);
		
	const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

	const key = `${message.guild.id}-${member.id}`;
	const data = bot.ls.get(key);
if(!data) {
	let section = db.get(`levelsd_${message.guild.id}`)
        if(section === null) section = levels;

		if(section === "false") return;

		return message.reply("This user doesn't have a rank!")
}

const canvas = createCanvas(1000, 333);
const ctx = canvas.getContext("2d");
const background = await loadImage(join(__dirname, "../..", "img", "background.png"));

ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

ctx.beginPath();
ctx.lineWidth = 4
ctx.globalAlpha = 0.2;
ctx.strokeStyle = "#0h6sfc";
ctx.fillStyle = "#ffffff";
ctx.fill();
ctx.globalAlpha = 0.4;
ctx.strokeRect(180, 216, 770, 65);
ctx.stroke();

ctx.globalAlpha = 0.7;
ctx.strokeStyle = "#a4dedc";
ctx.strokeRect(320, 125, 600, 1);

ctx.fillStyle = "#a103fc";
ctx.globalAlpha = 0.6;
ctx.strokeStyle = "#0h6sfc";
ctx.fillRect(180, 216, ((100 / (data.level * 40)) * data.xp) * 7.7, 65);
ctx.globalAlpha = 1;

ctx.font = "30px Arial";
ctx.textAlign = "center";
ctx.fillStyle = "#a4dedc";
ctx.fillText(`${data.xp} / ${data.level * 40} XP`, 600, 260);
ctx.stroke()

ctx.fillStyle = "#ffffff";
ctx.textAlign = "center";
ctx.font = "50px Arial";
ctx.stroke()
ctx.srokeStyle = "#ffffff"
ctx.fillText(member.user.username, 620, 100);

ctx.fillStyle = "#989c97";
ctx.font = "42px Arial";
ctx.textAlign = "left";
ctx.fillText("Level", 320, 200);
ctx.font = "45px Arial";
ctx.fillText(data.level, 487, 200);

ctx.arc(170, 160, 120, 0, Math.PI * 2, true);
ctx.lineWidth = 6;
ctx.stroke();
ctx.closePath();
ctx.clip();
const avatar = await loadImage(member.user.displayAvatarURL({ format: "jpg" }));
ctx.drawImage(avatar, 40, 40, 250, 250);

const attachment = new MessageAttachment(canvas.toBuffer(), "rank.png");
message.channel.send(attachment);

}
}