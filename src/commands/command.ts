import {
  RepliableInteraction,
  SlashCommandBuilder
} from 'discord.js';

export interface Command {
  readonly data: SlashCommandBuilder;

  execute(interaction: RepliableInteraction): Promise<void>;
}
