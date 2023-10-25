import { create, StateCreator } from 'zustand';
import { MediaProperty, MediaStateMiddleware } from './types';
import { DEFAULT_MEDIA_PROPERTY } from './constants';

export type MediaState = MediaProperty & MediaStateMiddleware;

export const createDefaultMediaPropertySlice: StateCreator<
  MediaState,
  [],
  [],
  MediaProperty
> = () => DEFAULT_MEDIA_PROPERTY;

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

interface CreateMediaStateArgs extends MediaStateMiddleware {}

export const createMediaState = ({ onStateUpdate }: CreateMediaStateArgs) =>
  create<MediaState>()(
    onStoreUpdateMiddleware(onStateUpdate)((...a) => ({
      ...createDefaultMediaPropertySlice(...a),
    })),
  );
