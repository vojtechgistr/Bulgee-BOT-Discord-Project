const { MessageEmbed } = require("discord.js")
const { orange } = require("../../colours.json");
const db = require("quick.db")
const fun = require("../../botconfig.json")

module.exports = {
    config: {
        name: "pat",
        description: "Pat mentioned member",
        usage: "ok pat",
        category: "fun",
        accessableby: "Members",
    },

    run: async (bot, message, args) => {
        if(message.channel.type === "dm") return;

        let section = db.get(`fun_${message.guild.id}`)
        if(section === null) section = fun;

        if(section === "false") return

        var pat = ["https://media.tenor.com/images/a671268253717ff877474fd019ef73e9/tenor.gif", "https://media.tenor.com/images/89440731dab7b31691c9e035b86c5e62/tenor.gif", "https://media.tenor.com/images/21c1228517cafcd13dff38e2253b4713/tenor.gif", "https://media.tenor.com/images/6cace20a510db73d9051f301c8707b4e/tenor.gif", "https://media.tenor.com/images/40f454db8d7ee7ccad8998479fbabe69/tenor.gif", "https://media.tenor.com/images/87fc4ab2abde188093f9eb0d42698be2/tenor.gif", "https://media.tenor.com/images/da8431374a530ae516c0cc8f966d1c2b/tenor.gif", "https://media.tenor.com/images/b4c1dccb1c11ab8e1e8c1b7f969dfec5/tenor.gif", "https://media.tenor.com/images/ad8357e58d35c1d63b570ab7e587f212/tenor.gif"];
        var random = Math.floor((Math.random() * pat.length));
        let xuser = message.mentions.users.first()
        if(xuser === message.author) {
            const embed = new MessageEmbed()
                .setDescription(`You cannot pat yourself! Ask someone esle :<`)
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
        .setTitle(`${message.author.username} pets ${xuser.username}`)
        .setImage(pat[random]);
        return message.channel.send(send)

}
}