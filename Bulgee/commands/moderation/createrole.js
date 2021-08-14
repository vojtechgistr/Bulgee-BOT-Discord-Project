const { MessageEmbed } = require('discord.js');
const { red_light } = require("../../colours.json");
const db = require("quick.db");
const moderation = require("../../botconfig.json");
const { default_prefix } = require('../../botconfig.json');
const { default_logs } = require('../../botconfig.json');
const { logs } = require('../../botconfig.json');

module.exports = {
    config: {
        name: "createrole",
        usage: "ok createrole",
        category: "moderation",
        accessableby: "Administrators"
    },
    run: async (bot, message, args) => {
      if(message.channel.type === "dm") return;
      

      let section = db.get(`moderation_${message.guild.id}`)
  if(section === null) section = moderation;

  if(section === "false") return

  let prefix = db.get(`prefix_${message.guild.id}`)
        if(prefix === null) prefix = default_prefix;
  
      const embed1 = new MessageEmbed()
      .setTitle(':X: Error :X:')
      .setDescription("I don't have enough permissions to do this command. \n Please, give me permission -> ``MANAGE ROLES``")
      .setColor(0xd12828)
      const embed2 = new MessageEmbed()
      .setTitle(':X: Error :X:')
      .setDescription("You don't have enough permissions to use this command. \n - Required permission -> ``MANAGE ROLES``")
      .setColor(0xd12828)
          if (!message.guild.member(bot.user).hasPermission('MANAGE_ROLES')) {
            message.channel.send(embed1)
          .then(m => m.delete({ timeout: 7000 }));
          return message.delete({ timeout: 7000 });
          }
          if (!message.member.hasPermission("MANAGE_ROLES")) {
             message.channel.send(embed2)
          .then(m => m.delete({ timeout: 7000 }));
          return message.delete({ timeout: 7000 });
          }

      if(!args[0]) {
          const em = new MessageEmbed()
            .setDescription(`<:SUREwarning:715481249082245141> **__Usage__:**\n\`${prefix}createrole [#HEXcolor] [role name]\``)
            .setColor(red_light)
            return message.channel.send(em)
      }

      if(!args[1]) {
        const em = new MessageEmbed()
          .setDescription(`<:SUREwarning:715481249082245141> **__Usage__:**\n\`${prefix}createrole [#HEXcolor] [role name]\``)
          .setColor(red_light)
          return message.channel.send(em)
    }

    if(!message.content.includes('#')) {
        const em = new MessageEmbed()
          .setDescription(`Please use HEX color! Like: [#2d8feb](https://www.google.com/search?sxsrf=ALeKk00k2so1jE42o8v1LxeIKKjeNDIHOA%3A1593077685264&source=hp&ei=tW_0XpvSDYCSjLsP2a2V2As&q=hex+color&oq=hex+color&gs_lcp=CgZwc3ktYWIQAzIECCMQJzICCAAyAggAMgIIADICCAAyAggAMgIIADICCAAyAggAMgIIADoHCCMQ6gIQJzoFCAAQsQM6BQgAEIMBUKQOWJEWYLgXaAFwAHgAgAF0iAGJB5IBAzUuNJgBAKABAaoBB2d3cy13aXqwAQo&sclient=psy-ab&ved=0ahUKEwjbgJzs1JzqAhUACWMBHdlWBbsQ4dUDCAc&uact=5)`)
          .setColor(red_light)
          return message.channel.send(em)
    }

        let nam = args.slice(1).join(" ");
    
      await message.guild.roles.create({ data: { color: args[0], name: nam } });

      const role = message.guild.roles.cache.find(c => c.name === nam);

      const embed = new MessageEmbed()
      .setTitle("Role Created")
      .setTimestamp()
      .setColor(red_light)
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
      .setDescription(`Role ${role} has been created..`);

        message.channel.send(embed);
        message.delete();
        
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
    .addField("Moderation:", "Create Role")
    .addField("Moderator:", message.author.tag)
    .addField(`Role Name:`, role.name)
    .addField(`Mention:`, role)
    .addField(`ID:`, role.id)
    .addField(`HEX Color:`, args[0])
    .addField(`Mentionable:`, role.mentionable)
    .addField("Created at:", message.createdAt.toLocaleString())

    let lawdw = message.guild.channels.cache.get(channellog)
        lawdw.send(embeddw)
    }
    
}