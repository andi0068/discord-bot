import { REST, Routes, type Client } from 'discord.js';

import { env } from './utils';

const { TOKEN, GUILD_ID, APP_ID } = env();

export function on_ready(client: Client<true>) {
  console.log(`✅ ${client.user.tag} is online.`);
  update_process();
}

function update_process() {
  const rest = new REST({ version: '10' }).setToken(TOKEN);

  rest
    .put(Routes.applicationGuildCommands(APP_ID, GUILD_ID), {
      body: [{ name: 'ping', description: 'Pong!' }],
    })
    .then(() => console.log('✅ Slash commands are registered.'))
    .catch((err) => console.log('⚠️ Slash commands are not registered. Due to error', err));
}
