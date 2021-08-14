const { MessageEmbed } = require("discord.js")
const { orange } = require("../../colours.json");
const db = require("quick.db")
const fun = require("../../botconfig.json")

module.exports = {
    config: {
        name: "8ball",
        usage: "ok 8ball",
        category: "fun",
        aliases: ["ball", "magicball", "eightball"],
        accessableby: "Members",
    },

    run: async (bot, message, args) => {
        if(message.channel.type === "dm") return;

        let section = db.get(`fun_${message.guild.id}`)
        if(section === null) section = fun;

        if(section === "false") return

        const embedaw = new MessageEmbed()
        .setDescription(`Please ask a full question!`)

        if(!args[1]) return message.channel.send(embedaw)
        let replies = ["Yes", "No", "I don't know", "I don't care", "Ask me later", "Definitely"];

        let result = Math.floor((Math.random() * replies.length));
        let question = args.slice(0).join(" ");

      const embed = new MessageEmbed()
        .addField(`__Question__:`, question)
        .addField(`__Answer__:`, replies[result])
        .setColor(orange)

      message.channel.send(embed)
    
}
}