import { Message } from 'discord.js';
import * as googleTTS from 'google-tts-api';
import {
  createAudioPlayer,
  createAudioResource,
  getVoiceConnection
} from '@discordjs/voice';
import { Listener } from '@/listeners/listener';
import { config } from '@/config';

export default class MessageReceivedListener
  implements Listener<'messageCreate'>
{
  readonly event = 'messageCreate';

  on(msg: Message) {
    if (msg.author.bot) return;
    if (msg.channelId !== config.ALLOW_COMMAND_CHANNEL) return;

    const voiceConnection = getVoiceConnection(msg.guild!.id);
    if (voiceConnection === undefined) return;

    const audioPlayer = createAudioPlayer();
    const ttsUrl = googleTTS.getAudioUrl(msg.content, {
      lang: 'ko',
      slow: false
    });
    const audioResource = createAudioResource(ttsUrl);

    voiceConnection.subscribe(audioPlayer);
    audioPlayer.play(audioResource);
  }
}
