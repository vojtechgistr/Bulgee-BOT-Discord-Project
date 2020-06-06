const { MessageEmbed } = require('discord.js');
const { purple_medium } = require('..//..//colours.json')

module.exports = { 
    config: {
        name: "skip",
        aliases: ["next", "s"],
        description: "Skips the song currently playing.",
        accessableby: "Member",
        category: "music",
        usage: "<input>"
    },
    run: (bot, message, args) => {

        let nosongs = new MessageEmbed()
            .setDescription("No song/s currently playing")
            .setColor(purple_medium);

        let voice = new MessageEmbed()
            .setDescription("You need to be in a voice channel to use the skip command")
            .setColor(purple_medium);

        let successfully = new MessageEmbed()
            .setDescription("Skipped the current song")
            .setColor(purple_medium);

        const player = bot.music.players.get(message.guild.id);
        if(!player) return message.channel.send(nosongs);

        if(!message.member.voice.channel || message.member.voice.channel.id !== player.voiceChannel.id) return message.channel.send(voice);

        player.stop();
        return message.channel.send(successfully);
    }
}