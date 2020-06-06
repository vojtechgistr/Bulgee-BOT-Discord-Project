const { Discord, MessageEmbed } = require("discord.js")

module.exports = {
    config: {
        name: "mutevoice",
        description: "Mute all users in Voice Channel!",
        usage: "ok mutevoice",
        category: "moderation",
        accessableby: "Administrators",
        aliases: ["voicemute", "vm", "mv"]
    },
    run: async (bot, message, args) => {

        const embed1 = new MessageEmbed()
        .setTitle(':x: Error :x:')
        .setDescription("I don't have enough permissions to do this command. \n - Please, give me permission -> ``BAN MEMBERS``")
        .setColor(0xd12828)
        .setTimestamp();
        const embed2 = new MessageEmbed()
        .setTitle(':x: Error :x:')
        .setDescription("You don't have enough permissions to do this command. \n - Required permission -> ``BAN MEMBERS``")
        .setColor(0xd12828)
        .setTimestamp();
        if(!message.member.hasPermission(["MANAGE_CHANNELS", "ADMINISTRATOR"])) return message.channel.send(embed1)
            .then(m => m.delete({ timeout: 5000 }));
            message.delete({ timeout: 5000 });

        if(!message.guild.me.hasPermission(["MANAGE_CHANNELS", "ADMINISTRATOR"])) return message.channel.send(embed2)
            .then(m => m.delete({ timeout: 5000 }));
            message.delete({ timeout: 5000 });


        let channel = message.member.voice.channel;
        for (let member of channel.members) {
            member[1].setMute
        }
    }
}