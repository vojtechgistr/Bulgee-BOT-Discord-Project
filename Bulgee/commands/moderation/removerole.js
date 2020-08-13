const { MessageEmbed } = require('discord.js');
const { red_light } = require("../../colours.json");
const db = require("quick.db");
const moderation = require("../../botconfig.json");
const { default_prefix } = require('../../botconfig.json');
const { default_logs } = require('../../botconfig.json');
const { logs } = require('../../botconfig.json');

module.exports = {
    config: {
        name: "removerole",
        usage: "ok removerole",
        category: "moderation",
        accessableby: "Administrators"
    },
    run: async (bot, message, args) => {
      if(message.channel.type === "dm") return;
      
      let section = db.get(`moderation_${message.guild.id}`)
  if(section === null) section = moderation;
  if(section === "false") return;
  let prefix = db.get(`prefix_${message.guild.id}`)
        if(prefix === null) prefix = default_prefix;

        const embed1 = new MessageEmbed()
      .setTitle(':X: Error :X:')
      .setDescription("I don't have enough permissions to do this command. \n Please, give me permission -> ``MANAGE ROLES``")
      .setColor(0xd12828);

      const embed2 = new MessageEmbed()
      .setTitle(':X: Error :X:')
      .setDescription("You don't have enough permissions to use this command. \n - Required permission -> ``MANAGE ROLES``")
      .setColor(0xd12828);

          if (!message.guild.member(bot.user).hasPermission('MANAGE_ROLES')) {
            message.channel.send(embed1)
          .then(m => m.delete({ timeout: 7000 }));
          return message.delete({ timeout: 7000 });
          }

          if (!message.member.hasPermission("MANAGE_ROLES")) {
             message.channel.send(embed2)
          .then(m => m.delete({ timeout: 7000 }));
          return message.delete({ timeout: 7000 });
	}

	let member = message.mentions.members.first() || message.guild.members.cache.get(args[1]) || message.guild.members.cache.find(r => r.name === args[1]);
	let role = message.guild.roles.cache.find(r => r.name === args[1]) || message.guild.roles.cache.get(args[1]) || message.mentions.roles.first();
	if(args[0] === "user") {
		if(!member) {
			const embed = new MessageEmbed()
				.setDescription(`Please provide valid user`)

			return message.channel.send(embed);
}
if(!role) {
			const embed2 = new MessageEmbed()
				.setDescription(`Please provide valid role`)
return message.channel.send(embed2);
}

if(role.name === "@everyone" || role.name === "@here") {
		const embedlsss = new MessageEmbed()
				.setTitle(`:X: Error :X:`)
				.setColor(red_light)
				.setDescription(`You can't remove everyone/here role`);

	return message.channel.send(embedlsss)
}
		if(!member.roles.cache.has(role.id)) {
			const embed3 = new MessageEmbed()
				.setDescription(`This user doesn't has this role`)

			return message.channel.send(embed3);
	} else {
		try {
	await member.roles.remove(role);
const embed = new MessageEmbed()
				.setTitle(`<a:SUREcheckmark:715481264315957299> Done`)
				.setDescription(`The role **${role}** has been removed from ${member}`)

			message.channel.send(embed);

			let channellog = db.get(`logging_${message.guild.id}`)
            if(channellog === null) {
                channellog = default_logs;
            }
            if(channellog === "none") return;
            
        let section2 = db.get(`logs_${message.guild.id}`)
        if(section2 === null) section2 = logs;
        if(section2 === "false") return;
    let embeddw = new MessageEmbed()
    .setColor(red_light)
    .setAuthor(`Modlogs`)
    .setThumbnail(message.guild.iconURL())
    .addField("Moderation:", "RemoveRole")
    .addField("Removed from:", `${member.tag} [${member.id}]`)
    .addField("Moderator:", message.author.tag)
    .addField("Role:", `${role.name} [${role}]`)
    .addField("Date:", message.createdAt.toLocaleString())

    let lawdw = message.guild.channels.cache.get(channellog);
              return lawdw.send(embeddw);

} catch(err) {
	const embed33 = new MessageEmbed()
				.setDescription(`I don't have enough permissions to do this.. Maybe my role is below **${role}** role, please fix it.`)

			return message.channel.send(embed33);
	}
    }
} else if(args[0] === "all") {

		if(!role) {
			const embed2 = new MessageEmbed()
				.setDescription(`Please provide valid role`)
			return message.channel.send(embed2);
}
	if(role.name === "@everyone" || role.name === "@here") {
		const embedlss = new MessageEmbed()
				.setTitle(`:X: Error :X:`)
				.setColor(red_light)
				.setDescription(`You can't remove everyone/here role`);

	return message.channel.send(embedlss)
}

	try {
		const embedls = new MessageEmbed()
				.setTitle(`<a:Loading:652276785811161138> Removing role ${role.name} from all members..`)
				.setColor(red_light)
				.setDescription(`This will take a while..`);

	message.channel.send(embedls).then(async msg => {
		await message.guild.members.cache.filter(m => !m.user.bot).filter(m => m.roles.cache.has(role.id)).forEach(async n => {
			await n.roles.remove(role).then(async s => {
		let all = await message.guild.members.cache.filter(m => !m.user.bot).filter(async m => m.roles.cache.has(role.id)).size;
			const success = new MessageEmbed()
				.setTitle(`Done`)
				.setColor(red_light)
				.setDescription(`Successfully removed role **${role.name}** from **${all}** members`);
			msg.edit(success);

			let channellog = db.get(`logging_${message.guild.id}`)
            if(channellog === null) {
                channellog = default_logs;
            }
            if(channellog === "none") return;
            
        let section2 = db.get(`logs_${message.guild.id}`)
        if(section2 === null) section2 = logs;
        if(section2 === "false") return;
    let embeddw = new MessageEmbed()
    .setColor(red_light)
    .setAuthor(`Modlogs`)
    .setThumbnail(message.guild.iconURL())
    .addField("Moderation:", "Mass RemoveRole")
    .addField("Removed from:", `${all} members`)
    .addField("Moderator:", message.author.tag)
    .addField("Role:", `${role.name} [${role}]`)
    .addField("Date:", message.createdAt.toLocaleString())

    let lawdw = message.guild.channels.cache.get(channellog);
              return lawdw.send(embeddw);

});
});
});
} catch(err) {
	const embed3w3 = new MessageEmbed()
				.setDescription(`I don't have enough permissions to do this.. Maybe my role is below ${role}, please fix it.`)

			return message.channel.send(embed3w3);
	}
} else {
	const embedl = new MessageEmbed()
				.setTitle(`Invalid type provided`)
				.setColor(red_light)
				.setDescription(`**__Valid types__:**\n- user **>** ${prefix}removerole user [user] [role]\n- all **>** ${prefix}removerole all [role]`);

			return message.channel.send(embedl);
}
 }
}