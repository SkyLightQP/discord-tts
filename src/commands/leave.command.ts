import {
  RepliableInteraction,
  SlashCommandBuilder
} from 'discord.js';
import { getVoiceConnection } from '@discordjs/voice';
import { Command } from '@/commands/command';

export default class LeaveCommand implements Command {
  readonly data = new SlashCommandBuilder()
    .setName('leave')
    .setDescription('TTS 봇을 음성 채널이 내보냅니다.');

  async execute(interaction: RepliableInteraction): Promise<void> {
    const { guild } = interaction;

    if (guild === null) {
      await interaction.reply(
        '명령어를 실행할 수 없습니다. 잠시후 다시 시도해주세요.'
      );
      return;
    }

    const conneciton = getVoiceConnection(guild.id);
    if (conneciton === undefined) {
      await interaction.reply(
        '봇이 음성 채널에 들어가 있지 않습니다.'
      );
      return;
    }

    conneciton.disconnect();
    conneciton.destroy();

    await interaction.reply('봇이 음성 채널에서 나갔습니다.');
  }
}
