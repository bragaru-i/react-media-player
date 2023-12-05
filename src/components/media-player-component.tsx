import { useRef, useEffect, FC } from 'react';

export interface MediaPlayerProps {
  url: string;
}

export const MediaPlayer: FC<MediaPlayerProps> = ({ url }) => {
  const videoRef = useRef<HTMLMediaElement>(null);
  console.log(url);
  useEffect(() => {
    const initializeMSE = async () => {
      const mediaSource = new MediaSource();
      if (!videoRef.current) {
        return;
      }
      videoRef.current.src = URL.createObjectURL(mediaSource);

      // Wait for the 'sourceopen' event before adding SourceBuffer
      await new Promise(resolve => {
        mediaSource.addEventListener('sourceopen', resolve, { once: true });
      });

      const sourceBuffer = mediaSource.addSourceBuffer(
        'video/mp4; codecs="avc1.42E01E"',
      );

      // Fetch your video data (replace with your actual video URL)
      const videoDataResponse = await fetch(url);
      const videoData = await videoDataResponse.arrayBuffer();

      sourceBuffer.addEventListener('updateend', () => {
        if (mediaSource.readyState === 'open' && !sourceBuffer.updating) {
          mediaSource.endOfStream();
        }
      });

      sourceBuffer.appendBuffer(videoData);
    };

    initializeMSE();
  }, [url]);

  return <video ref={videoRef} controls width="640" height="360" />;
};
