const { MessageEmbed } = require("discord.js")
const { orange } = require("../../colours.json");
const db = require("quick.db")
const basic = require('../../botconfig.json')
const music = require('../../botconfig.json')
const moderation = require('../../botconfig.json')
const levels = require("../../botconfig.json");
const fun = require('../../botconfig.json')
const { default_prefix } = require("../../botconfig.json");

module.exports = {
    config: {
        name: "help",
        description: "Shows help command list!",
        usage: "ok help",
        category: "general",
        accessableby: "Members"
    },

    run: async (bot, message, args) => {
        if(message.author.bot) return;
        if(message.channel.type === "dm") return;
        
        let prefix = db.get(`prefix_${message.guild.id}`)
        if(prefix === null) prefix = default_prefix;

        const generale = bot.emojis.cache.get('724523238985826384');
        const fune = bot.emojis.cache.get('724523239430422528');
        const musice = bot.emojis.cache.get('724523233373847603');
        const moderatione = bot.emojis.cache.get('724523233398751252');
        const antiraide = bot.emojis.cache.get('725801378353774642');
        const levele = bot.emojis.cache.get('724527378667274281');
        const utilse = bot.emojis.cache.get('724523238943883335');
        const staffe = bot.emojis.cache.get('724523233088372767');

        if(args[0] === "general") {
            let section = db.get(`basic_${message.guild.id}`)
        if(section === null) section = basic;

        if(section === "false") {
            const emd = new MessageEmbed()
            .setTitle(':X: Error :X:')
            .setDescription("This section is not enabled!")
            .setColor(0xd12828)
            .setTimestamp();
            return message.channel.send(emd)
        }

            let sEmbed = new MessageEmbed()
            .setColor(orange)
            .setTitle("<:SUREchecklist:717057182046224414> Basic - Help List")
            .setThumbnail(bot.user.displayAvatarURL())
            .setDescription(`\`${prefix}bot-info\` **|** shows bot informations\n\n\`${prefix}server-info\` **|** shows server's informations\n\n\`${prefix}help/ping bot\` **|** shows help page\n\n\`${prefix}bot-info\` **|** shows bot informations\n\n\`${prefix}invite\` **|** sends invite to bot\n\n\`${prefix}patreon\` **|** sends link to author's Patreon\n\n\`${prefix}report\` **|** sends invite to bot's support server\n\n\`${prefix}vote\` **|** send vote link\n\n\`${prefix}website\` **|** sends bot's website\n\n\`${prefix}uptime\` **|** sends bot's uptime\n\n\`${prefix}admins\` **|** sends bot's admins`)
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());
            message.channel.send(sEmbed)
            .then(m => m.delete({ timeout: 30000 }));
            return message.delete({ timeout: 30000 });
        }

        if(args[0] === "setup") {
            const embed2 = new MessageEmbed()
            .setTitle(':X: Error :X:')
            .setDescription("You don't have enough permissions to use this command. \n - Required permission -> ``MANAGE CHANNELS``")
            .setColor(0xd12828)
            .setTimestamp();
            if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(embed2)

            let sEmbed = new MessageEmbed()
            .setColor(orange)
            .setTitle(`${utilse} Setup - Help List`)
            .setDescription(`\`${prefix}setup settings\` **|** shows current server's settings\n\n\`${prefix}setup section [type] [on/off]\` **|** with this command you can turn on/off sections or modules\n\n\`${prefix}setup default\` **|** restore all settings to default\n\n\`${prefix}setup logschannel\` **|** with this command you can setup your logging channel`)
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());
            return message.channel.send(sEmbed)
        }

        if(args[0] === "utils") {
            const embed2 = new MessageEmbed()
            .setTitle(':X: Error :X:')
            .setDescription("You don't have enough permissions to use this command. \n - Required permission -> ``MANAGE CHANNELS``")
            .setColor(0xd12828)
            .setTimestamp();
            if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(embed2)

            let sEmbed = new MessageEmbed()
            .setColor(orange)
            .setTitle(`${utilse} Setup - Help List`)
            .setDescription(`\`${prefix}setup settings\` **|** shows current server's settings\n\n\`${prefix}setup section [type] [on/off]\` **|** with this command you can turn on/off sections or modules\n\n\`${prefix}setup default\` **|** restore all settings to default\n\n\`${prefix}setup logschannel\` **|** with this command you can setup your logging channel\n\n\`${prefix}setprefix [new prefix]\` **|** sets custom prefix\n\n\`${prefix}resetprefix\` **|** sets prefix to default **(**\`ok \`**)**\n\n\`${prefix}resetxp [member]\` **|** resets XP for provided member\n\n\`${prefix}slowmode [seconds]\` **|** sets slowmode for current channel`)
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());
            return message.channel.send(sEmbed)
        }

        if(args[0] === "antiraid") {
            const embed2 = new MessageEmbed()
            .setTitle(':X: Error :X:')
            .setDescription("You don't have enough permissions to use this command. \n - Required permission -> ``MANAGE CHANNELS``")
            .setColor(0xd12828)
            .setTimestamp();
            if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(embed2)

            let sEmbed = new MessageEmbed()
            .setColor(orange)
            .setTitle(`${antiraide} Antiraid - Help List`)
            .setDescription(`\`${prefix}mutevoice\` **|** mutes all members in voice channel where message author is\n\n\`${prefix}unmutevoice\` **|** unmutes all members in voice channel where message author is\n\n\`${prefix}freeze\` **|** freezes current channel\n\n\`${prefix}unfreeze\` **|** unfreezes current channel`)
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());
            return message.channel.send(sEmbed)
        }

        if(args[0] === "fun") {
            let section = db.get(`fun_${message.guild.id}`)
        if(section === null) section = fun;

        if(section === "false") {
            const emd = new MessageEmbed()
            .setTitle(':X: Error :X:')
            .setDescription("This section is not enabled!")
            .setColor(0xd12828)
            .setTimestamp();
            return message.channel.send(emd)
        }

            let sEmbed = new MessageEmbed()
            .setColor(orange)
            .setTitle(`${fune} Fun - Help List`)
            .setThumbnail(bot.user.displayAvatarURL())
            .setDescription(`\`${prefix}afk\` **|** AFK fun command\n\n\`${prefix}8ball [question]\` **|** normal 8ball minigame\n\n\`${prefix}avatar\` **|** send your avatar into the chat\n\n\`${prefix}invert\` **|** inverts your avatar\n\n\`${prefix}ping\` **|** shows bot's ping\n\n\`${prefix}hug [mention]\` **|** hugs mentioned member\n\n\`${prefix}kill [mention]\` **|** kills mentioned member\n\n\`${prefix}wave [mention]\` **|** waves to mentioned member\n\n\`${prefix}caps [message]\` **|** bot sends entered message in capslock\n\n\`${prefix}tell [message]\` **|** bot sends entered message\n\n\`${prefix}snipe\` **|** shows the last deleted message\n\n\`${prefix}embed [message]\` **|** bot sends entered message in embed\n\n\`${prefix}fakeban [mention]\` **|** (fake)bans mentioned member\n\n\`${prefix}kiss [mention]\` **|** kisses mentioned member\n\n\`${prefix}love [mention]\` **|** kisses mentioned member\n\n\`${prefix}meme\` **|** sends random meme\n\n\`${prefix}pat [mention]\` **|** pats mentioned member\n\n\`${prefix}slap [mention]\` **|** slaps mentioned member\n\n\`${prefix}minesweeper [difficulty]\` **|** minesweeper minigame\n\n\`${prefix}gping [mention]\` **|** ping-pong minigame`)
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());
            message.channel.send(sEmbed)
            .then(m => m.delete({ timeout: 30000 }));
            return message.delete({ timeout: 30000 });
        }

	if(args[0] === "leveling") {
            	let section = db.get(`levelsd_${message.guild.id}`)
        	if(section === null) section = levels;

        	if(section === "false") {
            	const emd = new MessageEmbed()
            	.setTitle(':X: Error :X:')
            	.setDescription("This section is not enabled!")
            	.setColor(0xd12828)
            	.setTimestamp();
            	return message.channel.send(emd);
        }

            let sEmbed = new MessageEmbed()
            .setColor(orange)
            .setTitle(`${levele} Level System - Help List`)
            .setDescription(`\`${prefix}rank\` **|** shows your rank on this server\n\n\`${prefix}leaderboard\` **|** shows server's level leaderboard (**IN PROGRESS**)`)
            .setThumbnail(bot.user.displayAvatarURL())
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());
            message.channel.send(sEmbed)
            .then(m => m.delete({ timeout: 30000 }));
            return message.delete({ timeout: 30000 });
        }

        if(args[0] === "moderation") {
            const embed2 = new MessageEmbed()
            .setTitle(':X: Error :X:')
            .setDescription("You don't have enough permissions to use this command. \n - Required permission -> ``MANAGE CHANNELS``")
            .setColor(0xd12828)
            .setTimestamp();
            if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(embed2);

            let section = db.get(`moderation_${message.guild.id}`)
        if(section === null) section = moderation;

        if(section === "false") {
            const emd = new MessageEmbed()
            .setTitle(':X: Error :X:')
            .setDescription("This section is not enabled!")
            .setColor(0xd12828)
            .setTimestamp();
            return message.channel.send(emd)
        }
            let sEmbed = new MessageEmbed()
            .setColor(orange)
            .setTitle(`${moderatione} Moderation - Help List`)
            .setThumbnail(bot.user.displayAvatarURL())
            .setDescription(`\`${prefix}ban [member/ID]\` **|** bans provided member\n\n\`${prefix}unban [ID]\` **|** unbans provided member\n\n\`${prefix}clear [number]\` **|** clears number of entered messages\n\n\`${prefix}createrole [#HEXcolor] [name]\` **|** creates new role with entered HEX color and name\n\n\`${prefix}deleterole [ID]\` **|** deletes provided role\n\n\`${prefix}addrole [type]\` **|** adds provided role to all members / mentioned member\n\n\`${prefix}remove [type]\` **|** removes provided role to all members / mentioned member\n\n\`${prefix}kick [member] [reason]\` **|** kicks provided member\n\n\`${prefix}warn [member] [reason]\` **|** warns provided member\n\n\`${prefix}user-info [member]\` **|** shows user-info of provided member`)
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());
            message.channel.send(sEmbed)
            .then(m => m.delete({ timeout: 30000 }));
            return message.delete({ timeout: 30000 });
        }

        if(args[0] === "music") {
            let section = db.get(`music_${message.guild.id}`)
        if(section === null) section = music;

        if(section === "false") {
            const emd = new MessageEmbed()
            .setTitle(':X: Error :X:')
            .setDescription("This section is not enabled!")
            .setColor(0xd12828)
            .setTimestamp();
            return message.channel.send(emd)
        }

            let sEmbed = new MessageEmbed()
            .setColor(orange)
            .setTitle(`${musice} Music - Help List`)
            .setThumbnail(bot.user.displayAvatarURL())
            .setDescription(`\`${prefix}play [song/link]\` **|** plays provided song\n\n\`${prefix}pause/resume\` **|** pauses/resumes the music\n\n\`${prefix}stop\` **|** stops the music\n\n\`${prefix}skip/next\` **|** skips current song\n\n\`${prefix}np/now\` **|** shows now playing music\n\n\`${prefix}queue\` **|** shows the music queue\n\n\`${prefix}volume\` **|** sets music volume\n\n\`${prefix}shuffle\` **|** shuffles the music queue\n\n\`${prefix}leave\` **|** bot leaves the channel`)
            .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL());
            message.channel.send(sEmbed)
            .then(m => m.delete({ timeout: 30000 }));
            return message.delete({ timeout: 30000 });
        }
    
        if(!args[0]) {

            const votee = bot.emojis.cache.get('727839620557176872');
            const discorde = bot.emojis.cache.get('727583787113775106');
            const invitee = bot.emojis.cache.get('727839620452319283');

        let sEmbed = new MessageEmbed()
        .setColor(orange)
        .setTitle("<:SUREchecklist:717057182046224414> Help List")
        .setThumbnail(bot.user.displayAvatarURL())
        .setDescription(`Type / **\`${prefix}help [section/module]\`** / for more informations..\n‎`)
        .addField(`${generale} General [11]`, "`bot-info`, `server-info`, `help`, `invite`, `patreon`, `report`, `support`, `topgg`/`vote`, `website`, `uptime`,`admins`", false)
        .addField(`${fune} Fun [20]`, "`afk`, `8ball`, `avatar`, `invert`, `ping`, `hug`, `kill`, `wave`, `caps`, `tell`, `snipe`, `embed`, `fakeban`, `kiss`, `love`, `meme`, `pat`, `slap`, `minesweeper`, `gping`", false)
        .addField(`${moderatione} Moderation [10]`, "`ban`, `unban`, `clear`, `createrole`, `deleterole`, `addrole`, `removerole`, `kick`, `warn`, `user-info`", false)
        .addField(`${musice} Music [8]`, "REPAIRING", false)
        .addField(`${levele} Leveling [2]`, "`rank`, `leaderboard`/`top`, - in progress ", false)
	    .addField(`${antiraide} AntiRaid [4]`, "`freeze`/`lock`, `unfreeze`/`unlock`, `mutevoice`/`mv`, `unmutevoice`/`unmv`", false)
	    .addField(`${utilse} Utils [9]`, "`setup`, `setup default`, `setup settings`, `setup logschannel`, `setup section`, `setprefix`, `resetprefix`, `resetxp`, `slowmode`", false)
        .addField(`${staffe} Bot Admins [8]`, "`eval`, `reloadcmd`, `shutdown`, `bai`, `blacklist`, `unblacklist`, `addadmin`, `removeadmin`", false)
        .addField(` ‏‏‎ `, `${invitee}  **[Invite](https://discord.com/oauth2/authorize?client_id=670963766850224159&scope=bot&permissions=2146958847)  •  ${discorde}  [Discord](https://discord.gg/9sDzhWD)  •  ${votee}  [Vote](https://top.gg/bot/670963766850224159)**`)
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL(), false);
    return message.channel.send(sEmbed)
     }
    }
}