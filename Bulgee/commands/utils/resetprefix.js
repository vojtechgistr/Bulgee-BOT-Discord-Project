const { MessageEmbed } = require("discord.js");
const db = require('quick.db');
const { default_prefix } = require('../../botconfig.json');
const { blue_light, red_light } = require('../../colours.json');

module.exports = {
    config: {
        name: "resetprefix",
        category: "utils",
        asseccableby: "Administrators",
        usage: "ok resetprefix"
    },
    run: async (bot, message, args) => {
        let prefix = db.get(`prefix_${message.guild.id}`)
        if(prefix === null) prefix = default_prefix;

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
            
            if(prefix === default_prefix) {
                const awd = new MessageEmbed()
                .setDescription(`Default prefix is \`${default_prefix}\`, so you cannot reset default prefix!`)
                .setColor(0xd12828)
                return message.channel.send(awd)
            }
            db.delete(`prefix_${message.guild.id}`)
            db.set(`prefix_${message.guild.id}`, "ok ")

        const embed223 = new MessageEmbed()
            .setDescription(`Prefix is now set on default -> \`ok \`\n\nTo set custom prefix type \`${prefix}setprefix [new prefix]\` into the chat`)
            .setTitle(`<a:SUREcheckmark:715481264315957299> Done`)
            .setColor(blue_light)

        message.channel.send(embed223);

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
          .addField("Moderation:", "ResetPrefix")
          .addField("Old prefix:", prefix)
          .addField("Moderator:", message.author.tag)
          .addField("Changed in channel:", message.channel)
          .addField("Date:", message.createdAt.toLocaleString())
      
          let lawdw = message.guild.channels.cache.get(channellog)
              return lawdw.send(embeddw)
    }
}