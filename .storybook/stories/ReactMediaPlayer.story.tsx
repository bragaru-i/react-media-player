import type { Meta, StoryFn } from '@storybook/react';

import { MediaPlayer, MediaPlayerProps } from '../../src';
import React from 'react';
import { VIDEO_URL } from '../utils/constants';

export const Primary: StoryFn<MediaPlayerProps> = () => {
  return <MediaPlayer url={VIDEO_URL} />;
};

const meta: Meta<MediaPlayerProps> = {
  component: MediaPlayer,
  tags: ['autodocs'],
};

export default meta;
