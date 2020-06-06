const { token } = require("../../botconfig.json");

module.exports = {
    config: {
        name: "reloadbot",
        description: "reloads a bot!",
        usage: "ok reloadbot",
        category: "owner",
        accessableby: "Bot Owner",
        aliases: ["creloadbot"]
    },
    run: async (bot, message, args) => {

        if(message.author.id != "484448041609199620") return;
            console.clear();
            console.log("Bot is now reloading!");
            bot.destroy()
            await bot.login(token);
            await message.channel.send("Bot has been sucesfully reloaded!");
     return;

    }
}