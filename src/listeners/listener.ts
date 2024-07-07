import { ClientEvents } from 'discord.js';

export interface Listener<E extends keyof ClientEvents> {
  readonly event: E;

  on(...args: ClientEvents[E]): void;
}
