const { MessageEmbed } = require('discord.js');
const { purple_medium } = require('..//..//colours.json')

module.exports = { 
    config: {
        name: "queue",
        aliases: ["q"],
        description: "Displays what the current queue is.",
        accessableby: "Member",
        category: "music",
    },
    run: async (bot, message, args) => {
        const embed = new MessageEmbed()
            .setColor(purple_medium)
            .setDescription("No song currently playing");

        const player = bot.music.players.get(message.guild.id);
        if(!player || !player.queue[0]) return message.channel.send(embed);

        let index = 1;
        let string = "";

            if(player.queue[0]) string += `__**Currently Playing**__\n ${player.queue[0].title} - **${message.author.username}#${message.author.discriminator}** \n\n`;
            if(player.queue[1]) string += `__**In Queue:**__\n ${player.queue.slice(1, 10).map(x => `**${index++})** ${x.title} - **Requested by ${message.author.username}#${message.author.discriminator}**`).join("\n")}`;

        const embeds = new MessageEmbed()
            .setAuthor(`Current Queue:`)
            .setThumbnail(player.queue[0].thumbnail)
            .setDescription(string);

        return message.channel.send(embeds);
    }
}