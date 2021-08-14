const { MessageEmbed } = require('discord.js');
const beautify = require('beautify');
const db = require('quick.db');

module.exports = {
    config: {
        name: "eval",
        usage: "ok eval",
        category: "admins",
        accessableby: "Administrators",
    },
    run: async (bot, message, args) => {
      const admin = db.get(`admin_${message.author.id}`);
      if(admin === null) {
        db.set(`admin_${message.author.id}`, "False");
      }
    
        if(admin === "False") return message.react('❌');
        
        if(admin === "True") {
        
        if(!args[0]) {
          return message.channel.send(`Please enter action what you wanna evault!`)
        }

        try {
          if(args.join(" ").toLowerCase().includes("token")) {
            return;
          }
          const toEval = args.join(" ");
          const evaulted = eval(toEval);

          let embed = new MessageEmbed()
          .setTitle("<:SUREstaff:724523233088372767> Eval")
          .addField(`To evaluate`, `\`\`\`js\n${beautify(args.join(" "), { format: "js"})}\n\`\`\``)
          .addField(`Evaulted:`, evaulted)
          .addField(`Type of:`, typeof(evaulted))
          .setFooter(bot.user.username, bot.user.displayAvatarURL());
          return message.channel.send(embed);
        } catch (e) {
          let embed2 = new MessageEmbed()
          .setTitle(":X: Error :X:")
          .setDescription(e)
          .setFooter(bot.user.username, bot.user.displayAvatarURL());
          return message.channel.send(embed2)
        }
       

      }
      }
}