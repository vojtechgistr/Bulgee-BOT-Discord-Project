const { MessageEmbed } = require('discord.js');
const { orange } = require('..//..//colours.json');
const db = require("quick.db");

module.exports = {
    config: {
        name: "voicesay",
        accessableby: "Member",
        category: "music",
        aliases: ["vs"],
    },
    run: async (bot, message, args) => {
        let say = args.slice(0).join(' ')
        
    saySomething = new SaySomehting();
     
     //Say something
     saySomething.now(say);
     
     //When start talking
     saySomething.on('talking', function (text) {
       console.log("I'm saying: " + text);
     });
     
     //After stop talking
     saySomething.on('done', function () {
       console.log("I'm done talking");
     });
    }
}