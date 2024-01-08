import { useContext, useMemo } from 'react';
import { StoreApi } from 'zustand';
import { useStoreWithEqualityFn } from 'zustand/traditional';

import { MediaStoreContext } from '../context/media-store-context';
import { MediaStore } from '../store/media-store';
const createBoundedUseStore = (store => (selector, equals) =>
  useStoreWithEqualityFn(store, selector as never, equals)) as <
  S extends StoreApi<MediaStore>,
>(
  store: S,
) => {
  (): ExtractState<S>;
  <T>(
    selector: (state: ExtractState<S>) => T,
    equals?: (a: T, b: T) => boolean,
  ): T;
};
type ExtractState<S> = S extends { getState: () => infer X } ? X : never;

export const useMediaStore = () => {
  const context = useContext(MediaStoreContext);
  if (!context) {
    throw Error('useMediaStore cannot be used outside of the MediaProvider');
  }

  // Initialize store only on component mount to prevent outside rerenders
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const mediaStore = useMemo(() => createBoundedUseStore(context), []);
  return mediaStore;
};
