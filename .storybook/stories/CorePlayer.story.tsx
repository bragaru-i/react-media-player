import type { Meta, StoryFn } from '@storybook/react';

import React, { useState } from 'react';
import { VIDEO_URL } from '../utils/constants';
import { PlayToggleButton } from '../components/play-toggle-button';
import { CorePlayerProps, CorePlayer } from '../../lib/main';

export const Primary: StoryFn<CorePlayerProps> = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <CorePlayer url={VIDEO_URL}>
        <PlayToggleButton />
      </CorePlayer>
      <button onClick={() => setCount(prev => prev + 1)}>Count: {count}</button>
    </>
  );
};

const meta: Meta<CorePlayerProps> = {
  component: CorePlayer,
  tags: ['autodocs'],
};

export default meta;
