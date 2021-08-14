const { orange } = require("../../colours.json");
const fun = require("../../botconfig.json")
const db = require('quick.db');
const { MessageEmbed } = require('discord.js')
var Jimp = require('jimp');

module.exports = {
    config: {
        name: "ainvert",
        usage: "ok ainvert",
        category: "fun",
        accessableby: "Members",
	aliases: ["invert", "invertavatar", "avatarinvert"],
    },

    run: async (bot, message, args) => {
        if(message.channel.type === "dm") return;

        let section = db.get(`fun_${message.guild.id}`)
        if(section === null) section = fun;

        if(section === "false") return

        const member = message.mentions.users.first() || message.member;
 
    let image = await Jimp.read(message.mentions.users.first() ? message.mentions.users.first().avatarURL({format: 'png'}) : message.author.avatarURL({format: 'png'}))
 
    Jimp.read(image).then(image => {
        image.invert().write('avatar.png')

        let embed = new MessageEmbed()
            .setDescription(`${member}'s inverted avatar`);
            message.channel.send(embed);
            message.channel.send({files: ['avatar.png']});
            return;
    })
}
}