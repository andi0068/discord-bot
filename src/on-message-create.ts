import type { OmitPartialGroupDMChannel, Message } from 'discord.js';

import { env, asyncio, t } from './utils';

const { SERVER_NAME, INTRO_CHANNEL_ID, MEMBER_ROLE_ID } = env();

export function on_message_create(message: OmitPartialGroupDMChannel<Message<boolean>>) {
  if (message.system || message.author.bot) return;

  switch (message.channelId) {
    case INTRO_CHANNEL_ID:
      on_intro_message_create(message);
      break;
  }
}

async function on_intro_message_create(message: OmitPartialGroupDMChannel<Message<boolean>>) {
  if (
    !is_valid_intro_message(message.content, [
      'Siapa nama kamu?',
      'Asal dari mana?',
      'Sekolah / Kuliah di mana?',
      'Bekerja di mana?',
      `Dari mana tau ${SERVER_NAME}?`,
      'Hobby / Interest?',
    ])
  ) {
    if (message.deletable) message.delete();
    message.channel
      .send(`${t.user(message.author.id)}, tolong masukkan data sesuai format!`)
      .then((reply) => {
        asyncio(3000).then(() => {
          if (reply.deletable) reply.delete();
        });
      });
    return;
  }

  message.react('✅');
  message.reply(
    `Terimakasih ${t.user(message.author.id)}, sudah perkenalan sesuai format. Salam kenal`,
  );

  const role = message.guild?.roles.cache.get(MEMBER_ROLE_ID);

  if (role) message.member?.roles.add(role);
}

function is_valid_intro_message(content: string, questions: string[]) {
  return new RegExp(`^${questions.map((q) => `${q}.+`).join('\\n')}$`).test(content);
}
