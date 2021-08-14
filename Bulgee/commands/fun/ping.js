const db = require("quick.db");
const basic = require("../../botconfig.json");

module.exports = {
    config: {
        name: "ping",
        usage: "ok ping",
        category: "basic",
        accessableby: "Members",
    },

    run: async (bot, message, args) => {
        if(message.channel.type === "dm") return;

        let section = db.get(`basic_${message.guild.id}`)
        if(section === null) section = basic;

        if(section === "false") return;

        message.channel.send(`<a:Loading:652276785811161138> Pinging..`).then(m => {
            let ping = m.createdTimestamp - message.createdTimestamp;
            m.edit(`Bot's ping is \`${ping}ms\`!\n\nOh sorry.. You maybe thought ping-pong minigame.. <a:SUREbearymad:718488090045448232>\nTry \`gping\` command!`)
        })

}
}