const { Client, Collection } = require("discord.js");
const { MessageEmbed } = require('discord.js');
const { token } = require("./botconfig.json");
const bot = new Client();
const { orange } = require("./colours.json");

["aliases", "commands"].forEach(x => bot[x] = new Collection());
["console", "command", "event"].forEach(x => require(`./handlers/${x}`)(bot));

bot.on('message', async message => {
    if(message.content === "<@670963766850224159>" || message.content === "<@!670963766850224159>") {
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
})

bot.login(token);