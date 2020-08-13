const { MessageEmbed } = require("discord.js")
const { cyan } = require("../../colours.json");
const db = require("quick.db")
const basic = require("../../botconfig.json")

const moment = require('moment')

const flags = {
	DISCORD_EMPLOYEE: " <:DiscordTeamUser:724523233088372767> ",
	DISCORD_PARTNER: " <:Partner:725353301503246406> ",
	BUGHUNTER_LEVEL_1: " <:BugHunter:725354108931801138> ",
	BUGHUNTER_LEVEL_2: " <:BugHunter:725354108931801138> ",
	BUGHUNTER_LEVEL_3: " <:BugHunter:725354108931801138> ",
	HYPESQUAD_EVENTS: " <:hypeSquad:447098954350329858> ",
	HOUSE_BRAVERY: " <:HouseOfBravery:724536587798446101> ",
	HOUSE_BRILLIANCE: " <:HouseOfBrilliance:724536653133250570> ",
	HOUSE_BALANCE: " <:HouseOfBallance:724536623102164993> ",
	EARLY_SUPPORTER: " <:EarlySupporter:725355307718541430> ",
	TEAM_USER: " <:DiscordTeamUser:724523233088372767> ",
	VERIFIED_DEVELOPER: " <:VerifiredDeveloper:724536558572535849> "
}

module.exports = {
    config: {
        name: "user-info",
        description: "Pulls the user info!",
        usage: "ok user-info",
        category: "basic",
        accessableby: "Members",
        aliases: ["ui"]
    },

    run: async (bot, message, args) => {
        if(message.channel.type === "dm") return;

        let section = db.get(`basic_${message.guild.id}`)
        if(section === null) section = basic;

        if(section === "false") return
        
        const embed2 = new MessageEmbed()
        .setTitle(':X: Error :X:')
        .setDescription("You don't have enough permissions to use this command. \n - Required permission -> ``MANAGE MESSAGES``")
        .setColor(0xd12828)
        .setTimestamp();
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            message.channel.send(embed2)
            .then(m => m.delete({ timeout: 7000 }));
            message.delete({ timeout: 7000 });
            return;
        }

        let invalid = new MessageEmbed()
            .setDescription("Enter valid id or username!")
            .setColor(cyan);
        
        let cannotfind = new MessageEmbed()
            .setDescription("User is not on this server!")
            .setColor(cyan);

        let botuserlmao = new MessageEmbed()
            .setDescription("Bot is not a real person! Try someone else..")
            .setColor(cyan);


    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!args[0]) {
        message.channel.send(invalid)
        .then(m => m.delete({ timeout: 30000 }));
            message.delete({ timeout: 30000 });
            return;
    }

    if(!user) {
         message.channel.send(cannotfind)
        .then(m => m.delete({ timeout: 30000 }));
    message.delete({ timeout: 30000 });
    return;
    }

    if(user.user.bot) {
        message.channel.send(botuserlmao)
        .then(m => m.delete({ timeout: 30000 }));
            message.delete({ timeout: 30000 });
            return;
    }

    let userFlags = user.user.flags.toArray();

    let blacklist = await db.fetch(`blacklist_${user.id}`);
    if(blacklist === null) {
        await db.set(`blacklist_${user.id}`, "Not");
    }

    if(blacklist === "Blacklisted") blacklist = "Yes";
    if(blacklist === "Not") blacklist = "No";

    let status = user.presence.status;

    if(status === "idle") status = "<:Idle:725357191212695572> Idle"
    if(status === "dnd") status = "<:DND:725357190961168445> DND"
    if(status === "online") status = "<:Online:725357191304839258> Online"
    if(status === "offline") status = "<:Offline:725357191225409547> Offline"
    if(status === "invisible") status = "<:Invisible:725357194790567986> Invisible"
    if(status === "streaming") status = "<:Streaming:725357191065894925> Streaming"
    

    let sEmbed = new MessageEmbed()
        .setColor(cyan)
        .setTitle("User Informations)")
        .setThumbnail(user.user.displayAvatarURL)
        .addField("**Name:**", `${user.user.username}`, false)
        .addField("**Tag:**", `${user.user.discriminator}`, false)
        .addField("**ID:**", `${user.user.id}`, false)
	    .addField("**Avatar:**", `[Link to avatar](${user.user.displayAvatarURL({ dynamic: true })})`, false)
	    .addField("**Badges:**", `${userFlags.length ? userFlags.map(flag => flags[flag]).join("  ") : "None"}`, false)
        .addField("**Status:**", `${status}`, false)
        .addField("**Game:**", `${user.presence.game || 'Not playing a game'}`, false)
        .addField("**Blacklisted:**", `${blacklist}`, false)
        .addField('\u200b', '\u200b')
        .addField("**Joined on this server:**", moment(message.member.guild.members.cache.get(user.id).joinedAt).format("MMMM Do YYYY, h:mm:ss a"), false)
        .addField("**Account Created at:**", moment(message.member.guild.members.cache.get(user.id).user.createdAt).format("MMMM Do YYYY, h:mm:ss a"), false)
        .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL());
    message.channel.send(sEmbed);
    }
}