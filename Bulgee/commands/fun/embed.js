const { MessageEmbed } = require("discord.js")
const { orange } = require("../../colours.json");
const db = require("quick.db")
const fun = require("../../botconfig.json")

module.exports = {
    config: {
        name: "embed",
	usage: "ok embed",
        category: "fun",
        accessableby: "Members",
    },

    run: async (bot, message, args) => {
        if(message.channel.type === "dm") return;

        let section = db.get(`fun_${message.guild.id}`)
        if(section === null) section = fun;

        if(section === "false") return

	const embed1 = new MessageEmbed()
        .setTitle(':X: Error :X:')
        .setDescription("I don't have enough permissions to do this command. \n Please, give me permission -> ``MANAGE MESSAGES``")
        .setColor(0xd12828)
        const embed2 = new MessageEmbed()
        .setTitle(':x: Error :x:')
        .setDescription("You don't have enough permissions to use this command. \n - Required permission -> ``MANAGE MESSAGES``")
        .setColor(0xd12828)
            if (!message.guild.member(bot.user).hasPermission(['MANAGE_MESSAGES'])) {
	message.channel.send(embed1)
            .then(m => m.delete({ timeout: 5000 }));
        return message.delete({ timeout: 5000 });
}
            if (!message.member.hasPermission("MANAGE_MESSAGES")) {
	message.channel.send(embed2)
            .then(m => m.delete({ timeout: 5000 }));
        return message.delete({ timeout: 5000 });
}

        let mess = args.slice(0).join(" ")
    	if(!mess) return;
	
	let embed = new MessageEmbed()
		.setDescription(mess)
        return message.channel.send(embed)

}
}