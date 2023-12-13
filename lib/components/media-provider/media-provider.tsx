import { FC, memo, useRef } from 'react';
import {
  MediaProviderProps,
  MediaStoreContext,
} from '../../context/media-store-context';
import { createMediaStore } from '../../store/media-store';

export const MediaProvider: FC<MediaProviderProps> = memo(
  ({ children, onStoreUpdate }) => {
    const playPromiseRef = useRef<Promise<void>>();
    const mediaContainerRef = useRef<HTMLDivElement>(null);
    const mediaElRef = useRef<HTMLVideoElement>(null);

    const contextValueRef = useRef(
      createMediaStore({
        playPromiseRef,
        mediaContainerRef,
        onStoreUpdate,
        mediaElRef,
      }),
    );

    return (
      <MediaStoreContext.Provider value={contextValueRef.current}>
        {children}
      </MediaStoreContext.Provider>
    );
  },
);
