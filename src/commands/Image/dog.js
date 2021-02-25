// Dependencies
const { MessageEmbed } = require('discord.js'),
	fetch = require('node-fetch'),
	Command = require('../../structures/Command.js');

module.exports = class Dog extends Command {
	constructor(bot) {
		super(bot, {
			name: 'dog',
			dirname: __dirname,
			aliases: ['woof'],
			botPermissions: [ 'SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Have a nice picture of a dog.',
			usage: 'dog',
			cooldown: 3000,
		});
	}

	// Run command
	async run(bot, message, args, settings) {
		const res = await fetch('https://nekos.life/api/v2/img/woof').then(info => info.json()).catch(err => {
			// An error occured when looking for image
			bot.logger.error(`${err.message}`);
			message.error(settings.Language, 'ERROR_MESSAGE').then(m => m.delete({ timeout: 5000 }));
			message.delete();
			return;
		});

		// send image
		const embed = new MessageEmbed()
			.setImage(res.url);
		message.channel.send(embed);
	}
};
