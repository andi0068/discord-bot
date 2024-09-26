import { Jimp, loadFont } from 'jimp';

const { SANS_64_WHITE } = require('jimp/fonts');

export function env() {
  const vars = {
    TOKEN: process.env.TOKEN,
    GUILD_ID: process.env.GUILD_ID,
    APP_ID: process.env.APP_ID,
    SERVER_NAME: process.env.SERVER_NAME,
    RULES_CHANNEL_ID: process.env.RULES_CHANNEL_ID,
    WELCOME_CHANNEL_ID: process.env.WELCOME_CHANNEL_ID,
    INTRO_CHANNEL_ID: process.env.INTRO_CHANNEL_ID,
    MEMBER_ROLE_ID: process.env.MEMBER_ROLE_ID,
    EMOJI_ID: process.env.EMOJI_ID,
    EMOJI_NAME: process.env.EMOJI_NAME,
  };

  type K = keyof typeof vars;

  for (const name of Object.keys(vars)) {
    if (!vars[name as K]) {
      throw Error(`Please provide the following env: ${name}`);
    }
  }

  return vars as Record<K, string>;
}

export function asyncio(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(undefined), ms);
  });
}

export const t = {
  channel(id: string) {
    return `<#${id}>`;
  },
  user(id: string) {
    return `<@${id}>`;
  },
  emoji(id: string, name: string) {
    return `<:${name}:${id}>`;
  },
};

export async function get_welcome_png(name: string) {
  const raw = await Jimp.read('welcome.png');
  const font = await loadFont(SANS_64_WHITE);
  const text = `Welcome,\n${name}\nEnjoy Your Stay!`.toUpperCase();

  const base64 = await raw.print({ y: 80, x: 80, font, text }).getBase64('image/png');

  return {
    base64,
    buffer() {
      return Buffer.from(base64.substring(base64.indexOf(',')), 'base64');
    },
  };
}
