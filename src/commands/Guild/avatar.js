// Dependencies
const { MessageEmbed } = require('discord.js'),
	Command = require('../../structures/Command.js');

module.exports = class Avatar extends Command {
	constructor(bot) {
		super(bot, {
			name: 'avatar',
			guildOnly: true,
			dirname: __dirname,
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Displays user\'s avatar.',
			usage: 'avatar [user]',
			cooldown: 3000,
		});
	}

	// Run command
	async run(bot, message, args, settings) {
		// Get user
		const member = message.guild.getMember(message, args);

		// send embed
		const embed = new MessageEmbed()
			.setTitle(message.translate(settings.Language, 'GUILD/AVATAR_TITLE', member[0].user.tag))
			.setDescription(`${message.translate(settings.Language, 'GUILD/AVATAR_DESCRIPTION')}\n[png](${member[0].user.displayAvatarURL({ format: 'png', size: 1024 })}) | [jpg](${member[0].user.displayAvatarURL({ format: 'jpg', size: 1024 })}) | [gif](${member[0].user.displayAvatarURL({ format: 'gif', size: 1024, dynamic: true })}) | [webp](${member[0].user.displayAvatarURL({ format: 'webp', size: 1024 })})`)
			.setImage(`${member[0].user.displayAvatarURL({ dynamic: true, size: 1024 })}`);
		message.channel.send(embed);
	}
};
