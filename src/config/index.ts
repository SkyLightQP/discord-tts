import dotenvx from '@dotenvx/dotenvx';

dotenvx.config();

export const config = {
  BOT_TOKEN: process.env.BOT_TOKEN || '',
  ADMIN: process.env.ADMIN || ''
};
