const { MessageEmbed } = require("discord.js")
const { red_light } = require("../../colours.json");
const db = require("quick.db")
const moderation = require("../../botconfig.json")

module.exports = {
    config: {
        name: "clear",
        description: "Clears the chat.",
        usage: "ok clear",
        category: "moderation",
        accessableby: "Administrators",
    },
    run: async (bot, message, args) => {
        if(message.channel.type === "dm") return;
        let section = db.get(`moderation_${message.guild.id}`)
        if(section === null) section = moderation;

        if(section === "false") return

const embed1 = new MessageEmbed()
    .setTitle(':X: Error :X:')
    .setDescription("I don't have enough permissions to do this command. \n - Please, give me permission -> ``MANAGE CHANNELS``")
    .setColor(0xd12828)
    const embed2 = new MessageEmbed()
    .setTitle(':X: Error :X:')
    .setDescription("You don't have enough permissions to use this command. \n - Required permission -> ``MANAGE CHANNELS``")
    .setColor(0xd12828)
    const embed3 = new MessageEmbed()
    .setDescription('The number of messages cant contain letters or punctuation! \n\nWrite number from **1** to **100**!')
    .setColor(0xd12828)

if (!message.member.hasPermission("MANAGE_CHANNELS")) {
    message.channel.send(embed2).then(m => m.delete({ timeout: 10000 }));
    return message.delete({ timeout: 10000 })
}

if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) {
    message.channel.send(embed1).then(m => m.delete({ timeout: 10000 }));
    return message.delete({ timeout: 10000 })
}

if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
    message.channel.send(embed3).then(m => m.delete({ timeout: 10000 }));
    return message.delete({ timeout: 10000 })
}

await message.delete();

let deleteAmount = parseInt(args[0]);

if (parseInt(args[0]) > 100) {
    deleteAmount = 100;
} else {
    deleteAmount = parseInt(args[0]);
}

const suremark = bot.emojis.cache.get("715481264315957299");

const surewarn = bot.emojis.cache.get("715481249082245141");

await message.channel.bulkDelete(deleteAmount, true)
   .then(deleted => message.channel.send(`${suremark} Deleted **\`${deleted.size} messages.\`**`)).catch(error =>{

    if(error) {
     const errorembed2 = new MessageEmbed()
     .setDescription(`${surewarn} Somethink went wrong`)
     .setColor(red_light);
 
     return message.channel.send(errorembed2)
    }
    })
    const logs = require('../../botconfig.json') //
    const default_logs = require('../../botconfig.json') //default logs channel

    let channellog = db.get(`logging_${message.guild.id}`)
        if(channellog === null) {
            channellog = default_logs;
        }
        if(channellog === "none") return;
        
    let section2 = db.get(`logs_${message.guild.id}`) //section logs - on/off
    if(section2 === null) section2 = logs;
    if(section2 === "false") return;

    let embeddw = new MessageEmbed()
    .setColor(red_light)
    .setAuthor(`Modlogs`)
    .setThumbnail(message.guild.iconURL())
    .addField("Moderation:", "Clear")
    .addField("Channel", `${message.channel}`)
    .addField("Moderator:", message.author.tag)
    .addField("Date:", message.createdAt.toLocaleString())

let lawdw = message.guild.channels.cache.get(channellog)
    return lawdw.send(embeddw);
    }
   
}