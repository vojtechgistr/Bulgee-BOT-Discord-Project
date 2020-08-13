const Giveaway = require('./database/model/Giveaway');
const schedule = require('node-schedule');

async function saveGiveaway(response) {
    const {
        title, prize, winners, duration, guildId, messageId, channelId, endsOn
    } = response;
    const giveaway = new Giveaway({
        guildId,
        messageId,
        channelId,
        title,
        prize,
        winners,
        duration,
        endsOn,
        createdOn: new Date(),
    });
    return giveaway.save();
}

async function scheduleGiveaways(bot, giveaways) {
    for(let i = 0; i < giveaways.length; i++){
        const { channelId, messageId, endsOn } = giveaways[i];
        console.log('Scheduling job for' + endsOn);
        schedule.scheduleJob(endsOn, async () => {
            const channel = bot.channels.cache.get(channelId);
            if(channel) {
                const message = await channel.messages.fetch(messageId);
                if(message) {
                    const { embeds, reactions } = message;
                    const reaction = reactions.cache.get('🎉');
                    const users = await reaction.users.fetch(); // getAllUsers(reaction);
                    const entries = users.filter(user => !user.bot).array();
                    const winner = entries[0];
                    if(embeds.length === 1) {
                        const embed = embeds[0];
                        let winners = determineWinners(entries, giveaways[i].winners);
                        winners = winners.map(user => user.toString()).join(' ');
                        embed.setDescription(`~~${embed.description}~~\n**WINNER(S):** ${winner}`)
                        await message.edit(embed);
                }
                }
            }            
        });
    }
}

function determineWinners(users, max) {
    if(users.length <= max) return users;
    const numbers = new Set();
    const winnersArray = [];
    let i = 0;
    while (i < max) {
        const random = Math.floor(Math.random() * users.length);
        const selected = users[random];
        if(!numbers.has(random)) {
            winnersArray.push(selected);
            i++;
        }
    }
    return winnersArray;
}

async function getAllUsers(reaction) {
    let entries = [];
    let users = await reaction.users.fetch({ after: id });
    entries = entries.concat(users);
    while(users.size === 100) {
        const { id } = users.last();
        users = await reaction.users.fetch({ after: id });
        entries = entries.concat(users);
    }
    return entries;
}

module.exports = {
    saveGiveaway,
    scheduleGiveaways
}