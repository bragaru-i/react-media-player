import { ReactNode, createContext } from 'react';
import { MediaStore } from '../store/media-store';
import { StoreApi } from 'zustand';
import { DEFAULT_MEDIA_STORE_CONTEXT } from '../utils';

export interface MediaProviderProps {
  onStoreUpdate?: (store: MediaStore) => void;
  children: ReactNode;
}

export const MediaStoreContext = createContext<StoreApi<MediaStore>>({
  getState: () => DEFAULT_MEDIA_STORE_CONTEXT,
  setState: () => DEFAULT_MEDIA_STORE_CONTEXT,
  subscribe: () => () => [],
  destroy: () => () => [],
});
