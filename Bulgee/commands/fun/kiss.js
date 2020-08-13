const { MessageEmbed } = require("discord.js")
const { orange } = require("../../colours.json");
const db = require("quick.db")
const fun = require("../../botconfig.json")

module.exports = {
    config: {
        name: "kiss",
        description: "Kisses mentioned member",
        usage: "ok kiss",
        category: "fun",
        accessableby: "Members",
    },

    run: async (bot, message, args) => {
        if(message.channel.type === "dm") return;

        let section = db.get(`fun_${message.guild.id}`)
        if(section === null) section = fun;

        if(section === "false") return

        var pat = ["https://media.tenor.com/images/c9fba5642c0d4984d8c44c8cc62826cd/tenor.gif", "https://media.tenor.com/images/a23d2ec86610bd1dd026a07853992b57/tenor.gif", "https://media.tenor.com/images/924c9665eeb727e21a6e6a401e60183b/tenor.gif", "https://media.tenor.com/images/8235bd87bd417ccd89449b1673e70265/tenor.gif", "https://media.tenor.com/images/0136ddedea728ae27df8fbcd19d680f5/tenor.gif", "https://media.tenor.com/images/0136ddedea728ae27df8fbcd19d680f5/tenor.gif", "https://media.tenor.com/images/9fb52dbfd3b7695ae50dfd00f5d241f7/tenor.gif"];
        var random = Math.floor((Math.random() * pat.length));
        let xuser = message.mentions.users.first()
        if(xuser === message.author) {
            const embed = new MessageEmbed()
                .setDescription(`You cannot kiss yourself! Ask someone esle :<`)
                .setColor(orange)
                return message.channel.send(embed);
            }

        if(!args[0]) {
            const embed = new MessageEmbed()
                .setDescription("Please mention someone!")
                .setColor(orange)
                return message.channel.send(embed);
            }

        if(!xuser) {
        const embed2 = new MessageEmbed()
            .setDescription("I can't find this user!")
            .setColor(orange)
            return message.channel.send(embed2);
        }


        const send = new MessageEmbed()
        .setTitle(`${message.author.username} kisses ${xuser.username}`)
        .setImage(pat[random]);
        return message.channel.send(send)

}
}