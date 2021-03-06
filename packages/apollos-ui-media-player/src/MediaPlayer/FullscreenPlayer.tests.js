import React from 'react';

import { View } from 'react-native';

import { InMemoryCache } from 'apollo-cache-inmemory';
import { Providers, renderWithApolloData } from '../testUtils';

import FullscreenPlayer from './FullscreenPlayer';

// TODO: Get these tests to work.

describe('the FullscreenPlayer component', () => {
  it('should render miniplayer with video', async () => {
    const cache = new InMemoryCache().restore({
      ROOT_QUERY: {
        mediaPlayer: {
          currentTime: 0,
          isFullscreen: false,
          isVisible: false,
          currentTrack: 'MediaPlayerTrack:0',
          __typename: 'MediaPlayerState',
        },
      },
      'MediaPlayerTrack:0': {
        isVideo: true,
        id: 0,
        __typename: 'MediaPlayerTrack',
      },
    });
    const tree = await renderWithApolloData(
      <Providers cache={cache}>
        <FullscreenPlayer />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });

  it('should render miniplayer with audio', async () => {
    const mediaPlayer = {
      currentTrack: {
        isVideo: false,
      },
      isVisible: true,
      isFullscreen: false,
    };
    const tree = await renderWithApolloData(
      <Providers
        resolvers={{ Query: { mediaPlayer: Promise.resolve(mediaPlayer) } }}
      >
        <FullscreenPlayer />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });

  it('should render fullscreen', async () => {
    const mediaPlayer = {
      currentTrack: {
        isVideo: true,
      },
      isVisible: true,
      isFullscreen: true,
    };
    const tree = await renderWithApolloData(
      <Providers
        resolvers={{ Query: { mediaPlayer: Promise.resolve(mediaPlayer) } }}
      >
        <FullscreenPlayer />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should hide disabled controls', async () => {
    const mediaPlayer = {
      currentTrack: {
        isVideo: true,
      },
      isVisible: true,
      isFullscreen: true,
    };
    const tree = await renderWithApolloData(
      <Providers
        resolvers={{ Query: { mediaPlayer: Promise.resolve(mediaPlayer) } }}
      >
        <FullscreenPlayer
          showAudioToggleControl={false}
          showVideoToggleControl={false}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a custom VideoWindow component', async () => {
    const mediaPlayer = {
      currentTrack: {
        isVideo: true,
      },
      isVisible: true,
      isFullscreen: true,
    };
    const tree = await renderWithApolloData(
      <Providers
        resolvers={{ Query: { mediaPlayer: Promise.resolve(mediaPlayer) } }}
      >
        <FullscreenPlayer VideoWindowComponent={View} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
