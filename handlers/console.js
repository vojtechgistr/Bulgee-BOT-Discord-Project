module.exports = (bot) => {
    let prompt = process.openStdin()
    prompt.addListener("data", res => {
        let x = res.toString().trim().split(/ +/g)
            bot.channels.cache.get("717292780149538836").send(x.join(" "));
        });
    }