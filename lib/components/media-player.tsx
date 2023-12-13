import { FC } from 'react';
import { MediaProvider } from './media-provider/media-provider';
import { CorePlayer, CorePlayerProps } from './core-player';

export interface MediaPlayerProps extends CorePlayerProps {}

export const MediaPlayer: FC<MediaPlayerProps> = ({ ...corePlayerProps }) => {
  return (
    <MediaProvider>
      <CorePlayer {...corePlayerProps} />
    </MediaProvider>
  );
};
