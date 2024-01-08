import { FC } from 'react';

import { CorePlayer, CorePlayerProps } from './core-player';
import { MediaProvider } from './media-provider/media-provider';

export interface MediaPlayerProps extends CorePlayerProps {}

export const MediaPlayer: FC<MediaPlayerProps> = ({ ...corePlayerProps }) => {
  return (
    <MediaProvider>
      <CorePlayer {...corePlayerProps} />
    </MediaProvider>
  );
};
