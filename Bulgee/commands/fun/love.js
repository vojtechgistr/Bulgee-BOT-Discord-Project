const { MessageEmbed } = require("discord.js")
const { orange } = require("../../colours.json");
const db = require("quick.db")
const fun = require("../../botconfig.json")

module.exports = {
    config: {
        name: "love",
        usage: "ok love",
        category: "fun",
        accessableby: "Members",
    },

    run: async (bot, message, args) => {
        if(message.channel.type === "dm") return;

        let section = db.get(`fun_${message.guild.id}`)
        if(section === null) section = fun;

        if(section === "false") return

        var random = Math.floor((Math.random() * + 241));
        
        var love = ["https://media.tenor.com/images/618f7f69e26c56dd92b5f0e16d163946/tenor.gif", "https://media.tenor.com/images/e9308b0dfe3281150db831f86c4035aa/tenor.gif", "https://media.tenor.com/images/09289c7f63f219192234e1235349493b/tenor.gif", "https://media.tenor.com/images/ddf39591e3d3ce1829b1016f770ae15b/tenor.gif", "https://media.tenor.com/images/816ebcd1165532d7a72027c331faed90/tenor.gif"]
        var randomly = Math.floor((Math.random() * + love.length));

        let xuser = message.mentions.users.first()
        if(xuser === message.author) {
            const embed = new MessageEmbed()
                .setDescription(`${message.author} loves himself for ${random}<:SURElovinghearts:720338249641361410>`)
                .setImage(love[randomly])
                .setColor(orange);
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
        .setDescription(`${message.author} loves ${xuser} for ${random}<:SURElovinghearts:720338249641361410>`)
        .setImage(love[randomly]);
        return message.channel.send(send)

}
}