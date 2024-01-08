import mitt from 'mitt';

import { MediaStore } from '../store/media-store';
import {
  MediaControls,
  MediaEvents,
  MediaState,
  MediaStateExternalInitializers,
} from '../types/types';

export const NO_OP = () => [];

export const DEFAULT_MEDIA_STATE: MediaState = {
  currentTime: 0,
  duration: 0,
  volume: 1,
  emitter: mitt<MediaEvents>(),
  buffered: [],
  muted: false,
  playing: false,
};

export const DEFAULT_MEDIA_CONTROLS: MediaControls = {
  mute: NO_OP,
  pause: NO_OP,
  play: NO_OP,
  seek: NO_OP,
  setVolume: NO_OP,
  unmute: NO_OP,
  setDuration: NO_OP,
  getListener: () => ({ addEventListener: NO_OP, removeEventListener: NO_OP }),
};

export const DEFAULT_EXTERNAL_STATE_SETTERS: MediaStateExternalInitializers = {
  playPromiseRef: { current: undefined },
  mediaContainerRef: { current: null },
  mediaElRef: { current: null },
  onStoreUpdate: NO_OP,
};
export const DEFAULT_MEDIA_STORE_CONTEXT: MediaStore = {
  ...DEFAULT_MEDIA_STATE,
  ...DEFAULT_MEDIA_CONTROLS,
  ...DEFAULT_EXTERNAL_STATE_SETTERS,
};
