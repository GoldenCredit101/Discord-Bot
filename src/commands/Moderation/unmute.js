// Dependencies
const	Command = require('../../structures/Command.js');

module.exports = class Unmute extends Command {
	constructor(bot) {
		super(bot, {
			name:  'unmute',
			guildOnly: true,
			dirname: __dirname,
			aliases: ['un-mute'],
			botPermissions: [ 'SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Unmute a user.',
			usage: 'unmute <user> ',
			cooldown: 3000,
		});
	}

	// Run command
	async run(bot, message, args, settings) {
		// Delete message
		if (settings.ModerationClearToggle & message.deletable) message.delete();

		// Check if user can mute users
		if (!message.member.hasPermission('MUTE_MEMBERS')) return message.error(settings.Language, 'USER_PERMISSION', 'MUTE_MEMBERS').then(m => m.delete({ timeout: 10000 }));

		// check if bot can add 'mute' role to user
		if (!message.guild.me.hasPermission('MANAGE_ROLES')) {
			bot.logger.error(`Missing permission: \`MANAGE_ROLES\` in [${message.guild.id}].`);
			return message.error(settings.Language, 'MISSING_PERMISSION', 'MANAGE_ROLES').then(m => m.delete({ timeout: 10000 }));
		}

		// Check if bot can mute users
		if (!message.guild.me.hasPermission('MUTE_MEMBERS')) {
			bot.logger.error(`Missing permission: \`MUTE_MEMBERS\` in [${message.guild.id}].`);
			return message.error(settings.Language, 'MISSING_PERMISSION', 'MUTE_MEMBERS').then(m => m.delete({ timeout: 10000 }));
		}

		// Find user
		const member = message.guild.getMember(message, args);

		// Remove mutedRole from user
		try {
			const muteRole = message.guild.roles.cache.find(role => role.id == settings.MutedRole);
			member[0].roles.remove(muteRole);
			if (member[0].voice.channelID) {
				member[0].voice.setMute(false);
			}
			message.success(settings.Language, 'MODERATION/SUCCESSFULL_UNMUTE', member[0].user).then(m => m.delete({ timeout: 3000 }));
		} catch (err) {
			if (bot.config.debug) bot.logger.error(`${err.message} - command: unmute.`);
		}
	}
};
