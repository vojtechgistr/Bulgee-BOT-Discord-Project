const { MessageEmbed } = require('discord.js');
const { blue_light, red_light } = require('../../colours.json');
const db = require("quick.db");
const { default_prefix } = require('../../botconfig.json');

module.exports = { 
    config: {
        name: "slowmode",
        usage: "ok slowmode",
        category: "utils",
        accessableby: "Member",
        aliases: ["slow", "setslow", "setslowmode"]
    },
    run: async (bot, message, args) => {

        const warne = bot.emojis.cache.get('715481249082245141');

        let prefix = db.get(`prefix_${message.guild.id}`)
        if(prefix === null) prefix = default_prefix;

        const embed = new MessageEmbed()
            .setDescription(`You did not specify the time in seconds you wish to set this channel's slow mode too!\n\n${warne} **__Usage__:**\n\`${prefix}slowmode [seconds]\``)

        const em = new MessageEmbed()
            .setDescription(`Please provide an number! (seconds)\n\n${warne} **__Usage__:**\n\`${prefix}slowmode [seconds]\``)

        if(!args[0]) {
            message.channel.send(embed)
            .then(m => m.delete({ timeout: 10000 }))
            return message.delete({ timeout: 10000 });
        }
        if(isNaN(args[0])) {
            message.channel.send(em)
            .then(m => m.delete({ timeout: 10000 }))
            return message.delete({ timeout: 10000 });
        }
        let reason = args.slice(1).join(' ');
        if(!reason) reason = "- No reason given -";

        message.channel.setRateLimitPerUser(args[0], reason);

        const slow = new MessageEmbed()
            .setTitle(`⏰ Slowmode set`)
            .setDescription(`Slowmode has been set to **\`${args[0]}\`**\`seconds\`\n\n[ ${message.author} ]`)
            .setColor(blue_light)

        message.channel.send(slow)
        message.delete()

        const logs = require('../../botconfig.json');
        const default_logs = require('../../botconfig.json');
  
          let channellog = db.get(`logging_${message.guild.id}`)
              if(channellog === null) {
                  channellog = default_logs;
              }
              if(channellog === "none") return;
              
          let section2 = db.get(`logs_${message.guild.id}`)
          if(section2 === null) section2 = logs;
          if(section2 === "false") return;
  
      let embeddw = new MessageEmbed()
      .setColor(red_light)
      .setAuthor(`Modlogs`)
      .setThumbnail(message.guild.iconURL())
      .addField("Moderation:", "Slowmode")
      .addField("Moderator:", message.author.tag)
      .addField("Reason", reason)
      .addField("Channel", message.channel)
      .addField("Date:", message.createdAt.toLocaleString())
  
      let lawdw = message.guild.channels.cache.get(channellog)
          return lawdw.send(embeddw)
    }
}