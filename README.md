# A File Media Player using HTML `<video />` tag

## Goal

Goal of this repo is to create a new react media player that will be a composite "lego" player
and consumer can use any piece of it, regarding to its own needs and saving by its own performance

### TODO

- [x] Support for media files:
  - [x] Video files (`*.mp4, *.avi`...-> containers with video track)
  - [ ] Audio files(`*.mp3` and others)
  - [ ] Video/audio streams
  - [ ] Youtube
  - [ ] vimeo
- [ ] Automatic documentation(`typedoc`??? )
- [x] Prepare project environment (storybook, linter, prettier)
- [ ] Create media store on a composite level
  - [x] Create a state with `zustand`
  - [ ] Emit HTMLMedia events into new created media store
- [ ] Add tests (vitest)
- [ ] Create first version and register it to `npm`
  - [ ]  Add automatization (Github Actions)
    - [ ] Run tests
    - [ ] Create storybook on `gihtub pages`
    - [ ] Publish new version to `npm`
