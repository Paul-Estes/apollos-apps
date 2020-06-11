import React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';

import { Providers } from '../testUtils';

import PrayerScreen from '.';

describe('The PrayerScreen component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Providers>
        <PrayerScreen />
      </Providers>
    );

    expect(tree).toMatchSnapshot();
  });
  it('should render with children', () => {
    const tree = renderer.create(
      <Providers>
        <PrayerScreen>
          <Text>Boom</Text>
        </PrayerScreen>
      </Providers>
    );

    expect(tree).toMatchSnapshot();
  });
  it('should render with custom primaryActionText', () => {
    const tree = renderer.create(
      <Providers>
        <PrayerScreen primaryActionText={'Custom primaryActionText'} />
      </Providers>
    );

    expect(tree).toMatchSnapshot();
  });
  it('should accept an onPressBackground function', () => {
    const tree = renderer.create(
      <Providers>
        <PrayerScreen onPressBackground={jest.fn()} />
      </Providers>
    );

    expect(tree).toMatchSnapshot();
  });
  it('should accept an onPressPrimary function', () => {
    const tree = renderer.create(
      <Providers>
        <PrayerScreen onPressPrimary={jest.fn()} />
      </Providers>
    );

    expect(tree).toMatchSnapshot();
  });
});
