const { MessageEmbed } = require("discord.js")
const { orange } = require("../../colours.json");
const db = require("quick.db")
const fun = require("../../botconfig.json")

module.exports = {
    config: {
        name: "slap",
        description: "Slap mentioned member",
        usage: "ok slap",
        category: "fun",
        accessableby: "Members",
    },

    run: async (bot, message, args) => {
        if(message.channel.type === "dm") return;

        let section = db.get(`fun_${message.guild.id}`)
        if(section === null) section = fun;

        if(section === "false") return

        var slap = ["https://media.tenor.com/images/a5a49125c87a23d61bda212c1a455dda/tenor.gif", "https://media.tenor.com/images/c6635cfd8a49166f214a872d35da82c4/tenor.gif", "https://media.tenor.com/images/47698b115e4185036e95111f81baab45/tenor.gif", "https://media.tenor.com/images/53b846f3cc11c7c5fe358fc6d458901d/tenor.gif", "https://media.tenor.com/images/091e0502e5fda1201ee76f5f26eea195/tenor.gif", "https://media.tenor.com/images/49b0ce2032f6134c31e1313cb078fe5a/tenor.gif", "https://media.tenor.com/images/47a6be1fbc1c40c3a55c0e2c8b725603/tenor.gif", "https://media.tenor.com/images/14a6bfa33517654ab84519eb3af19b57/tenor.gif", "https://media.tenor.com/images/79c666d38d5494bad25c5c023c0bbc44/tenor.gif", "https://media.tenor.com/images/c8832c9d5596ed9e6297c947047b584d/tenor.gif", "https://media.tenor.com/images/2b983ab0ddc99168b33e18fd1c9b200f/tenor.gif"];
        var random = Math.floor((Math.random() * slap.length));
        let xuser = message.mentions.users.first()

        if(xuser === message.author) {
            const embed = new MessageEmbed()
                .setDescription("You cannot slap yourself!")
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
        .setTitle(`${message.author.username} slaps ${xuser.username}`)
        .setImage(slap[random]);
        return message.channel.send(send)

}
}