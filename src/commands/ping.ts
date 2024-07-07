import {
  RepliableInteraction,
  SlashCommandBuilder
} from 'discord.js';
import { Command } from '@/commands/command';

export default class Ping implements Command {
  readonly data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('생존 여부를 확인합니다.');

  async execute(interaction: RepliableInteraction) {
    await interaction.reply('Pong!');
  }
}
