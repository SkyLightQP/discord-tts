import dotenvx from '@dotenvx/dotenvx';

dotenvx.config();

export const config = {
  BOT_TOKEN: process.env.BOT_TOKEN || '',
  ADMIN: process.env.ADMIN || '',
  ALLOW_COMMAND_CHANNEL: process.env.ALLOW_COMMAND_CHANNEL || '',
};
