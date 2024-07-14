import {
  GuildMember,
  RepliableInteraction,
  SlashCommandBuilder
} from 'discord.js';
import { joinVoiceChannel } from '@discordjs/voice';
import { Command } from '@/commands/command';

export default class JoinCommand implements Command {
  readonly data = new SlashCommandBuilder()
    .setName('join')
    .setDescription('TTS 봇을 음성 채널이 들여보냅니다.');

  async execute(interaction: RepliableInteraction): Promise<void> {
    const { guild, member } = interaction;

    if (guild === null || member === null) {
      await interaction.reply(
        '명령어를 실행할 수 없습니다. 잠시후 다시 시도해주세요.'
      );
      return;
    }

    const channelId = (member as GuildMember).voice.channelId;
    if (channelId === null) {
      await interaction.reply('음성 채널에 들어가 있지 않습니다.');
      return;
    }

    joinVoiceChannel({
      channelId,
      guildId: guild.id,
      adapterCreator: guild.voiceAdapterCreator!
    });

    await interaction.reply('봇이 음성 채널에 들어갔습니다.');
  }
}
