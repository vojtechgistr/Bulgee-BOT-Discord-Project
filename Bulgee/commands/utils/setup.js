const { MessageEmbed } = require("discord.js")
const { red_dark } = require("../../colours.json");
const { default_prefix } = require('../../botconfig.json')
const { default_logs } = require('../../botconfig.json')
const { logs } = require('../../botconfig.json')
const { antiraid } = require('../../botconfig.json')
const { basic } = require('../../botconfig.json')
const { music } = require('../../botconfig.json')
const { moderation } = require('../../botconfig.json')
const { fun } = require('../../botconfig.json')
const { levels } = require('../../botconfig.json')
const db = require('quick.db')
const { orange } = require("../../colours.json");

module.exports = {
    config: {
        name: "setup",
        category: "moderation",
        asseccableby: "Administrators",
        usage: "ok setup"
    },
    run: async (bot, message, args) => {
        let prefix = db.get(`prefix_${message.guild.id}`)
        if(prefix === null) prefix = default_prefix;

        const generale = bot.emojis.cache.get('724523238985826384');
        const fune = bot.emojis.cache.get('724523239430422528');
        const musice = bot.emojis.cache.get('724523233373847603');
        const moderatione = bot.emojis.cache.get('724523233398751252');
        const antiraide = bot.emojis.cache.get('725801378353774642');
        const levele = bot.emojis.cache.get('724527378667274281');
        const loge = bot.emojis.cache.get('727583787113775106');

        const embed1 = new MessageEmbed()
        .setTitle(':X: Error :X:')
        .setDescription("I don't have enough permissions to do this command. \n Please, give me permission -> ``MANAGE MESSAGES``")
        .setColor(0xd12828)
        const embed2 = new MessageEmbed()
        .setTitle(':X: Error :X:')
        .setDescription("You don't have enough permissions to use this command. \n - Required permission -> ``MANAGE SERVER``")
        .setColor(0xd12828)
            if (!message.guild.me.hasPermission(['MANAGE_MESSAGES'])) return message.channel.send(embed1);
            if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(embed2);

        if(!args[0]) {
            let sEmbed = new MessageEmbed()
            .setColor(orange)
            .setTitle("<:SUREchecklist:717057182046224414> Setup - Help List")
            .setDescription(`\`${prefix}setup settings\` **|** shows current server's settings\n\n\`${prefix}setup section [type] [on/off]\` **|** with this command you can turn on/off sections or modules\n\n\`${prefix}setup default\` **|** restore all settings to default\n\n\`${prefix}setup logschannel\` **|** with this command you can setup your logging channel`)
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());
            return message.channel.send(sEmbed)
        }

        if(args[0] === "settings") {
                let funs = db.fetch(`fun_${message.guild.id}`);
                let basics = db.fetch(`basic_${message.guild.id}`);
                let prefixs = db.fetch(`prefix_${message.guild.id}`);
                let musics = db.fetch(`music_${message.guild.id}`);
                let antiraids = db.fetch(`antiraid_${message.guild.id}`);
                let moderations = db.fetch(`moderation_${message.guild.id}`);
                let levelss = db.fetch(`levelsd_${message.guild.id}`);
                let log = db.fetch(`logs_${message.guild.id}`);
                let logging = db.fetch(`logging_${message.guild.id}`);

                if(musics === null) musics = music;

                if(antiraids === null) antiraids = antiraid;

                if(basics === null) basics = basic;

                if(logging === null) logging = default_logs;

                if(log === null) log = logs;

                if(prefixs === null) prefixs = default_prefix;

                if(funs === null) funs = fun;

                if(moderations === null) moderations = moderation;

                if(levelss === null) levelss = levels;


                if(musics === "true") {
                    musics = "on";
                } else if(musics === "false") {
                    musics = "off";
                }

                if(antiraids === "true") {
                    antiraids = "on";
                } else if(antiraids === "false") {
                    antiraids = "off";
                }

                if(levelss === "true") {
                    levelss = "on";
                } else if(levelss === "false") {
                    levelss = "off";
                }

                if(basics === "true") {
                    basics = "on";
                } else if(basics === "false") {
                    basics = "off";
                }

                if(log === "true") {
                    log = "on";
                } else if(log === "false") {
                    log = "off";
                }

                if(funs === "true") {
                    funs = "on";
                } else if(funs === "false") {
                    funs = "off";
                }

                if(moderations === "true") {
                    moderations = "on";
                } else if(moderations === "false") {
                    moderations = "off";
                }

            const lola = new MessageEmbed()
                .setDescription(`**Server's Prefix:** ${prefixs}\n\n**General section:** turned ${basics}\n\n**Fun Section:** turned ${funs}\n\n**Moderation Section:** turned ${moderations}\n\n**Music Section:** turned ${musics}\n\n**Leveling Module:** turned ${levelss}\n\n**Antiraid Module:** turned ${antiraids}\n\n**Logs Module:** turned ${log}\n**Logging Channel:** ${logging}`)
                .setTitle(`<:SUREchecklist:717057182046224414> Current Server Settings`)
                .setColor(red_dark)
    
            return message.channel.send(lola);
            }

            if(args[0] === "default") {
                let funs = db.fetch(`fun_${message.guild.id}`);
                let basics = db.fetch(`fun_${message.guild.id}`);
                let antiraids = db.fetch(`antiraid_${message.guild.id}`);
                let prefixs = db.fetch(`fun_${message.guild.id}`);
                let musics = db.fetch(`fun_${message.guild.id}`);
                let moderations = db.fetch(`fun_${message.guild.id}`);
                let levelss = db.fetch(`levelsd_${message.guild.id}`);
                let channellogs = db.fetch(`logging_${message.guild.id}`);
                let logss = db.fetch(`logs_${message.guild.id}`);
    
                if(musics === null) musics = music;

                if(channellogs === null) channellogs = default_logs;

                if(logss = null) logss = logs;

                if(musics === null) musics = music;
    
                if(basics === null) basics = basic;
    
                if(prefixs === null) prefixs = default_prefix;
    
                if(funs === null) funs = fun;

                if(antiraids === null) antiraids = antiraid;
    
                if(moderations === null) moderations = moderation;

                if(levelss === null) levelss = levels;
    
    
                db.set(`music_${message.guild.id}`, "true");

                db.set(`levelsd_${message.guild.id}`, "true");

                db.set(`antiraid_${message.guild.id}`, "false");

                db.set(`logs_${message.guild.id}`, "true");

                db.set(`logging_${message.guild.id}`, "none");
    
                db.set(`fun_${message.guild.id}`, "true");
    
                db.set(`moderation_${message.guild.id}`, "true");
                
                db.set(`basic_${message.guild.id}`, "true");
                
                db.set(`prefix_${message.guild.id}`, default_prefix);
    
                const cs = new MessageEmbed()
                        .setDescription(`<a:SUREcheckmark:715481264315957299> All settings has been restored to default`)
                        .setColor(red_dark);
                        return message.channel.send(cs);
            }

        if(args[0] === "logschannel") {
            let channellog = db.get(`logging_${message.guild.id}`)

            if(channellog === null) channellog = default_logs;
            if(args[1] === channellog) {
    
                const embed2232 = new MessageEmbed()
            .setDescription(`<#${channellog}> is already setted as a log channel..\n\n<:SUREwarning:715481249082245141> __Usage:__\n\`${prefix}setup logs [channel ID]\``)
            .setColor(red_dark)
            return message.channel.send(embed2232);
            }
            if (!args[1]) {
                const embed2232 = new MessageEmbed()
            .setDescription(`Current log channel is -> <#${channellog}>\n\n<:SUREwarning:715481249082245141> __Usage:__\n\`${prefix}setup logs [channel ID]\``)
            .setColor(red_dark)
            return message.channel.send(embed2232);
            }
                let kawdk = new MessageEmbed()
                    .setDescription(`<:SUREwarning:715481249082245141> Invalid channel ID!`)
                    .setColor(red_dark)

                let logfind = message.guild.channels.cache.get(args[1])
                if(!logfind) return message.channel.send(kawdk);
               await db.set(`logging_${message.guild.id}`, args[1])

        const embed2232 = new MessageEmbed()
            .setDescription(`New log channel -> ${logfind}`)
            .setTitle(`<a:SUREcheckmark:715481264315957299> Done`)
            .setColor(red_dark)

        return message.channel.send(embed2232);
        }
        if(args[0] === "section") {
            const wad = new MessageEmbed()
            .setDescription(`<:SUREchecklist:717057182046224414> __Section list:__\n- **basic**\n- **fun**\n- **music**\n- **moderation**\n- **levels**\n- **logs**\n\n<:SUREwarning:715481249082245141> __Usage:__\n\`${prefix}setup section [section] off / on\``)
            .setColor(red_dark)

            if(args[1] === "general") {
                let basics = db.fetch(`basic_${message.guild.id}`)
                if(basics === null) basics = basic;

            if(!args[2]) {
            return message.channel.send(wad);
                }
                if(args[2] === "on") {

                db.set(`basic_${message.guild.id}`, "true")
                const cs = new MessageEmbed()
                    .setDescription(`<a:SUREcheckmark:715481264315957299> Section ${generale} \`General\` is now turned on`)
                    .setColor(red_dark);
                    return message.channel.send(cs);

                } else if(args[2] === "off") {
                    db.set(`basic_${message.guild.id}`, "false")
                    const cs = new MessageEmbed()
                        .setDescription(`<a:SUREcheckmark:715481264315957299> Section ${generale} \`General\` is now turned off`)
                        .setColor(red_dark);
                        return message.channel.send(cs);

                } else {
                    return message.channel.send(wad);
                }

            }
            if(args[1] === "fun") {
                let funs = db.fetch(`fun_${message.guild.id}`)
                if(funs === null) funs = fun;

            if(!args[2]) {
            return message.channel.send(wad);
                }
                if(args[2] === "on") {

                db.set(`fun_${message.guild.id}`, "true")
                const cs = new MessageEmbed()
                    .setDescription(`<a:SUREcheckmark:715481264315957299> Section ${fune} \`Fun\` is now turned on`)
                    .setColor(red_dark);
                    return message.channel.send(cs);

                } else if(args[2] === "off") {
                    db.set(`fun_${message.guild.id}`, "false")
                    const cs = new MessageEmbed()
                        .setDescription(`<a:SUREcheckmark:715481264315957299> Section ${fune} \`Fun\` is now turned off`)
                        .setColor(red_dark);
                        return message.channel.send(cs);

                } else {
                    return message.channel.send(awda);
                }
            }
            if(args[1] === "moderation") {
                let moderations = db.fetch(`moderation_${message.guild.id}`)
                if(moderations === null) moderations = moderation;

            if(!args[2]) {
            return message.channel.send(wad);
                }
                if(args[2] === "on") {

                db.set(`moderation_${message.guild.id}`, "true")
                const cs = new MessageEmbed()
                    .setDescription(`<a:SUREcheckmark:715481264315957299> Section ${moderatione} \`Moderation\` is now turned on`)
                    .setColor(red_dark);
                    return message.channel.send(cs);

                } else if(args[2] === "off") {
                    db.set(`moderation_${message.guild.id}`, "false")
                    const cs = new MessageEmbed()
                        .setDescription(`<a:SUREcheckmark:715481264315957299> Section ${moderatione} \`Moderation\` is now turned off`)
                        .setColor(red_dark);
                        return message.channel.send(cs);

                } else {
                    return message.channel.send(wad);
                }
            }
            if(args[1] === "music") {
                let musics = db.fetch(`music_${message.guild.id}`)
                if(musics === null) musics = music;

            if(!args[2]) {
            return message.channel.send(wad);
                }
                if(args[2] === "on") {

                db.set(`music_${message.guild.id}`, "true")
                const cs = new MessageEmbed()
                    .setDescription(`<a:SUREcheckmark:715481264315957299> Section ${musice} \`Music\` is now turned on`)
                    .setColor(red_dark);
                    return message.channel.send(cs);

                } else if(args[2] === "off") {
                    db.set(`music_${message.guild.id}`, "false")
                    const cs = new MessageEmbed()
                        .setDescription(`<a:SUREcheckmark:715481264315957299> Section ${musice} \`Music\` is now turned off`)
                        .setColor(red_dark);
                        return message.channel.send(cs);

                } else {
                    return message.channel.send(wad);
                }
                }
                if(args[1] === "leveling") {
                    let lvls = db.get(`levelsd_${message.guild.id}`)
                    if(lvls === null) lvls = levels;
    
                if(!args[2]) {
                return message.channel.send(wad);
                    }
                    if(args[2] === "on") {
                    db.set(`levelsd_${message.guild.id}`, "true")
                    const cs = new MessageEmbed()
                        .setDescription(`<a:SUREcheckmark:715481264315957299> Module ${levele} \`Leveling\` is now turned on`)
                        .setColor(red_dark);
                        return message.channel.send(cs);
    
                    } else if(args[2] === "off") {
                        db.set(`levelsd_${message.guild.id}`, "false")
                        const cs2 = new MessageEmbed()
                            .setDescription(`<a:SUREcheckmark:715481264315957299> Module ${levele} \`Leveling\` is now turned off`)
                            .setColor(red_dark);
                            return message.channel.send(cs2);
    
                    } else {
                        return message.channel.send(wad);
                    }
    
                }
                if(args[1] === "antiraid") {
                    let ant = db.get(`antiraid_${message.guild.id}`)
                    if(ant === null) ant = antiraid;
    
                if(!args[2]) {
                return message.channel.send(wad);
                    }
                    if(args[2] === "on") {
                    db.set(`antiraid_${message.guild.id}`, "true")
                    const cs = new MessageEmbed()
                        .setDescription(`<a:SUREcheckmark:715481264315957299> Section ${antiraide} \`Antiraid\` is now turned on`)
                        .setColor(red_dark);
                        return message.channel.send(cs);
    
                    } else if(args[2] === "off") {
                        db.set(`antiraid_${message.guild.id}`, "false")
                        const cs2 = new MessageEmbed()
                            .setDescription(`<a:SUREcheckmark:715481264315957299> Section ${antiraide} \`Antiraid\` is now turned off`)
                            .setColor(red_dark);
                            return message.channel.send(cs2);
    
                    } else {
                        return message.channel.send(wad);
                    }
    
                }
                if(args[1] === "logging") {
                    let loggtru = db.get(`logs_${message.guild.id}`)
                    if(loggtru === null) loggtru = logs;
    
                if(!args[2]) {
                return message.channel.send(wad);
                    }
                    if(args[2] === "on") {
                    db.set(`logs_${message.guild.id}`, "true")
                    const cs = new MessageEmbed()
                        .setDescription(`<a:SUREcheckmark:715481264315957299> Module ${loge} \`Logging\` is now turned on`)
                        .setColor(red_dark);
                        return message.channel.send(cs);
    
                    } else if(args[2] === "off") {
                        db.set(`logs_${message.guild.id}`, "false")
                        const cs2 = new MessageEmbed()
                            .setDescription(`<a:SUREcheckmark:715481264315957299> Module ${loge} \`Logging\` is now turned off`)
                            .setColor(red_dark);
                            return message.channel.send(cs2);
    
                    } else {
                        return message.channel.send(wad);
                    }
    
                }

                if(!args[1]) {
                    const cs = new MessageEmbed()
                    .setTitle("<:SUREwarning:715481249082245141> Invalid section!")
                .setDescription(`__Valid sections__:\n- **general**\n- **fun**\n- **moderation**\n- **music**\n- **antiraid**\n\n- **leveling**\n- **logging**\n\n__Usage:__\n\`${prefix}setup section [section] on / off\``)
                .setColor(red_dark);
            return message.channel.send(cs);
                }else {
                    const css = new MessageEmbed()
                        .setTitle("<:SUREwarning:715481249082245141> Invalid section!")
                        .setDescription(`__Valid sections__:\n- **general**\n- **fun**\n- **moderation**\n- **music**\n- **antiraid**\n\n- **leveling**\n- **logging**\n\n__Usage:__\n\`${prefix}setup section [section] on / off\``)
                        .setColor(red_dark);
                        return message.channel.send(css);
                }
        }
        const cssdw = new MessageEmbed()
                        .setTitle("<:SUREwarning:715481249082245141> Invalid Setup!")
                        .setDescription(`For setup list type \`${prefix}setup\` into the chat`)
                        .setColor(red_dark);
                        return message.channel.send(cssdw);
    }
}