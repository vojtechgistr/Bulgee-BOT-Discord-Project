const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
  name: "server-list",
  aliases: ["list"],
  category: "info",
  description: "Returns list of servers where Bulgee is",
    },
  run: async (bot, message, args) => {
    if (message.author.id !== "484448041609199620") return;

        var guildsMapped = bot.guilds.cache.map(guild => `${guild.name} - *OWNER  >>   ${guild.owner.user.username}#${guild.owner.user.discriminator}*`).join("\n");
        message.channel.send(`__**List of all server, where Bulgee is:**__ \n\n${guildsMapped}`);
  }
}