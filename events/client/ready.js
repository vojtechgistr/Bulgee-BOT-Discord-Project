const { ErelaClient, Utils } = require("erela.js");
const { nodes } = require("../../botconfig.json")
const { MessageEmbed } = require('discord.js');
const { purple_medium } = require('../../colours.json')

module.exports = async bot => {
    console.log("-------------------------");
    console.log("    I AM READY TO GO     ");
    console.log("-------------------------");

    bot.music = new ErelaClient(bot, nodes)
    .on("nodeError", console.log)
    .on("nodeConnect", () => console.log("Successfully created a new Node."))
    .on("queueEnd", player => {
        let embed = new MessageEmbed()
        .setDescription("Queue has ended")
        .setColor(purple_medium);

        player.textChannel.send(embed)
        setTimeout(function(){ 
            return bot.music.players.destroy(player.guild.id)
        }, 200000);
    })
    .on("trackStart", ({textChannel}, {title, duration}) => textChannel.send(`Now playing: **${title}** \`${Utils.formatTime(duration, true)}\``));

bot.levels = new Map()
    .set("none", 0.0)
    .set("low", 0.10)
    .set("medium", 0.15)
    .set("high", 0.25);
   
    bot.user.setActivity('ok help | Developed by VojtaG#3107', { type: 'PLAYING'})

}