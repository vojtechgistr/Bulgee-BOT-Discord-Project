const { default_prefix } = require('../../botconfig.json');
const db = require("quick.db");
const botconfig = require('../../botconfig.json')

module.exports = {
    config: {
  name: "reloadcmd",
  aliases: ["reload", "rc"],
  category: "admins",
    },
  run: async (bot, message, args) => {
    const admin = db.get(`admin_${message.author.id}`);
    if(admin === null) {
      db.set(`admin_${message.author.id}`, "False");
    }
  
      if(admin === "False") return message.react('❌');
      
      if(admin === "True") {
        let dir = args[0];

        let commandName = args[1];

        try {
          delete require.cache[
            require.resolve(`../${dir}/${commandName}.js`)
          ];
          bot.commands.delete(commandName);
          const pull = require(`../${dir}/${commandName}.js`);
          bot.commands.set(commandName, pull);
        } catch (e) {
          return message.channel.send(`Error!`);
        }
        return message.channel.send(`Command - ${args[0]}/**${args[1]}.js** has been reloaded.. <a:SUREcheckmark:715481264315957299>`)
      }
    }
    
}