const { MessageEmbed } = require('discord.js');
const { red_light } = require("../../colours.json");
const db = require("quick.db");

module.exports = {
    config: {
        name: "blackusers",
        usage: "ok blackusers",
        category: "admins",
        accessableby: "Administrators"
    },
    run: async (bot, message, args) => {
      if(message.channel.type === "dm") return;
      const admin = db.get(`admin_${message.author.id}`);
      if(admin === null) {
        db.set(`admin_${message.author.id}`, "False");
      }
    
        if(admin === "False") return message.react('❌');
        
        if(admin === "True") {

          let bl = db.get("blacklistedusers");
          if(bl === null) {
            bl = "Nobody is blacklisted";
            let embed = new MessageEmbed()
            .addField('List of users that are blacklisted:', bl, false)
            .setColor("#000");
            return message.channel.send(embed);
          } else {
            let string = "";
            bl.forEach(blacklisted => {
              const member = bot.users.cache.get(blacklisted.user);
              if(member === undefined) member = "-"
              string += ` \n<:DiscordHex:727583787113775106>` + member.tag + ` **[**${blacklisted.user}**]**` + '\n';
            });
            let embed2 = new MessageEmbed()
            .addField(`List of users that are blacklisted:`, string, false)
            .setColor("#000")
        
            return message.channel.send(embed2)
          }

            
    }
    
    }
}
