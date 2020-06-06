const { MessageEmbed } = require('discord.js');
const { purple_medium } = require('..//..//colours.json')

module.exports = {
    config: {
        name: "shuffle",
        description: "Shuffle the queue",
        accessableby: "Member",
        category: "music"
    },
    run: async (bot, message, args) => {

        let nosongs = new MessageEmbed()
            .setDescription("No song/s currently playing")
            .setColor(purple_medium);

        let voice = new MessageEmbed()
            .setDescription("You need to be in a voice channel to shuffle music")
            .setColor(purple_medium);

        let successfully = new MessageEmbed()
            .setDescription("The queue is now shuffled")
            .setColor(purple_medium);

        let noqueue = new MessageEmbed()
            .setDescription("I can't shuffle empty queue!")
            .setColor(purple_medium);

        const player = bot.music.players.get(message.guild.id);
        if(!player || !player.queue[0]) return message.channel.send(nosongs);

        if(!player.queue[1]) return message.channel.send(noqueue)

        if(!message.member.voice.channel || message.member.voice.channel.id !== player.voiceChannel.id) return message.channel.send(voice);

        player.queue.shuffle();
        return message.channel.send(successfully);
    }
}