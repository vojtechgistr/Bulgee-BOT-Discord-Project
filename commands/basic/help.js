const { MessageEmbed } = require("discord.js")
const { orange } = require("../../colours.json");

module.exports = {
    config: {
        name: "help",
        description: "Shows help command list!",
        usage: "ok help",
        category: "basic",
        accessableby: "Members",
        aliases: ["mhelp"]
    },

    run: async (bot, message, args) => {

        if(args[0] === "basic") {
            let sEmbed = new MessageEmbed()
            .setColor(orange)
            .setTitle("<:SUREchecklist:717057182046224414> Basic/Fun - Help List")
            .setDescription("PREFIX -> ``ok``")
            .addField('\u200b', '\u200b')
            .setThumbnail(bot.user.displayAvatarURL())
            .addField("**help/ping bot**", `- shows help page`, false)
            .addField("**ping**", `- ping pong minigame`, false)
            .addField("**server-info**", `- shows server informations`, false)
            .addField("**user-info [member/id]**", `- shows user informations of entered __[PERMISSIONS REQUIRED]__`, false)
            .addField("**bot-info**", `- shows bot informations`, false)
            .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL());
            message.channel.send(sEmbed)
            .then(m => m.delete({ timeout: 30000 }));
            message.delete({ timeout: 30000 });
        }

        if(args[0] === "moderation") {
            const embed2 = new MessageEmbed()
            .setTitle(':x: Error :x:')
            .setDescription("You don't have enough permissions to use this command. \n - Required permission -> ``MANAGE CHANNELS``")
            .setColor(0xd12828)
            .setTimestamp();
            if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(embed2)
            .then(m => m.delete({ timeout: 30000 }));
            message.delete({ timeout: 30000 });

            let sEmbed = new MessageEmbed()
            .setColor(orange)
            .setTitle("<:SUREchecklist:717057182046224414> Moderation - Help List")
            .setDescription("PREFIX -> ``ok``")
            .addField('\u200b', '\u200b')
            .setThumbnail(bot.user.displayAvatarURL())
            .addField("**freeze**", `- freeze current channel / disable writing messages to everyone`, false)
            .addField("**unfreeze**", `- unfreeze current channel / enable writing messages to everyone`, false)
            .addField("**clear [num]**", `- delete entered number of messages`, false)
            .addField("**ban/unban [member/id]**", `- ban/unban mentioned member`, false)
            .addField("**kick [member/id]**", `- kick mentioned member`, false)
            .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL());
            message.channel.send(sEmbed)
            .then(m => m.delete({ timeout: 30000 }));
            message.delete({ timeout: 30000 });
        }

        if(args[0] === "music") {
            let sEmbed = new MessageEmbed()
            .setColor(orange)
            .setTitle("<:SUREchecklist:717057182046224414> Music - Help List")
            .setDescription("PREFIX -> ``ok``")
            .addField('\u200b', '\u200b')
            .setThumbnail(bot.user.displayAvatarURL())
            .addField("**play [song/link]**", `- plays entered song`, false)
            .addField("**pause/resume**", `- pauses/resumes the music`, false)
            .addField("**stop**", `- stops the music`, false)
            .addField("**skip/next**", `- skips current song`, false)
            .addField("**np/now**", `- shows now playing music`, false)
            .addField("**queue**", `- shows the music queue`, false)
            .addField("**volume**", `- sets music volume`, false)
            .addField("**shuffle**", `- shuffles the music queue`, false)
            .addField("**leave**", `- bot leaves the channel`, false)
            .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL());
            message.channel.send(sEmbed)
            .then(m => m.delete({ timeout: 30000 }));
            message.delete({ timeout: 30000 });
        }
    
        if(!args[0]) {
        let sEmbed = new MessageEmbed()
        .setColor(orange)
        .setTitle("<:SUREchecklist:717057182046224414> Help List")
        .setThumbnail(bot.user.displayAvatarURL())
        .setDescription("Type / **ok help [type]** / for help list into the chat \n  ‏‏‎ ‎")
        .addField("**__ok help basic__**", `- shows basic and fun commands`, false)
        .addField("**__ok help music__**", `- shows all music commands`, false)
        .addField("**__ok help moderation__**", `- shows commands for moderators __[PERMISSIONS REQUIRED]__`, false)
        .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL(), false);
    message.channel.send(sEmbed);
     }
    }
}