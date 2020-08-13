const { MessageEmbed } = require('discord.js');
const Giveaway = require('../../database/model/Giveaway');
const { scheduleGiveaways } = require('../../giveaway');

module.exports = async bot => {
    console.log("-------------------------");
    console.log("    I AM READY TO GO     ");
    console.log("-------------------------");

    let own = bot.users.cache.get(`484448041609199620`)
    setInterval(function() {
     setTimeout(async() => {
        bot.user.setActivity('ok help | @Bulgee', { type: 'PLAYING'})
        setTimeout(async() => {
            bot.user.setActivity(`DEV - ${own.tag}`, { type: 'STREAMING', url: "https://www.twitch.tv/panvochechula"})
            setTimeout(async() => {
                bot.user.setActivity(`${bot.users.cache.size} users!`, { type: 'LISTENING'})
                setTimeout(async() => {
                    bot.user.setActivity(`${bot.guilds.cache.size} servers!`, { type: 'WATCHING'})
                }, 10000)
            }, 5000)
        }, 10000)
    }, 20000)
    }, 46000)

    const current = new Date();
    const giveaways = await Giveaway.find({
        endsOn: { $gt: current }
    });
    await scheduleGiveaways(bot, giveaways);
}