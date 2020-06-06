const { Utils } = require("erela.js")
const { MessageEmbed } = require('discord.js');
const { purple_medium } = require('..//..//colours.json')

module.exports = { 
    config: {
        name: "play",
        description: "Play a song/playlist or search for a song from youtube",
        usage: "<input>",
        category: "music",
        accessableby: "Member",
        aliases: ["p", "pplay"]
    },
    run: async (bot, message, args) => {
        let notracks = new MessageEmbed()
                .setColor(purple_medium)
                .setDescription("No tracks were found.. Try it again");

        let nosongs = new MessageEmbed()
            .setDescription("No song/s currently playing")
            .setColor(purple_medium);
        
        let voice = new MessageEmbed()
            .setDescription("You need to be in a voice channel to play music")
            .setColor(purple_medium);

        let link = new MessageEmbed()
            .setDescription("Please provide a song name or link to search")
            .setColor(purple_medium);

            if (!message.member.voice.channel) return message.channel.send(voice);

        const permissions = message.member.voice.channel.permissionsFor(bot.user);

        let embed1 = new MessageEmbed()
        .setTitle(':x: Error :x:')
        .setDescription("I don't have enough permissions! \n - Needed permission -> ``CONNECT``")
        .setColor(0xd12828);

        let embed2 = new MessageEmbed()
        .setTitle(':x: Error :x:')
        .setDescription("I don't have enough permissions! \n - Needed permission -> ``SPEAK``")
        .setColor(0xd12828);

        if (!permissions.has("CONNECT")) return message.channel.send(embed1);

        if (!permissions.has("SPEAK")) return message.channel.send(embed2);
        if (!args[0]) return message.channel.send(link);

        const player = bot.music.players.spawn({
            guild: message.guild,
            textChannel: message.channel,
            voiceChannel: message.member.voice.channel
        });

        const player2 = bot.music.players.get(message.guild.id);
        if (message.member.voice.channel.id !== player2.voiceChannel.id) return message.channel.send(voice);
        
        bot.music.search(args.join(" "), message.author).then(async res => {
            switch (res.loadType) {
                case "TRACK_LOADED":

                    player.queue.add(res.tracks[0]);

                    let embed = new MessageEmbed()
                    .setColor(purple_medium)
                    .setDescription(`Enqueuing - \`${res.tracks[0].title}\` \`${Utils.formatTime(res.tracks[0].duration, true)}\``);
                    message.channel.send(embed);
                    if (!player.playing) player.play()
                    break;
                
                case "SEARCH_RESULT":
                    let index = 1;
                    const tracks = res.tracks.slice(0, 5);
                    const embedok = new MessageEmbed()
                        .setAuthor("Song Selection.", message.author.displayAvatarURL)
                        .setDescription(tracks.map(video => `**${index++} -** ${video.title}`))
                        .setColor(purple_medium)
                        .setFooter("Your response time closes within the next 30 seconds. Type 'cancel' to cancel the selection");

                    await message.channel.send(embedok);

                    const collector = message.channel.createMessageCollector(m => {
                        return m.author.id === message.author.id && new RegExp(`^([1-5]|cancel)$`, "i").test(m.content)
                    }, { time: 30000, max: 1});

                    collector.on("collect", m => {
                        if (/cancel/i.test(m.content)) return collector.stop("cancelled")

                        const track = tracks[Number(m.content) - 1];
                        player.queue.add(track)

                    let embed2 = new MessageEmbed()
                        .setColor(purple_medium)
                        .setDescription(`Enqueuing \`${track.title}\` \`${Utils.formatTime(track.duration, true)}\``);

                        message.channel.send(embed2);
                        if(!player.playing) player.play();
                    });

                    let embed3 = new MessageEmbed()
                    .setColor(purple_medium)
                    .setDescription("Cancelled selection");

                    collector.on("end", (_, reason) => {
                        if(["time", "cancelled"].includes(reason)) return message.channel.send(embed3)
                    });
                    break;

                case "PLAYLIST_LOADED":
                    res.playlist.tracks.forEach(track => player.queue.add(track));
                    const duration = Utils.formatTime(res.playlist.tracks.reduce((acc, cur) => ({duration: acc.duration + cur.duration})).duration, true);
                    let embed4 = new MessageEmbed()
                    .setColor(purple_medium)
                    .setDescription(`Enqueuing \`${res.playlist.tracks.length}\` \`${duration}\` tracks in playlist \`${res.playlist.info.name}\``);

                    message.channel.send(embed4);
                    if(!player.playing) player.play()
                    break;
            }

        }).catch(err => message.channel.send(notracks))
    }
}