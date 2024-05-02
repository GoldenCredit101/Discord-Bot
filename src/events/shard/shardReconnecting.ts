import { Events } from 'discord.js';
import { Event } from '../../structures';
import EgglordClient from '../../base/Egglord';

/**
 * Shard reconnecting event
 * @event Egglord#Debug
 * @extends {Event}
*/
export default class ShardReconnecting extends Event {
	constructor() {
		super({
			name: Events.ShardReconnecting,
			dirname: __dirname,
		});
	}

	/**
	 * Function for receiving event.
	 * @param {client} client The instantiating client
	 * @param {number} shardID The shard id that disconnected
	 * @readonly
	*/
	async run(client: EgglordClient, shardID: number) {
		client.logger.debug(`Shard: ${shardID} is attempting to reconnect.`);
	}
}