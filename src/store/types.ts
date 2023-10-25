import { MediaState } from './media-state';

/**
 * Media properties
 * @category MediaState
 */

export interface MediaProperty {
  /** Rate at which the media is being played back */
  playbackRate: number;
  /** Property that indicates playing/paused state */
  paused: boolean;
  /** Value that indicates if media element is muted or not */
  muted: boolean;
  /** Indicates the length of the element's media in seconds */
  duration: number;
  /** Specifies the current playback time in seconds */
  currentTime: number;
  /** Volume at which the media will be played. A double values must fall between 0 and 1, where 0 is effectively muted and 1 is the loudest possible value. */
  volume: number;
  /** Media element is ready for first time to be played */
  ready: boolean;
  /** Media was played or seeked before */
  hasPlayedOrSeeked: boolean;
}

/**
 * Middleware for MediaSTate
 * @category MediaState
 */

export interface MediaStateMiddleware {
  onStateUpdate?: (store: MediaState) => void;
}
