import { FC, memo } from 'react';

import { useMediaStore } from '../../hooks/use-media-store';

export interface PlayerProps {
  url: string;
  className?: string;
}

export const Player: FC<PlayerProps> = memo(({ className, url }) => {
  const mediaStore = useMediaStore();
  const mediaElRef = mediaStore(state => state.mediaElRef);

  return <video controls ref={mediaElRef} src={url} className={className} />;
});
