import { FC, memo } from 'react';
import React from 'react';
import { shallow } from 'zustand/shallow';
import { useMediaStore } from '../../lib/hooks/use-media-store';

interface PlayToggleButtonProps {}

export const PlayToggleButton: FC<PlayToggleButtonProps> = memo(() => {
  const mediaStore = useMediaStore();
  const [play, pause, playing] = mediaStore(
    state => [state.play, state.pause, state.playing],
    shallow,
  );

  const handleToggleClick = () => {
    if (playing) {
      return pause();
    }
    return play();
  };

  const renderButtonText = () => {
    if (playing) {
      return 'Pause';
    }
    return 'Play';
  };

  console.log('render in PlayToggleButton ');
  return <button onClick={handleToggleClick}>{renderButtonText()}</button>;
});
