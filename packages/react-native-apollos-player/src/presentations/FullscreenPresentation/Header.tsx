import * as React from 'react';
import { SafeAreaView, NativeModules, Platform } from 'react-native';
import {
  H4,
  BodySmall,
  PaddedView,
  styled,
  ConnectedImage,
  ButtonIcon,
  withTheme,
} from '@apollosproject/ui-kit';

import usePlayer from '../../usePlayer';

const Image = styled(({ theme }: any) => ({
  width: theme?.sizing?.baseUnit * 3.5,
  borderRadius: theme.sizing.baseUnit,
  marginBottom: theme.sizing.baseUnit,
  aspectRatio: 1,
}))(ConnectedImage);

const PiPButton = withTheme(
  ({ theme }: any) => ({
    fill: theme?.colors?.text?.secondary,
    style: {
      paddingVertical: theme?.sizing?.baseUnit / 1.25,
      paddingHorizontal: theme?.sizing?.baseUnit / 1.25,
      borderRadius: 0,
    },
    size: theme?.sizing?.baseUnit * 1.5,
    name: 'sections',
  }),
  'ui-media.MediaPlayer.FullscreenControls.Header.DownButton'
)(ButtonIcon);

const Container = styled({
  flexDirection: 'row',
  justifyContent: 'space-between',
})(SafeAreaView);

const Header: React.FunctionComponent = () => {
  const { nowPlaying, isInPiP, setIsInPiP } = usePlayer();
  const [canPiP, setCanPiP] = React.useState(false);

  // Detect iOS PiP support
  React.useEffect(() => {
    if (Platform.OS !== 'ios') return;
    const isPictureInPictureSupported = NativeModules.ApollosPlayer?.isPictureInPictureSupported();
    isPictureInPictureSupported?.then((result: boolean) => {
      setCanPiP(result);
    });
  }, []);

  return (
    <Container>
      <PaddedView>
        {nowPlaying?.presentationProps?.coverImage ? (
          <Image source={nowPlaying.presentationProps.coverImage} />
        ) : null}
        {nowPlaying?.presentationProps?.badge
          ? nowPlaying?.presentationProps?.badge
          : null}
        <H4>{nowPlaying?.presentationProps?.title}</H4>
        <BodySmall>{nowPlaying?.presentationProps?.description}</BodySmall>
      </PaddedView>

      {canPiP ? <PiPButton onPress={() => setIsInPiP(!isInPiP)} /> : null}
    </Container>
  );
};

export default Header;
