import type { Meta, StoryFn } from '@storybook/react';

import { MediaPlayer, MediaPlayerProps } from '../../src';

export const Primary: StoryFn<MediaPlayerProps> = () => {
  return <MediaPlayer />;
};

const meta: Meta<MediaPlayerProps> = {
  component: MediaPlayer,
  tags: ['autodocs'],
};

export default meta;
