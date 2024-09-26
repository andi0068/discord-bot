import type { Interaction } from 'discord.js';

export function on_interaction_create(interaction: Interaction) {
  if (!interaction.isChatInputCommand()) return;

  switch (interaction.commandName) {
    case 'ping':
      interaction.reply('Pong!');
      break;
  }
}
