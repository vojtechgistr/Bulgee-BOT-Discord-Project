const { MessageEmbed } = require("discord.js")
const { orange } = require("../../colours.json");
const db = require("quick.db")
const fun = require("../../botconfig.json")

module.exports = {
    config: {
        name: "wave",
        usage: "ok wave",
        category: "fun",
        accessableby: "Members",
    },

    run: async (bot, message, args) => {
        if(message.channel.type === "dm") return;

        let section = db.get(`fun_${message.guild.id}`)
        if(section === null) section = fun;

        if(section === "false") return

        var wave = ["https://media.tenor.com/images/b5e6535437f98c48eaefea445b097668/tenor.gif", "https://media.tenor.com/images/b56d184f2309f8e1f256205131a0f2e1/tenor.gif", "https://media.tenor.com/images/97c9e4d9bbfeb8920b6d1ea8934b3515/tenor.gif", "https://media.tenor.com/images/3fbae3954123a7815bd235f87eeb2ad3/tenor.gif", "https://media.tenor.com/images/fe3e2d08c49445ca807935eba60e5627/tenor.gif", "https://media.tenor.com/images/65c0b998788aa521be3d2ecab8cdaee0/tenor.gif", "https://media.tenor.com/images/73ce6a152fdf3fa2645f6153c646c9b7/tenor.gif", "https://media.tenor.com/images/824a5c6fb0eff4de202d0cd4da1e6692/tenor.gif", "https://media.tenor.com/images/250fc8aacb8c89b4b3b8a0384a3df4ea/tenor.gif"];
        var random = Math.floor((Math.random() * wave.length));
        let xuser = message.mentions.users.first()
        if(xuser === message.author) {
            const embed = new MessageEmbed()
                .setDescription(`Wth bro how could you do that? >:c`)
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
        .setDescription(`${message.author.username} is waving ${xuser.username}`)
        .setImage(wave[random]);
        return message.channel.send(send)

}
}