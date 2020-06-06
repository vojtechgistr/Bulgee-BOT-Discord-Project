const { MessageEmbed } = require("discord.js")
const { green_dark } = require("../../colours.json");

module.exports = {
    config: {
        name: "pingpong",
        description: "Pong!",
        usage: "ok pingpong",
        category: "fun",
        accessableby: "Members",
        aliases: ["gping"]
    },

    run: async (bot, message, args) => {
        const challenger = message.author;
        const receiver = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if(!receiver) {

            let error = new MessageEmbed()
            .setDescription("You have to mention user or provide his ID! \n\n**Type ->** ok pingpong [mention/id]")
            .setColor(green_dark);
            message.channel.send(error).then(m => m.delete({ timeout: 7000 }));
            message.delete({ timeout: 7000 });
            return;
        }

        if(receiver.id === challenger.id) {
            let error = new MessageEmbed()
            .setDescription("You can't challenge yourself!")
            .setColor(green_dark);
            message.channel.send(error).then(m => m.delete({ timeout: 7000 }));
            message.delete({ timeout: 7000 });
            return;
        }

        if(receiver.user.bot) {
            let error = new MessageEmbed()
            .setDescription("You can't challenge a bot!")
            .setColor(green_dark);
            message.channel.send(error).then(m => m.delete({ timeout: 7000 }));
            message.delete({ timeout: 7000 });
            return;
        }

        if(receiver) {
            message.channel.send(`${challenger} challenged ${receiver} to ping-pong match! \n\n**${receiver} type \`accept\` into the chat to accept challenge!**`)

            message.channel.awaitMessages(message => receiver.id == message.author.id,
                {max: 1, time: 30000}).then(collected => {
                        if (collected.first().content.toLowerCase() == 'accept') {
                            let tutorial = new MessageEmbed()
                            .setTitle("> Game Tutorial <")
                            .setDescription(`After the start, you have to play ping-pong like in real life.\n\n    **__Player replyes__**: \n    ${challenger} is typing - \`pong\` \n ${receiver} is typing - \`ping\``)
                            .setColor(green_dark)
                            .setTimestamp()
                            .setFooter("Game starts in 20 seconds..");
    
                        message.channel.send(tutorial);

                        setTimeout(async() => {
                                await message.channel.send("<:clear5:718557254063751294><:clear4:718557243032862800><:clear3:718557243045314581><:clear2:718557243066286100><:clear1:718557243020279898>").then(async msg => {
                                    await msg.edit("<:clear5:718557254063751294><:clear4:718557243032862800><:clear3:718557243045314581><:clear2:718557243066286100><:clear1:718557243020279898>").then(async msg => {
                                        await msg.edit("<:clear5:718557254063751294><:clear4:718557243032862800><:clear3:718557243045314581><:clear2:718557243066286100><:clear1:718557243020279898>").then(async msg => {
                                    await msg.edit("<:clear5:718557254063751294><:clear4:718557243032862800><:clear3:718557243045314581><:clear2:718557243066286100><:1ping:718555471987867679>").then(async msg => {
                                        await msg.edit("<:clear5:718557254063751294><:clear4:718557243032862800><:clear3:718557243045314581><:clear2:718557243066286100><:2ping:718555471933341706>").then(async msg => {
                                            await msg.edit("<:clear5:718557254063751294><:clear4:718557243032862800><:clear3:718557243045314581><:3ping:718555471950250065><:clear1:718557243020279898>").then(async msg => {
                                                await msg.edit("<:clear5:718557254063751294><:clear4:718557243032862800><:clear3:718557243045314581><:4ping:718555472080142426><:clear1:718557243020279898>").then(async msg => {
                                                    await msg.edit("<:clear5:718557254063751294><:clear4:718557243032862800><:5ping:718555471728082975><:clear2:718557243066286100><:clear1:718557243020279898>").then(async msg => {
                                                        await msg.edit("<:clear5:718557254063751294><:clear4:718557243032862800><:6ping:718555471908176013><:clear2:718557243066286100><:clear1:718557243020279898>").then(async msg => {
                                                            await msg.edit("<:clear5:718557254063751294><:7ping:718555471660974124>><:clear3:718557243045314581><:clear2:718557243066286100><:clear1:718557243020279898>").then(async msg => {
                                                                await msg.edit("<:clear5:718557254063751294><:8ping:718555471996256277><:clear3:718557243045314581><:clear2:718557243066286100><:clear1:718557243020279898>").then(async msg => {
                                                                    await msg.edit("<:9ping:718555472013033623><:clear4:718557243032862800><:clear3:718557243045314581><:clear2:718557243066286100><:clear1:718557243020279898>").then(async msg => {
                                                                        await msg.edit("<:10ping:718555472008839178><:clear4:718557243032862800><:clear3:718557243045314581><:clear2:718557243066286100><:clear1:718557243020279898>")
                                                                   
                                                                    })
                                                                })
                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                        
                        }, 5000);
                
                    
                                                        
        
            } else {
                    message.reply('Challenge canceled..');
            }
                }).catch(() => {
                    const cancelled = new MessageEmbed
                    .setDescription("No answer after 30 seconds, challenge canceled..")
                    .setColor(green_dark)
                        message.channel.send(cancelled)
            })

        }


    }
}