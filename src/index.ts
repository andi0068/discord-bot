import 'dotenv/config';
import { Client, IntentsBitField } from 'discord.js';

import { on_ready } from './on-ready';
import { on_guild_member_add } from './on-guild-member-add';
import { on_message_create } from './on-message-create';
import { on_interaction_create } from './on-interaction-create';
import { env } from './utils';

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on('ready', (cl) => on_ready(cl));
client.on('guildMemberAdd', (member) => on_guild_member_add(client, member));
client.on('messageCreate', (message) => on_message_create(message));
client.on('interactionCreate', (interaction) => on_interaction_create(interaction));

client.login(env().TOKEN);
