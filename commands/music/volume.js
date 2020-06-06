const { MessageEmbed } = require('discord.js');
const { purple_medium } = require('..//..//colours.json')

module.exports = { 
    config: {
        name: "volume",
        aliases: ["vol", "v"],
        description: "Adjusts the volume of the bot.",
        accessableby: "Member",
        category: "music",
        usage: "<input>"
    },
    run: async (bot, message, args) => {

        let nosongs = new MessageEmbed()
            .setDescription("No song/s currently playing")
            .setColor(purple_medium);

        let only = new MessageEmbed()
            .setDescription("You may only set the volume to 1-100")
            .setColor(purple_medium);
        let voice = new MessageEmbed()
            .setDescription("You need to be in a voice channel to change the volume.")
            .setColor(purple_medium);

        const player = bot.music.players.get(message.guild.id);
        let current = new MessageEmbed()
            .setDescription(`Current Volume is **${player.volume}%**`)
            .setColor(purple_medium);

        if (!player) return message.channel.send(nosongs);

        if (!message.member.voice.channel || message.member.voice.channel.id !== player.voiceChannel.id) return message.channel.send(voice);

        if (!args[0]) return message.channel.send(current);
        if (Number(args[0]) <= 0 || Number(args[0]) > 100) return message.channel.send(only);
            let successfully = new MessageEmbed()
            .setDescription(`Successfully set the volume to **${args[0]}%**`)
            .setColor(purple_medium);
        player.setVolume(Number(args[0]));
        return message.channel.send(successfully)
    }
}