const { MessageEmbed } = require("discord.js")
const { orange } = require("../../colours.json");
const db = require("quick.db")
const fun = require("../../botconfig.json")

module.exports = {
    config: {
        name: "fakeban",
        description: "Fakebans mentioned member",
        usage: "ok fakeban",
        category: "fun",
        accessableby: "Members",
    },

    run: async (bot, message, args) => {
        if(message.channel.type === "dm") return;

        let section = db.get(`fun_${message.guild.id}`)
        if(section === null) section = fun;

        if(section === "false") return

        var ban = ["https://media.tenor.com/images/4d8a68b4af4dc2f7817484e2975f6bd3/tenor.gif", "https://media.tenor.com/images/4407c64225a69a85faf0165e04b3aea5/tenor.gif", "https://media.tenor.com/images/593691c5961bd4cb4d095a2c1fe95f17/tenor.gif", "https://media.tenor.com/images/1ba4893d26199a8d79dc11f64175f9cd/tenor.gif", "https://media.tenor.com/images/6d67f8b0deebe100784e4eb7522aee5b/tenor.gif", "https://media.tenor.com/images/bb3154ffce6d4efcd408284b4133ba63/tenor.gif", "https://media.tenor.com/images/ccf60823f9cb33d8831d83981c9225fd/tenor.gif"];
        var random = Math.floor((Math.random() * ban.length));
        let xuser = message.mentions.users.first()
        if(xuser === message.author) {
            const embed = new MessageEmbed()
                .setDescription("You cannot ban yourself!")
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
        .setTitle(`${message.author.username} banned ${xuser.username}`)
        .setImage(ban[random]);
        return message.channel.send(send)

}
}