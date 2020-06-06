const { MessageEmbed } = require("discord.js")
const { red_light } = require("../../colours.json");

module.exports = {
    config: {
        name: "clear",
        description: "Clears the chat.",
        usage: "ok clear",
        category: "moderation",
        accessableby: "Administrators",
    },
    run: async (bot, message, args) => {
if (message.deletable) {
    message.delete();
}

const embed1 = new MessageEmbed()
    .setTitle(':X: Error :X:')
    .setDescription("I don't have enough permissions to do this command. \n - Please, give me permission -> ``MANAGE CHANNELS``")
    .setColor(0xd12828)
    const embed2 = new MessageEmbed()
    .setTitle(':X: Error :X:')
    .setDescription("You don't have enough permissions to use this command. \n - Required permission -> ``MANAGE CHANNELS``")
    .setColor(0xd12828)
    const embed3 = new MessageEmbed()
    .setDescription('The number of messages cant contain letters or punctuation!')
    .setColor(0xd12828)
    const embed4 = new MessageEmbed()
    .setDescription('Write number from **1** to **100**!')
    .setColor(0xd12828)


if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    return message.channel.send(embed).then(m => m.delete({ timeout: 5000 }));
}

if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
    return message.channel.send(embed1).then(m => m.delete({ timeout: 5000 }));
}

if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
    return message.channel.send(embed3).then(m => m.delete({ timeout: 5000 }));
}


let deleteAmount = parseInt(args[0]);

if (parseInt(args[0]) > 100) {
    deleteAmount = 100;
} else {
    deleteAmount = parseInt(args[0]) + 1;
}

const suremark = bot.emojis.cache.get("715481264315957299");

const surewarn = bot.emojis.cache.get("715481249082245141");

await message.channel.bulkDelete(deleteAmount, true)
   .then(deleted => message.channel.send(`${suremark} Deleted \`${deleted.size - 1}\` messages.`)).then(m => m.delete({ timeout: 20000 })).catch(error =>{

   if(error.code === 10008) {
    const errorembed2 = new MessageEmbed()
    .setDescription(`${surewarn} Somethink went wrong..`)
    .setColor(red_light);

    return message.channel.send(errorembed2).then(m => m.delete({ timeout: 5000 }));
} else if(error.code === 50034) {
    const errorembed2 = new MessageEmbed()
    .setDescription(`${surewarn} Because of Discord limitations I can't delete messages past 2 weeks! \n(or I can't delete nothing..)`)
    .setColor(red_light);

    return message.channel.send(errorembed2);
 } else {
    const errorembed3 = new MessageEmbed()
    .setDescription(`Write number from **1** to **100**!`)
    .setColor(red_light);

 return message.channel.send(errorembed3);
}
})}
}