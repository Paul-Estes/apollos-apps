import * as React from 'react';
import {
  Animated,
  StyleSheet,
  StatusBar,
  Platform,
  Modal,
  Dimensions,
  View,
} from 'react-native';

import { PresentationContext, NowPlayingContext } from './context';

import VideoPresentationContainer from './VideoPresentationContainer';

import VideoOutlet from './VideoOutlet';

interface FullScreenSlidingPlayerProps {}

const FullscreenSlidingPlayer: React.FunctionComponent<FullScreenSlidingPlayerProps> = ({
  children,
}) => {
  const { PresentationComponent } = React.useContext(PresentationContext);

  const [layout, setLayout] = React.useState({
    x: 0,
    y: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  });

  const window = Dimensions.get('screen');

  // TODO: calculate this some other way?
  const videoHeight = Math.min(
    layout.height * 0.4,
    Math.max(1, layout.width * (9 / 16))
  );

  const fullscreenAnimation = React.useRef(new Animated.Value(0)).current;

  const { isFullscreen } = React.useContext(NowPlayingContext);

  Animated.spring(fullscreenAnimation, {
    toValue: isFullscreen ? 1 : 0,
    useNativeDriver: false, // todo
  }).start();

  const fullscreenPresentationStyles = React.useMemo(
    () => [
      StyleSheet.absoluteFill,
      {
        zIndex: 99999,
        top: window.height - layout.height,
        left: window.width - layout.width,
      },
    ],
    [layout.height, layout.width, window.height, window.width]
  );

  const presentationStyles = React.useMemo(
    () => ({
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      transform: [
        {
          translateY: fullscreenAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, layout.height - window.height],
            extrapolate: 'clamp',
          }),
        },
        {
          translateX: fullscreenAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, layout.width - window.width],
            extrapolate: 'clamp',
          }),
        },
      ],
      width: fullscreenAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [layout.width, window.width],
        extrapolate: 'clamp',
      }),
      height: fullscreenAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [videoHeight, window.height],
        extrapolate: 'clamp',
      }),
    }),
    [
      videoHeight,
      fullscreenAnimation,
      layout.height,
      layout.width,
      window.width,
      window.height,
    ]
  );

  const scrollViewStyles = React.useMemo(
    () => ({
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
      transform: [
        {
          translateY: fullscreenAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, window.height],
            extrapolate: 'clamp',
          }),
        },
      ],
    }),
    [fullscreenAnimation, window.height]
  );

  let FullscreenWrapper = React.useMemo(() => {
    // We have to wrap fullscreen view in <Modal> on iOS in order to make sure
    // the player is presented on top of ReactNavigation Native Navigation views
    if (Platform.OS !== 'ios') return () => null;
    const Wrapper: React.FunctionComponent = (props) => (
      <Modal
        animationType="fade"
        presentationStyle="overFullScreen"
        hardwareAccelerated
        transparent
        visible={isFullscreen}
        supportedOrientations={[
          'portrait',
          'portrait-upside-down',
          'landscape',
          'landscape-left',
          'landscape-right',
        ]}
        {...props}
      />
    );
    return Wrapper;
  }, [isFullscreen]);

  return (
    <View
      style={StyleSheet.absoluteFill}
      onLayout={({ nativeEvent: { layout: _layout } }) => setLayout(_layout)}
    >
      <Animated.ScrollView
        scrollEventThrottle={16}
        style={scrollViewStyles}
        contentInset={{ top: videoHeight }}
        contentOffset={{
          x: 0,
          y: -videoHeight,
        }}
      >
        {/* Only iOS supports contentInset and offset above */}
        {Platform.OS !== 'ios' ? (
          <View style={{ height: videoHeight }} />
        ) : null}
        {children}
      </Animated.ScrollView>

      {/* Primary Video View */}
      <Animated.View style={presentationStyles}>
        <VideoPresentationContainer />
        {PresentationComponent ? <PresentationComponent /> : null}
      </Animated.View>

      {/* iOS-only modal-based fullScreen controls */}
      <FullscreenWrapper>
        <Animated.View
          style={[presentationStyles, fullscreenPresentationStyles]}
        >
          {isFullscreen ? <VideoOutlet /> : null}
          {PresentationComponent ? <PresentationComponent /> : null}
        </Animated.View>
      </FullscreenWrapper>

      <StatusBar hidden={isFullscreen} showHideTransition="slide" />
    </View>
  );
};

export default FullscreenSlidingPlayer;
