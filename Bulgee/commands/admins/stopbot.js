const { token } = require("../../botconfig.json");

module.exports = {
    config: {
        name: "stopbot",
        description: "stops a bot!",
        usage: "ok stopbot",
        category: "owner",
        accessableby: "Bot Owner",
        aliases: ["shutdown"]
    },
    run: async (bot, message, args) => {

        if(admin === null) {
            db.set(`admin_${message.author.id}`, "False");
        }
    
        if(admin === "False") return message.react('❌');
        
        if(admin === "True") {
            console.clear();
            console.log("Shutting down..");
            await message.channel.send("Shutting down..");
            bot.destroy()
     return;
        }
    }
}