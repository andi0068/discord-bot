import {
  EmbedBuilder,
  AttachmentBuilder,
  type Client,
  type GuildMember,
  type Channel,
} from 'discord.js';

import { env, t, get_welcome_png } from './utils';

const {
  SERVER_NAME,
  RULES_CHANNEL_ID,
  WELCOME_CHANNEL_ID,
  INTRO_CHANNEL_ID,
  EMOJI_ID,
  EMOJI_NAME,
} = env();

export function on_guild_member_add(client: Client, member: GuildMember) {
  send_welcome_message(member, client.channels.cache.get(WELCOME_CHANNEL_ID));
}

async function send_welcome_message(member: GuildMember, channel?: Channel) {
  if (!channel || !('send' in channel)) return;

  const png = await get_welcome_png(member.displayName);
  const t_user = t.user(member.id);
  const t_emoji = t.emoji(EMOJI_ID, EMOJI_NAME);
  const t_rules_channel = t.channel(RULES_CHANNEL_ID);
  const t_intro_channel = t.channel(INTRO_CHANNEL_ID);

  channel.send({
    content: `${t_user} Selamat Datang!`,
    embeds: [
      new EmbedBuilder({
        title: `**Halo, ${member.displayName}**`,
        description: `${t_emoji} Selamat datang di server discord ${SERVER_NAME}\n\nSebelum itu, silakan membuka ${t_rules_channel} untuk membaca **Peraturan** server kami!\n\nDilanjutkan ke ${t_intro_channel} untuk berkenalan **sesuai format**\n\nJika ada pertanyaan, jangan malu untuk bertanya kepada __Admin__`,
        image: {
          url: 'attachment://welcome.png',
          width: 960,
          height: 540,
        },
      }),
    ],
    files: [new AttachmentBuilder(png.buffer(), { name: 'welcome.png' })],
  });
}
