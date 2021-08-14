const { MessageEmbed } = require("discord.js")
const { orange } = require("../../colours.json");
const db = require("quick.db")
const fun = require("../../botconfig.json")
const cheerio = require('cheerio');
const request = require('request');

module.exports = {
    config: {
        name: "duck",
        usage: "ok duck",
        category: "fun",
        accessableby: "Members",
    },

    run: async (bot, message, args) => {
        if(message.channel.type === "dm") return;

        let section = db.get(`fun_${message.guild.id}`)
        if(section === null) section = fun;

        if(section === "false") return

        function image(message) {
		var options = {
			url: "https://results.dogpile.com/serp?qc=images&q=" + "duck",
			method: "GET",
			headers: {
				"Accept": "text/htm",
				"User-Agent": "Chrome"
	    }
	};

	request(options, function(error, response, responseBody) {
		if(error) return;
		$ = cheerio.load(responseBody);

		var links = $(".image a.link");
		var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));

		if(!urls.length) return;

		message.channel.send( urls[Math.floor(Math.random() * urls.length)]);
})


}

}
}