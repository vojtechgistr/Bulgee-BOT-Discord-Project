const { MessageEmbed } = require('discord.js');
const { red_light } = require("../../colours.json");
const db = require("quick.db");
const antiraid = require("../../botconfig.json");

module.exports = {
    config: {
        name: "unfreeze",
        description: "UnFreezes current channel!",
        usage: "ok unfreeze",
        category: "antiraid",
        aliases: ["unlock"],
        accessableby: "Administrators",
    },
    run: async (bot, message, args) => {
        if(message.channel.type === "dm") return;

        let section = db.get(`antiraid_${message.guild.id}`)
        if(section === null) section = antiraid;

        if(section === "false") return
        
        const embed1 = new MessageEmbed()
        .setTitle(':X: Error :X:')
        .setDescription("I don't have enough permissions to use this command. \n Please, give me permission -> ``ADMINISTRATOR``")
        .setColor('#d12828');
        
        const embed2 = new MessageEmbed()
        .setTitle(':X: Error :X:')
        .setDescription("You don't have enough permissions to use this command. \n - Required permission -> ``MANAGE CHANNELS``")
        .setColor('#d12828');

            if (!message.guild.me.hasPermission('ADMINISTRATOR')) {
                message.channel.send(embed1)
                .then(msg => {msg.delete(7000)});
                return message.delete({ timeout: 7000 });
            }

            if (!message.member.hasPermission("MANAGE_CHANNELS")) {
                message.channel.send(embed2)
                .then(msg => {msg.delete(7000)});
                return message.delete({ timeout: 7000 });
            }


            const embed = new MessageEmbed()
        .setTitle(":X: REOPENED :X:")
        .setTimestamp()
        .setColor(red_light)
        .setFooter(`Requested by ${message.author.tag}`)
        .setDescription(`This channel has been reopened\n\n[ ${message.author} ]`);

            await message.channel.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: true });
            message.channel.send(embed);

            const logs = require('../../botconfig.json') //
            const default_logs = require('../../botconfig.json') //default logs channel

        let channellog = db.get(`logging_${message.guild.id}`)
            if(channellog === null) {
                channellog = default_logs;
            }
            if(channellog === "none") {
                return;
            }
                let section2 = db.get(`logs_${message.guild.id}`) //section logs - on/off
                if(section2 === null) section2 = logs;
                if(section2 === "false") return;
        
            let embeddw = new MessageEmbed()
            .setColor(red_light)
            .setAuthor(`Modlogs`)
            .setThumbnail(message.guild.iconURL())
            .addField("Moderation:", "Unfreeze")
            .addField("Channel", `${message.channel}`)
            .addField("Moderator:", message.author.tag)
            .addField("Date:", message.createdAt.toLocaleString())
            
            let lawdw = message.guild.channels.cache.get(channellog)
            lawdw.send(embeddw)   
    }
}