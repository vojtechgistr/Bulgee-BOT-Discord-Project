const { MessageEmbed } = require("discord.js")
const { orange } = require("../../colours.json");
const db = require("quick.db")
const fun = require("../../botconfig.json")

module.exports = {
    config: {
        name: "hug",
        description: "Hug mentioned member",
        usage: "ok hug",
        category: "fun",
        accessableby: "Members",
    },

    run: async (bot, message, args) => {
        if(message.channel.type === "dm") return;

        let section = db.get(`fun_${message.guild.id}`)
        if(section === null) section = fun;

        if(section === "false") return

        var hug = ["https://media.tenor.com/images/5829c20ecce80dedec8a42537d32292e/tenor.gif", "https://media.tenor.com/images/77e8054be837ddc5f4facccddc4c10fe/tenor.gif", "https://media.tenor.com/images/7a6c91842f8b2871ecf5234bcd095da7/tenor.gif", "https://media.tenor.com/images/b5bc982d3a21d3bf765e6f69db5af360/tenor.gif", "https://media.tenor.com/images/8c39fcbbef6d5332ad0e44e6346bb7ac/tenor.gif", "https://media.tenor.com/images/a0255ad840bc7f700cf730519b966fdc/tenor.gif", "https://media.tenor.com/images/cb44fa579df860cf65786ec1a1b486c3/tenor.gif", "https://media.tenor.com/images/934adba8e5516096e526f955458ec94a/tenor.gif", "https://media.tenor.com/images/ca88f916b116711c60bb23b8eb608694/tenor.gif", "https://media.tenor.com/images/eed8d1a51f647b4be696879a0ad6f1f1/tenor.gif", "https://media.tenor.com/images/c2e5126c39ad5f3a1a2ae31f3e784da8/tenor.gif", "https://media.tenor.com/images/d7f6849b07da0532c7dc3aab538d42d4/tenor.gif", "https://media.tenor.com/images/bb67bef5f54d0191b7e2d3c1fd6e4bd3/tenor.gif", "https://media.tenor.com/images/778282e02d511fbc061e1439a5105c6f/tenor.gif"];
        var random = Math.floor((Math.random() * hug.length));
        let xuser = message.mentions.users.first()
        if(xuser === message.author) {
            const embed = new MessageEmbed()
                .setDescription(`Hey guys! ${message.author} needs a hug :<`)
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
        .setTitle(`${message.author.username} hugs ${xuser.username}`)
        .setImage(hug[random]);
        return message.channel.send(send)

}
}