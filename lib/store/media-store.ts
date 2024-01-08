import { create, StateCreator } from 'zustand';

import {
  MediaState,
  MediaStateExternalInitializers,
  MediaControls,
} from '../types';
import { DEFAULT_MEDIA_STATE } from '../utils';

/**  @category MediaStore */
export type MediaStore = MediaState &
  MediaControls &
  MediaStateExternalInitializers;

type CreatePropsSlice = (
  args: MediaStateExternalInitializers,
) => StateCreator<MediaStore, [], [], MediaStateExternalInitializers>;

export const createPropsSlice: CreatePropsSlice =
  (externalProps: MediaStateExternalInitializers) => () => ({
    ...externalProps,
  });

export const createDefaultMediaSlice: StateCreator<
  MediaStore,
  [],
  [],
  MediaState
> = () => DEFAULT_MEDIA_STATE;

export const createSettersSlice: StateCreator<
  MediaState & MediaControls & MediaStateExternalInitializers,
  [],
  [],
  MediaControls
> = (set, get) => ({
  getListener: () => ({
    addEventListener: get().emitter.on,
    removeEventListener: get().emitter.off,
  }),
  mute: () =>
    set(state => {
      state.emitter.emit('mute');
      return {
        muted: true,
      };
    }),
  unmute: () =>
    set(state => {
      state.emitter.emit('unnmute');
      return {
        muted: false,
      };
    }),
  pause: () =>
    set(state => {
      state.emitter.emit('pause');
      const mediaEl = state.mediaElRef.current;
      if (mediaEl && state.playPromiseRef.current) {
        void state.playPromiseRef.current.then(() => mediaEl.pause());
      }
      return { playing: false };
    }),
  play: () =>
    set(state => {
      console.log('PLAY TOGLE');
      state.emitter.emit('play');
      const mediaEl = state.mediaElRef.current;
      if (mediaEl) {
        state.playPromiseRef.current = mediaEl.play();
      }

      return { playing: true };
    }),
  seek: time =>
    set(state => {
      const mediaEl = state.mediaElRef.current;
      if (!mediaEl || state.duration === undefined) {
        return { playing: false };
      }
      time = Math.min(state.duration, Math.max(0, time));
      state.emitter.emit('seeked', { diffMs: time });
      mediaEl.currentTime = time;
      state.emitter.emit('timeupdate', {
        seconds: time,
        duration: state.duration,
      });
      return { currentTime: time };
    }),

  setVolume: (volume: number) =>
    set({ volume: Math.min(Math.max(volume, 0), 1) }),
  setDuration: (duration: number) =>
    set(state => {
      const mediaDuration = duration;
      state.emitter.emit('durationchange', { duration: mediaDuration });
      if (state.duration === mediaDuration) {
        return state;
      }

      return {
        duration: mediaDuration,
        currentTime: 0,
      };
    }),
});

type onStoreUpdate = <T>(
  fn?: (store: T) => void,
) => (initializer: StateCreator<T, [], [], T>) => StateCreator<T, [], []>;

const onStoreUpdateMiddleware: onStoreUpdate =
  fn => config => (set, get, api) =>
    config(
      state => {
        set(state);
        fn?.(get());
      },
      get,
      api,
    );

interface CreateMediaStoreArgs extends MediaStateExternalInitializers {}

export const createMediaStore = ({
  onStoreUpdate,
  ...externalProps
}: CreateMediaStoreArgs) =>
  create<MediaStore>()(
    onStoreUpdateMiddleware(onStoreUpdate)((...a) => ({
      ...createDefaultMediaSlice(...a),
      ...createSettersSlice(...a),
      ...createPropsSlice(externalProps)(...a),
    })),
  );
