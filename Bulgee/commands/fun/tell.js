const { MessageEmbed } = require("discord.js")
const db = require("quick.db")
const fun = require("../../botconfig.json")

module.exports = {
    config: {
        name: "tell",
        category: "fun",
        asseccableby: "Members",
        usage: "ok tell",
        aliases: ["say"]
    },
    run: async (bot, message, args) => {

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

        const mess = args.join(" ");
        message.delete().catch(O_o=>{});
        message.channel.send(mess);

    }
}