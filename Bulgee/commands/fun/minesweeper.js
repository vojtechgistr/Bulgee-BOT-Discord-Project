const { MessageEmbed } = require("discord.js")
const { orange } = require("../../colours.json");
const db = require("quick.db")
const fun = require("../../botconfig.json")
const Minesweeper = require('discord.js-minesweeper');

module.exports = {
    config: {
        name: "minesweeper",
        description: "Minesweeper minigame",
        usage: "ok minesweeper",
        category: "fun",
        aliases: ["ms", "gminesweeper", "gms"],
        accessableby: "Members",
    },

    run: async (bot, message, args) => {
        if(message.channel.type === "dm") return;

        let section = db.get(`fun_${message.guild.id}`)
        if(section === null) section = fun;

        if(section === "false") return
        
        if(!args[0]) {
            const embed = new MessageEmbed()
                .setDescription("Please enter difficulty of the game!\n\n**__Valid difficulties__:**\n- easy\n- medium\n- hard")
                .setColor(orange)
                return message.channel.send(embed);
        }
        if(args[0] === "easy") {
            const rows = 5;
            const columns = 5;
            const mines = 5;
 
            const minesweeper = new Minesweeper({ rows, columns, mines });
            const matrix = minesweeper.start();
        
            return matrix
            ? message.channel.send(matrix)
            : message.channel.send(':warning: You have provided invalid data.');
                }
                if(args[0] === "medium") {
                    const rows = 8;
                    const columns = 8;
                    const mines = 12;
         
                    const minesweeper = new Minesweeper({ rows, columns, mines });
                    const matrix = minesweeper.start();
                
                    return matrix
                    ? message.channel.send(matrix)
                    : message.channel.send(':warning: You have provided invalid data.');
                        }
                        if(args[0] === "hard") {
                            const rows = 11;
                            const columns = 11;
                            const mines = 25;
                 
                            const minesweeper = new Minesweeper({ rows, columns, mines });
                            const matrix = minesweeper.start();
                        
                            return matrix
                            ? message.channel.send(matrix)
                            : message.channel.send(':warning: You have provided invalid data.');
                                }
}
}