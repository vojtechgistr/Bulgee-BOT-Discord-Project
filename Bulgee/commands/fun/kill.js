const { MessageEmbed } = require("discord.js")
const { orange } = require("../../colours.json");
const db = require("quick.db")
const fun = require("../../botconfig.json")

module.exports = {
    config: {
        name: "kill",
        description: "Kill mentioned member",
        usage: "ok kill",
        category: "fun",
        accessableby: "Members",
    },

    run: async (bot, message, args) => {
        if(message.channel.type === "dm") return;

        let section = db.get(`fun_${message.guild.id}`)
        if(section === null) section = fun;

        if(section === "false") return

        var kill = ["https://media.tenor.com/images/0b91f4cd9c9e375478b1836572f62f9a/tenor.gif", "https://media.tenor.com/images/6880dffc2f95f820d48633e1e3fc84f1/tenor.gif", "https://media.tenor.com/images/f92abd214f4d288c769d57c2196778c8/tenor.gif", "https://media.tenor.com/images/00d060128615907a3d954f8707e6e937/tenor.gif", "https://media.tenor.com/images/6c6d18c5fa404dc62198f926a617477e/tenor.gif", "https://media.tenor.com/images/6c6d18c5fa404dc62198f926a617477e/tenor.gif", "https://media.tenor.com/images/bef50761d75e855c95cb94139c8c292f/tenor.gif"];
        var random = Math.floor((Math.random() * kill.length));
        let xuser = message.mentions.users.first()
        if(xuser === message.author) {
            const embed = new MessageEmbed()
                .setDescription("You cannot kill yourself!")
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
        .setTitle(`${message.author.username} killed ${xuser.username}`)
        .setImage(kill[random]);
        return message.channel.send(send)

}
}