const { MessageEmbed } = require("discord.js");
const { orange } = require("../../colours.json");
const db = require("quick.db");
const fun = require("../../botconfig.json");
module.exports = {
    config: {
        name: "avatar",
        usage: "ok avatar",
        category: "fun",
        accessableby: "Members",
    },

    run: async (bot, message, args) => {
        if(message.channel.type === "dm") return;

        let section = db.get(`fun_${message.guild.id}`)
        if(section === null) section = fun;

        if(section === "false") return;

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

	let embed = new MessageEmbed()
        .setDescription(`I can't send you bot's avatar!`)
	.setColor(orange);

	if(user.user.bot) return message.channel.send(embed);


        let send = new MessageEmbed()
        .setTitle(`${user.user.username}'s avatar`)
        .setImage(user.user.displayAvatarURL({dynamic : true}))
	.setColor(orange);
        return message.channel.send(send);

}
}