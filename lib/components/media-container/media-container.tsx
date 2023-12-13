import { FC, ReactNode } from 'react';
import { useMediaStore } from '../../hooks/use-media-store';
import { Player, PlayerProps } from '../player/player';

interface Classes {
  video?: string;
  wrapper?: string;
}

export interface MediaContainerProps extends Pick<PlayerProps, 'url'> {
  children?: ReactNode;
  classes?: Classes;
}

export const MediaContainer: FC<MediaContainerProps> = ({
  children,
  classes,
  url,
}) => {
  const mediaStore = useMediaStore();
  const mediaContainerRef = mediaStore(state => state.mediaContainerRef);
  return (
    <div ref={mediaContainerRef} className={classes?.wrapper}>
      <Player className={classes?.video} url={url} />
      {children}
    </div>
  );
};
