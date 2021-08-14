const ms = require('ms');
const { MessageEmbed } = require('discord.js');
const { saveGiveaway, scheduleGiveaways } = require('../../giveaway.js');

const prompts = [
    "What title do you want to set for this giveaway?",
    "What are you giving away?",
    "How long do you want this giveaway to last? (__valid formats:__ s, m, h, d)",
    "How many people will win this giveaway?"
];

module.exports = {
    config: {
        name: "gcreate",
        usage: "ok gcreate",
        category: "giveaway",
        accessableby: "Administrators"
    },
    run: async (bot, message, args) => {
        const [id] = args;
        const channel = message.guild.channels.cache.get(id) || message.mentions.channels.first() ||  message.guild.channels.cache.find(c => c.name === args[0])
        if(channel) {
            try {
                const response = await getResponses(message);
                const embed = new MessageEmbed()
                    .addField('Title', response.title, true)
                    .addField('Prize', response.prize, true)
                    .addField('Number of Winners', response.winners, true)
                    .addField('Duration', response.duration, true)
                
                const msg = await message.channel.send('React to confirm', embed);
                await msg.react('👍')
                await msg.react('👎')

                const filter = (reaction, user) => ['👍', '👎'].includes(reaction.emoji.name) && !user.bot & user.id === message.author.id;
                const reactions = await msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
                const choice = reactions.get('👍') || reactions.get('👎');
                if(choice.emoji.name === '👍') {
                    response.endsOn = new Date(Date.now() + ms(response.duration));
                    const giveawayEmbed = new MessageEmbed()
                        .setTitle(response.title)
                        .setDescription(`**__Prize__:** ${response.prize}\n\nNumber of **__Winners__:** ${response.winners}\n\n**__Ends on__:** ${response.endsOn}\n\n**REACT WITH 🎉 TO ENTER**`)
                        .setFooter(`Hosted by ${message.author.tag}`)
                        .setThumbnail('https://cdn.discordapp.com/attachments/718555313808080957/726502953904766986/GiftGiveaway.png');
                        //const emoji = bot.emojis.cache.get('726461092187865139')
                        const giveawayMsg = await channel.send(giveawayEmbed);
                        await giveawayMsg.react('🎉')
                        response.messageId = giveawayMsg.id;
                        response.guildId = giveawayMsg.guild.id;
                        response.channelId = id;
                        await saveGiveaway(response);
                        await scheduleGiveaways(bot, [response]);
                } else if(choice.emoji.name === '👎') {
                    message.channel.send('Giveaway cancelled..').then(m => {
                        m.react('❌');
                    });
                }

            } catch(err) {
                console.log(err);
            }
        } else {
            const chann = new MessageEmbed()
                .setDescription('Please enter an valid channel name')

            message.channel.send(chann);
        }
    }
}

const time = new MessageEmbed()
    .setDescription('Invalid time format.. Try it again')

const value = new MessageEmbed()
    .setDescription('Invalid entry for winners.. Try it again')

async function getResponses(message) {
    const validTime = /^\d+(s|m|h|d)$/;
    const validNumber = /\d+/;
    const responses = { }

    for(let i = 0; i < prompts.length; i++) {
        await message.channel.send(prompts[i]);
        const response = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1 });
        const { content } = response.first();

        if(i === 0) responses.title = content;
        else if(i === 1) responses.prize = content;
        else if(i === 2) {
            if(validTime.test(content))
            responses.duration = content;
            else
            throw new Error('Invalid time format.. Try it again');
            }
            else if(i === 3) {
                if(validNumber.test(content))
                responses.winners = content;
                else
                    throw new Error('Invalid entry for winners.. Try it again')
            }
        }
        return responses;
    }