const db = require('quick.db');
const levels = require("../../botconfig.json")
const { MessageEmbed } = require('discord.js');
const { default_prefix } = require('../../botconfig.json')
const { red_light } = require("../../colours.json");
const { blue_light } = require("../../colours.json");

module.exports = {
	config: {
	   name: "resetxp",
	   usage: "ok resetxp",
	   category: "leveling",
	   aliases: ["rx"]
},
run: async (bot, message, args) => {
	if(message.channel.type === "dm") return;
	
    let section = db.get(`levelsd_${message.guild.id}`)
        if(section === null) section = levels;

		if(section === "false") return;
		
        const embed1 = new MessageEmbed()
        .setTitle(':X: Error :X:')
        .setDescription("I don't have enough permissions to do this command. \n Please, give me permission -> ``MANAGE MEMBERS``")
        .setColor(0xd12828)
        const embed2 = new MessageEmbed()
        .setTitle(':X: Error :X:')
        .setDescription("You don't have enough permissions to use this command. \n - Required permission -> ``MANAGE SERVER``")
        .setColor(0xd12828)
            if (!message.guild.me.hasPermission(['MANAGE_MEMBERS'])) return message.channel.send(embed1);
            if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(embed2);

            let prefix = db.get(`prefix_${message.guild.id}`)
            if(prefix === null) prefix = default_prefix;

    if(!args[0]) {
        const embed = new MessageEmbed()
            .setDescription(`Usage:\n\n__Usage:__\n\`${prefix}resetxp [member/member ID]\``)
            .setColor(blue_light)
        return message.channel.send(embed);
        }

        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if(!args[0] || !user) {
            const embed = new MessageEmbed()
                .setDescription(`Please provide valid user!`)
                .setColor(blue_light)
            return message.channel.send(embed);
            
            }

            if(user.user.bot) {
                const embed = new MessageEmbed()
                    .setDescription(`Wth bro, bots can't earn xp`)
                    .setColor(blue_light)
                return message.channel.send(embed);
                
                }

        const key = `${message.guild.id}-${user.id}`;
        bot.ls.get(key);

        bot.ls.delete(`${message.guild.id}-${user.id}`);
    
        const embed = new MessageEmbed()
            .setDescription(`<a:SUREcheckmark:715481264315957299> All ${user}'s data [XP] has been reseted!`)
            .setColor(blue_light)
        message.channel.send(embed);
        
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
      .addField("Moderation:", "ResetXP")
      .addField("User", `${user.user.tag} **[**${user.id}**]**`)
      .addField("Moderator:", message.author.tag)
      .addField("Date:", message.createdAt.toLocaleString())
  
      let lawdw = message.guild.channels.cache.get(channellog)
          return lawdw.send(embeddw)
}
}