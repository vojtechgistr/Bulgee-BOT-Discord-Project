const { MessageEmbed } = require('discord.js');
const randompuppy = require("random-puppy");
const { orange } = require("../../colours.json");
const db = require("quick.db")
const fun = require("../../botconfig.json")

module.exports = {
    config: {
        name: "meme",
        usage: "ok meme",
        description: "Sends random meme",
        aliases: ["memes", "mem"],
        accessableby: "Members",
        category: "fun"
    },
    run: async (bot, message, args) => {
        if(message.channel.type === "dm") return;

        let section = db.get(`fun_${message.guild.id}`)
        if(section === null) section = fun;

        if(section === "false") return
        
        const subReddits = ["dankmeme", "meme", "me_irl"];
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];

        const img = await randompuppy(random);
        const embed = new MessageEmbed()
            .setColor(orange)
            .setImage(img);

            message.channel.send(embed);

    }
}