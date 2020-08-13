const express = require('express');
const app = express();

let port = require('./config.json').port || 80;
app.set('port', port);

const session = require('express-session');

app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use(session({
    secret: '48738924783748273742398747238',
    resave: false,
    saveUninitialized: false,
    expires: 604800000,
}));
require('./router')(app);

app.listen(port, () => console.info(`Listening on port ${port}`));


const { Client, Collection, Util } = require("discord.js");
const { MessageEmbed, Discord } = require('discord.js');
const { token, prefix } = require("./botconfig.json");
const bot = new Client();
const { music } = require('./botconfig.json')
const { orange, purple_medium } = require("./colours.json");
const db = require("quick.db");
const { default_prefix, levels } = require("./botconfig.json");
const database = require('./database/database');
database;

const { YOUTUBE_API_KEY } = require("./botconfig.json");
const ytdl = require('ytdl-core');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube(YOUTUBE_API_KEY);
const queue = new Map();


const Enmap = require("enmap");
bot.ls = new Enmap({name: "levelsystem"});

bot.snipes = new Map();
bot.options.fetchAllMembers = true;

["aliases", "commands"].forEach(x => bot[x] = new Collection());
["command", "event"].forEach(x => require(`./handlers/${x}`)(bot));

bot.on('message', async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    
    let prefix = db.get(`prefix_${message.guild.id}`)
            if(prefix === null) prefix = default_prefix;

    if(message.content === "<@670963766850224159>" || message.content === "<@!670963766850224159>") {
        let sEmbed = new MessageEmbed()
        .setColor(orange)
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setDescription(`**My server's prefix is \`${prefix}\`**\n\nType \`${prefix}help\` for help list‎`)
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL(), false);
    return message.channel.send(sEmbed)
        }

    })

    bot.on('message', async message => {
        if(message.author.bot) return;
        if(message.channel.type === "dm") return;

        let section = db.get(`levelsd_${message.guild.id}`)
    if(section === null) section = levels;
    if(section === "false") return;

        const key = `${message.guild.id}-${message.author.id}`;
        bot.ls.ensure(`${message.guild.id}-${message.author.id}`, {
            level: 1,
            xp: 0,
            totalXp: 0
          });

            let levelInfo = bot.ls.ensure(key, {
                level: 1,
                xp: 0,
                totalXp: 0
            });

            if(levelInfo === undefined || levelInfo === null) {
                levelInfo = {
                    level: 1,
                    xp: 0,
                    totalXp: 0
                }
            }

            bot.ls.inc(key, "xp");

            let generatedXp = Math.floor(Math.random() * 5) + 1;
            
            levelInfo.xp += generatedXp;
            levelInfo.totalXp += generatedXp;
        
            if(levelInfo.xp >= levelInfo.level * 40) {
                levelInfo.level++;
                levelInfo.xp = 0;
                bot.ls.set(key, levelInfo.xp, "xp");
                message.channel.send(`Congrats! ${message.author} reached lvl **${levelInfo.level}**`);
            }
            bot.ls.set(key, levelInfo.level, "level");
    })

    bot.on('message', async message => {
        if(message.author.bot) return;
        if(message.channel.type === "dm") return;

        let prefix = db.get(`prefix_${message.guild.id}`);
        if(prefix === null) prefix = default_prefix;

        let args = message.content.slice(prefix.length).trim().split(/ +/g);

        let songInfo = null;
        let song = null;
        const search = args.join(" ");
        const url = args[1];
        const videoPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
        const urlValid = videoPattern.test(args[1]);
        const playlistPattern = /^.*(list=)([^#\&\?]*).*/gi;

        const serverQueue = queue.get(message.guild.id);

        const nosongs = new MessageEmbed()
        .setDescription("No song/s currently playing")
        .setColor(purple_medium);

        const voice2 = new MessageEmbed()
            .setDescription("You need to be in a same voice channel like is a bot")
            .setColor(purple_medium);

        const notracks = new MessageEmbed()
            .setColor(purple_medium)
            .setDescription("No tracks were found.. Try it again");

        if(message.content.startsWith(`${prefix}play`)) {

            let section = db.get(`music_${message.guild.id}`)
        if(section === null) section = music;

        if(section === "false") return

        const voice = new MessageEmbed()
            .setDescription("You need to be in a voice channel to play music")
            .setColor(purple_medium);


        const link = new MessageEmbed()
            .setDescription("Please provide a song name or link to search")
            .setColor(purple_medium);

        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel) return message.channel.send(voice)

        const permissions = message.guild.me.permissionsIn(voiceChannel);

        const embed1 = new MessageEmbed()
        .setTitle(':X: Error :X:')
        .setDescription("I don't have enough permissions! \n - Needed permission -> ``CONNECT``")
        .setColor(0xd12828);

        const embed2 = new MessageEmbed()
        .setTitle(':X: Error :X:')
        .setDescription("I don't have enough permissions! \n - Needed permission -> ``SPEAK``")
        .setColor(0xd12828);

        if (!permissions.has("CONNECT")) return message.channel.send(embed1);

        if (!permissions.has("SPEAK")) return message.channel.send(embed2);

        if (!args[1]) return message.channel.send(link);

        if(urlValid) {
            try {
                songInfo = await ytdl.getInfo(url);
                song = {
                  title: songInfo.title,
                  url: songInfo.video_url,
                  duration: songInfo.lengthSeconds
                };
              } catch (error) {
                return console.log(error);
              }
        } else {
            try{
                const results = await youtube.searchVideos(search, 1);
                songInfo = await ytdl.getInfo(results[0].url);
                song = {
                  title: songInfo.title,
                  url: songInfo.video_url,
                  duration: songInfo.lengthSeconds
                };
        
                if(!serverQueue) {
                    const queueConstructor = {
                        textChannel: message.channel,
                        voiceChannel: voiceChannel,
                        connection: null,
                        songs: [],
                        volume: 100,
                        playing: true
                    }
        
                    queue.set(message.guild.id, queueConstructor)
        
                    queueConstructor.songs.push(song)
                    
                try {
                    var connection = await voiceChannel.join();
                    queueConstructor.connection = connection;
                    await queueConstructor.connection.voice.setSelfDeaf(true);
                    
                    play(message.guild.id, queueConstructor.songs[0])
                } catch(err) {
                    console.log(err)
                    message.channel.send('There was an error connecting to the voice channel')
                    }
        
                } else {
                    serverQueue.songs.push(song)
                    
                    let s = new MessageEmbed()
                    .setColor(purple_medium)
                    .setDescription(`<a:Loading:652276785811161138> Enqueuing \`${song.title}\``);
        
                    let edited = new MessageEmbed()
                    .setColor(purple_medium)
                    .setDescription(`[${song.title}](${song.url}) has been added to the queue!`);
        
                    return message.channel.send(s).then(m => {
                        setTimeout(async() => {
                            m.edit(edited);
                        }, 2000);
                    });
                }
                return undefined;
            } catch (error) {
        console.log(error);
        return serverQueue.textChannel.send(notracks);
      }
        }
        } else if(message.content.startsWith(`${prefix}stop`)) {
            
        let section = db.get(`music_${message.guild.id}`)
        if(section === null) section = music;

        if(section === "false") return

        const voice3 = new MessageEmbed()
            .setDescription("You need to be in a voice channel to stop the music")
            .setColor(purple_medium);


        const stopped = new MessageEmbed()
        .setDescription("Successfully stopped the music")
        .setColor(purple_medium);

        if(!message.member.voice.channel) return message.channel.send(voice3);

        if(message.member.voice.channel.id !== serverQueue.voiceChannel.id) return message.channel.send(voice2);

        if(!serverQueue) return message.channel.send(nosongs)
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end()
        message.channel.send(stopped)
        return undefined;

        }else if(message.content.startsWith(`${prefix}leave`) || message.content.startsWith(`${prefix}disconnect`)) {
            
            let section = db.get(`music_${message.guild.id}`)
            if(section === null) section = music;
    
            if(section === "false") return
    
            const voice3 = new MessageEmbed()
                .setDescription("You need to be in a voice channel to stop the music")
                .setColor(purple_medium);
    
    
            const stopped = new MessageEmbed()
            .setDescription("Successfully disconnected from the channel")
            .setColor(purple_medium);
    
            if(!message.member.voice.channel) return message.channel.send(voice3);
    
            if(message.member.voice.channel.id !== serverQueue.voiceChannel.id) return message.channel.send(voice2);
    
            if(!serverQueue) return message.channel.send(nosongs)
            serverQueue.songs = [];
            queue.delete(message.guild.id);
            serverQueue.connection.dispatcher.leave()
            message.channel.send(stopped)
            return undefined;
    
            } else if(message.content.startsWith(`${prefix}skip`) || message.content.startsWith(`${prefix}next`)) {
            
        let section = db.get(`music_${message.guild.id}`)
        if(section === null) section = music;

        if(section === "false") return;
        
            const voice3 = new MessageEmbed()
            .setDescription("You need to be in a voice channel to skip the music")
            .setColor(purple_medium);

            const skipped = new MessageEmbed()
                .setDescription("<:Arrow:725276952516100116> Successfully skipped the music")
                .setColor(purple_medium);

            if(!message.member.voice.channel) return message.channel.send(voice3);
            if(!serverQueue) return message.channel.send(nosongs);
            serverQueue.connection.dispatcher.end()
            message.channel.send(skipped)
            return undefined;
        } else if(message.content.startsWith(`${prefix}volume`)) {
            let section = db.get(`music_${message.guild.id}`)
            if(section === null) section = music;
    
            if(section === "false") return;

            const voice3 = new MessageEmbed()
            .setDescription("You need to be in a voice channel to skip the music")
            .setColor(purple_medium);

            const only = new MessageEmbed()
            .setDescription("You may only set the volume to 1-100")
            .setColor(purple_medium);

            const current = new MessageEmbed()
                .setDescription(`<:volume:718488102510919708> Current Volume is **${serverQueue.volume}%**`)
                .setColor(purple_medium);

            if(!message.member.voice.channel) return message.channel.send(voice3);

            if(message.member.voice.channel.id !== serverQueue.voiceChannel.id) return message.channel.send(voice2);

            if(!serverQueue) return message.channel.send(nosongs);

            if (!args[1]) return message.channel.send(current);

        if (isNaN(args[1]) <= 0 || isNaN(args[1]) > 100) return message.channel.send(only);

            let successfully = new MessageEmbed()
            .setDescription(`Successfully set the volume to **${args[1]}%**`)
            .setColor(purple_medium);

            serverQueue.volume = args[1];

            serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 100)

            message.channel.send(successfully);
            return undefined;
        } else if(message.content.startsWith(`${prefix}np`) || message.content.startsWith(`${prefix}nowplaying`) || message.content.startsWith(`${prefix}now`)) {
            let section = db.get(`music_${message.guild.id}`)
            if(section === null) section = music;
    
            if(section === "false") return;

            const { stripIndents } = require("common-tags");

            if(!serverQueue) return message.channel.send(nosongs);

            const embed = new MessageEmbed()
            .setAuthor("Current Song:")
            .setDescription(stripIndents`
            ${serverQueue.playing ? "▶️" : "⏸️"} **[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})**`);
            message.channel.send(embed);
            return undefined;
        } else if(message.content.startsWith(`${prefix}queue`) || message.content.startsWith(`${prefix}q`)) {
            let section = db.get(`music_${message.guild.id}`)
        if(section === null) section = music;

        if(section === "false") return


        if(!serverQueue || !serverQueue.songs[0]) return message.channel.send(nosongs);

        let index = 1;
        let string = "";

            if(serverQueue.songs[0]) string += `__**Currently Playing**__\n [${serverQueue.songs[0].title}](${serverQueue.songs[0].url}) \n\n`;
            if(serverQueue.songs[1]) string += `__**In Queue:**__\n ${serverQueue.songs.slice(1, 10).map(x => `**${index++})** [${x.title}](${x.url}) - **Requested by ${message.author}**`).join("\n\n")}`;

        const embeds = new MessageEmbed()
            .setAuthor(`Current Queue:`)
            .setDescription(string);

        return message.channel.send(embeds);
        } else if(message.content.startsWith(`${prefix}pause`) || message.content.startsWith(`${prefix}resume`)) {
            let section = db.get(`music_${message.guild.id}`)
            if(section === null) section = music;
    
            if(section === "false") return;

            if(!serverQueue) return message.channel.send(nosongs);
            const voice3 = new MessageEmbed()
            .setDescription("You need to be in a voice channel to pause music")
            .setColor(purple_medium);

            
            const paused = new MessageEmbed()
            .setDescription(`⏸️ Music is now paused`)
            .setColor(purple_medium);
            
            const r = new MessageEmbed()
            .setDescription(`▶️ Music is now resumed`)
            .setColor(purple_medium);

            if(!message.member.voice.channel) return message.channel.send(voice3);
            if(message.member.voice.channel.id !== serverQueue.voiceChannel.id) return message.channel.send(voice2);
            if(serverQueue.playing === false) {
                serverQueue.playing = true;
                serverQueue.connection.dispatcher.resume()
                message.channel.send(r)
                return undefined;
            }

            serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause()
            message.channel.send(paused)
            return undefined;
        } else if(message.content.startsWith(`${prefix}shuffle`)) {
            let section = db.get(`music_${message.guild.id}`)
        if(section === null) section = music;

        if(section === "false") return

        const voice = new MessageEmbed()
            .setDescription("You need to be in a voice channel to shuffle music")
            .setColor(purple_medium);

        const successfully = new MessageEmbed()
            .setDescription("The queue is now shuffled")
            .setColor(purple_medium);

        const noqueue = new MessageEmbed()
            .setDescription("I can't shuffle empty queue!")
            .setColor(purple_medium);

        if(!serverQueue || !serverQueue.songs[0]) return message.channel.send(nosongs);

        if(message.member.voice.channel.id !== serverQueue.voiceChannel.id) return message.channel.send(voice2)
        if(!message.member.voice.channel) return message.channel.send(voice);
        
        if(!serverQueue.songs[1]) return message.channel.send(noqueue)

        let songs = serverQueue.songs;
        for (let i = songs.length - 1; i > 1; i--) {
          let j = 1 + Math.floor(Math.random() * i);
          [songs[i], songs[j]] = [songs[j], songs[i]];
        }
        serverQueue.songs = songs
        queue.set(message.guild.id, serverQueue);
    
        return message.channel.send(successfully);
        } else if(message.content.startsWith(`${prefix}loop`)) {
            let section = db.get(`music_${message.guild.id}`)
            if(section === null) section = music;
    
            if(section === "false") return

            const voice = new MessageEmbed()
            .setDescription("You need to be in a voice channel to shuffle music")
            .setColor(purple_medium);

            const successfully = new MessageEmbed()
                .setDescription(`🔁 Loop is now turned ${serverQueue.loop ? "**off**" : "**on**"}`)
                .setColor(purple_medium);

            if(!serverQueue || !serverQueue.songs[0]) return message.channel.send(nosongs);

            if(message.member.voice.channel.id !== serverQueue.voiceChannel.id) return message.channel.send(voice2)
            if(!message.member.voice.channel) return message.channel.send(voice);

            serverQueue.loop = !serverQueue.loop;
            return serverQueue.textChannel.send(successfully)
        }

        function play(guild, song) {
            const serverQueue = queue.get(message.guild.id);
        
            if(!song) {
                const sss = new MessageEmbed()
                .setDescription(`Queue has ended`)
                .setColor(purple_medium);
            serverQueue.textChannel.send(sss)

            setTimeout(async () => {
                await serverQueue.voiceChannel.leave();
                queue.delete(guild.id);
                return;
            }, 120000);
            return;
            }

            const dispatcher = connection.play(ytdl(song.url))
            .on('finish', () => {
                serverQueue.songs.shift()
                play(guild, serverQueue.songs[0])
            })
            .on('error', error => {
                console.log(error);
            })
            dispatcher.setVolumeLogarithmic(serverQueue.volume / 100)

            const ss = new MessageEmbed()
                .setDescription(`**Started playing:** [${song.title}](${song.url})`)
                .setColor(purple_medium);
            serverQueue.textChannel.send(ss)
        }
        
    })
bot.login(token);