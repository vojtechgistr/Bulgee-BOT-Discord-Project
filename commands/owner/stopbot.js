const { token } = require("../../botconfig.json");

module.exports = {
    config: {
        name: "stopbot",
        description: "stops a bot!",
        usage: "ok stopbot",
        category: "owner",
        accessableby: "Bot Owner",
        aliases: ["cstop"]
    },
    run: async (bot, message, args) => {

        if(message.author.id != "484448041609199620") return;
            console.clear();
            console.log("Shutting down..");
            await message.channel.send("Shutting down..");
            bot.destroy()
     return;

    }
}