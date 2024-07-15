import {
  Client,
  Collection,
  GatewayIntentBits,
  REST,
  Routes
} from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';
import { generateDependencyReport } from '@discordjs/voice';
import { logger } from '@/logger';
import { config } from '@/config';
import { Command } from '@/commands/command';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates
  ]
});
const rest = new REST().setToken(config.BOT_TOKEN);
const commandCollection = new Collection<string, Command>();

async function registerCommands() {
  const commands = await Promise.all(
    readdirSync(join(__dirname, 'commands'))
      .filter((file) => file.endsWith('.command.ts'))
      .filter((file) => file !== 'command.ts')
      .map((file) => import(`@/commands/${file}`))
  );
  commands.forEach((command) => {
    // eslint-disable-next-line new-cap
    const instance = new command.default();
    commandCollection.set(instance.data.name, instance);
  });

  await rest.put(Routes.applicationCommands(client.user!.id), {
    body: commandCollection.map((cmd) => ({
      name: cmd.data.name,
      description: cmd.data.description
    }))
  });
}

async function registerEvents() {
  const listeners = await Promise.all(
    readdirSync(join(__dirname, 'listeners'))
      .filter((file) => file.endsWith('.listener.ts'))
      .filter((file) => file !== 'listener.ts')
      .map((file) => import(`@/listeners/${file}`))
  );
  listeners.forEach((listener) => {
    // eslint-disable-next-line new-cap
    const instance = new listener.default();
    client.on(instance.event, instance.on.bind(instance));
  });
}

async function main() {
  await client.login(config.BOT_TOKEN);

  client.once('ready', () => {
    logger.info('봇이 준비되었습니다.');
  });

  await registerCommands();
  logger.info('명령어 등록을 성공적으로 완료했습니다.');

  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = commandCollection.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      logger.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: '무언가 문제가 생겼습니다. 다시 시도해주세요.',
          ephemeral: true
        });
      } else {
        await interaction.reply({
          content: '무언가 문제가 생겼습니다. 다시 시도해주세요.',
          ephemeral: true
        });
      }
    }
  });

  await registerEvents();
  logger.info('이벤트 등록을 성공적으로 완료했습니다.');

  logger.info(`\n${generateDependencyReport()}`);
}

main();
