const { MessageEmbed } = require('discord.js');
const { purple_medium } = require('..//..//colours.json')

module.exports = { 
    config: {
        name: "pause",
        aliases: ["resume"],
        description: "Makes the bot pause/resume the music currently playing.",
        accessableby: "Member",
        category: "music",
    },
    run: (bot, message, args) => {
        let nosongs = new MessageEmbed()
            .setDescription("No song/s currently playing")
            .setColor(purple_medium);

        let voice = new MessageEmbed()
            .setDescription("You need to be in a voice channel to pause music")
            .setColor(purple_medium);

        const player = bot.music.players.get(message.guild.id);
        
        if (!player) return message.channel.send(nosongs)

        if (!message.member.voice.channel || message.member.voice.channel.id !== player.voiceChannel.id) return message.channel.send(voice);
        
        let successfully = new MessageEmbed()
        .setDescription(`${player.playing ? "▶️ Player is now paused" : "⏸️ Player is now resumed"}`)
        .setColor(purple_medium);

        player.pause(player.playing);
        return message.channel.send(successfully);
    }
}