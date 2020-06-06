const { MessageEmbed } = require('discord.js');
const { purple_medium } = require('..//..//colours.json')

module.exports = {
    config: {
        name: "leave",
        aliases: ["lev", "stop", "disconnect"],
        description: "Makes the bot leave the voice channel.",
        accessableby: "Member",
        category: "music",
    },
    run: async (bot, message, args) => {
        const player = bot.music.players.get(message.guild.id);

        let nosongs = new MessageEmbed()
            .setDescription("No song/s currently playing")
            .setColor(purple_medium);

            let voice = new MessageEmbed()
            .setDescription("You need to be in a voice channel to use the leave command")
            .setColor(purple_medium);

            let successfully = new MessageEmbed()
            .setDescription("Successfully stopped the music")
            .setColor(purple_medium);

            if(!player) return message.channel.send(nosongs);

        if(!message.member.voice.channel || message.member.voice.channel.id !== player.voiceChannel.id) return message.channel.send(voice);

        bot.music.players.destroy(message.guild.id);
        return message.channel.send(successfully);
    }
}