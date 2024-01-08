import { Emitter } from 'mitt';
import { MutableRefObject, RefObject } from 'react';

import { MediaStore } from '../store/media-store';

export interface MediaState {
  buffered: unknown[];
  duration: number;
  muted: boolean;
  currentTime: number;
  volume: number;
  playing: boolean;
  emitter: EmitterEvents;
}

export interface MediaControls {
  play: () => void;
  pause: () => void;
  mute: () => void;
  unmute: () => void;
  setVolume: (volume: number) => void;
  seek: (time: number) => void;
  getListener: () => EmitterListeners;
  setDuration: (duration: number) => void;
}
export type SupportedMediaType = 'audio' | 'video';
export type MediaType = SupportedMediaType | 'unknown';

export type VoidEventsKey =
  | '*'
  | 'play'
  | 'pause'
  /**  Emitted each time when player is ready to play(ex: we have bites loaded and ready to play content) */
  | 'ready'
  /** Emitted for first time when player is mounted and first bites are ready to be player(it happens only once) */
  | 'firstReady'
  | 'ended'
  | 'mute'
  | 'unnmute'
  | 'end';

/** Events that MediaApi is listening, and have no arguments
 * @category MediaStore
 * @category Events
 */
export type VoidEvents = Record<VoidEventsKey, void>;

export type TimeUpdateEvent = Record<'seconds' | 'duration', number>;
/** Event emitted when `showControls` was triggered
 * @category MediaStore
 * @category Events
 */

export type ExtendedEvents = {
  /** See details here: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/seeked_event */
  seeked: { diffMs: number };
  /** See details here: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/timeupdate_event */
  timeupdate: TimeUpdateEvent;
  durationchange: { duration: number };
};
export type MediaEvents = VoidEvents & ExtendedEvents;

export type EmitterEvents = Emitter<MediaEvents>;

/**
 * State that initializes store external(just store initialization!!!)
 * @category MediaStore
 */
export interface MediaStateExternalInitializers {
  playPromiseRef: MutableRefObject<Promise<void> | undefined>;
  mediaContainerRef: RefObject<HTMLDivElement>;
  onStoreUpdate?: (store: MediaStore) => void;
  mediaElRef: RefObject<HTMLVideoElement>;
}

export interface EmitterListeners {
  removeEventListener: EmitterEvents['off'];
  addEventListener: EmitterEvents['on'];
}
