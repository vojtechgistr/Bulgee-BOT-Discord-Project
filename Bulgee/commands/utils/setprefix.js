const { MessageEmbed } = require("discord.js");
const { red_dark } = require("../../colours.json");
const { default_prefix } = require('../../botconfig.json');
const db = require('quick.db');
const { blue_light, red_light } = require("../../colours.json");

module.exports = {
    config: {
        name: "setprefix",
        category: "utils",
        asseccableby: "Administrators",
        usage: "ok setprefix"
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

        const embed = new MessageEmbed()
            .setDescription(`Current prefix is -> \`${prefix}\`\n\nTo set custom prefix type \`${prefix}setprefix [new prefix]\` into the chat`)
            .setColor(blue_light)

        if(!args[0]) return message.channel.send(embed);

        const embedq2 = new MessageEmbed()
            .setDescription(`Entered prefix is too long! Max number of characters is 4`)
            .setColor(blue_light)

        if(args[0].length > 4) return message.channel.send(embedq2);

        db.delete(`prefix_${message.guild.id}`)
        db.set(`prefix_${message.guild.id}`, args[0])

        const embed223 = new MessageEmbed()
            .setDescription(`Prefix is now set on -> \`${args[0]}\`\n\nTo restore default type \`${args[0]}resetprefix\` into the chat`)
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
          .addField("Moderation:", "SetPrefix")
          .addField("Old prefix:", prefix)
          .addField(`New prefix:`, args[0])
          .addField("Moderator:", message.author.tag)
          .addField("Changed in channel:", message.channel)
          .addField("Date:", message.createdAt.toLocaleString())
      
          let lawdw = message.guild.channels.cache.get(channellog)
              return lawdw.send(embeddw)
    }
}