const { MessageEmbed } = require('discord.js');
const { red_light } = require("../../colours.json");
const db = require("quick.db");
const moderation = require("../../botconfig.json");
const { default_prefix } = require('../../botconfig.json');
const { default_logs } = require('../../botconfig.json');
const { logs } = require('../../botconfig.json');

module.exports = {
    config: {
        name: "deleterole",
        usage: "ok deleterole",
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
            .setDescription(`<:SUREwarning:715481249082245141> **__Usage__:**\n\`${prefix}deleterole [role ID]\``)
            .setColor(red_light);            return message.channel.send(em);
      }


const role = message.guild.roles.cache.get(args[0]);
	
let invalid = new MessageEmbed()
	.setDescription(`This role does not exist..`);
if(!role) {
message.channel.send(invalid).then(m => m.delete({ timeout: 7000 }));
return message.delete({timeout: 7000})
}
      const embed = new MessageEmbed()
      .setTitle("Deleted Role")
      .setTimestamp()
      .setColor(red_light)
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
      .setDescription(`Role \`${role.name}\` has been deleted..`);

        message.channel.send(embed);
        role.delete();
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
    .addField("Moderation:", "Delete Role")
    .addField("Moderator:", message.author.tag)
    .addField(`Role:`, role.name)
    .addField(`ID:`, role.id)
    .addField("Created at:", message.createdAt.toLocaleString());

    let lawdw = message.guild.channels.cache.get(channellog);
        return lawdw.send(embeddw);
    }
    
}