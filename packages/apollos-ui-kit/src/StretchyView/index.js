import React, { PureComponent } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

import Stretchy from './Stretchy';

class StretchyView extends PureComponent {
  static propTypes = {
    children: PropTypes.func.isRequired,
  };

  state = {
    stretchies: {},
    layoutHeight: Dimensions.get('window').height,
  };

  scrollY = new Animated.Value(0);

  ref = null;

  handleScroll = (e) => {
    if (
      e.nativeEvent.contentOffset.y + e.nativeEvent.layoutMeasurement.height ===
      e.nativeEvent.contentSize.height
    ) {
      if (this.ref && this.ref.props && this.ref.props.onEndReached) {
        console.log(this.ref);
        this.ref.onEndReached.call(this.ref);
      }
    }
    Animated.event([
      { nativeEvent: { contentOffset: { y: this.scrollY } } },
      {
        useNativeDriver: true,
        listener: (e) => {
          console.warn(e);
        },
      },
    ])(e);
  };

  handleLayout = ({
    nativeEvent: {
      layout: { height },
    },
  }) => {
    this.setState({ layoutHeight: height });
  };

  handleStretchyLayout = ({ stretchyKey, ...props }) => {
    this.setState(({ stretchies }) => ({
      stretchies: { ...stretchies, [stretchyKey]: props },
    }));
  };

  StretchyPortal = ({
    children,
    stretchyKey = 'stretchy',
    stretchOn = 'top',
    background = false,
    style,
    ...otherProps
  }) => (
    <Animated.View
      onLayout={({ nativeEvent: { layout } }) =>
        this.handleStretchyLayout({
          stretchyKey,
          stretchOn,
          children,
          style,
          ...otherProps,
          ...layout,
        })
      }
      style={[
        { opacity: this.getStretchyPortalOpacity(stretchyKey) },
        background ? StyleSheet.absoluteFill : null,
        style,
      ]}
    >
      {children}
    </Animated.View>
  );

  getStretchyPortalOpacity = (key) => {
    if (!this.state.stretchies[key]) return 1;
    const { stretchOn, y, height } = this.state.stretchies[key];

    if (stretchOn === 'top') {
      return this.scrollY.interpolate({
        inputRange: [y - 0.1, y, y + 0.1],
        outputRange: [0, 1, 1],
      });
    }

    if (stretchOn === 'bottom') {
      return this.scrollY.interpolate({
        inputRange: [
          y + height - this.state.layoutHeight - 0.1,
          y + height - this.state.layoutHeight,
          y + height - this.state.layoutHeight + 0.1,
        ],
        outputRange: [1, 1, 0],
      });
    }

    return 1;
  };

  setRef = (ref) => (this.ref = ref);

  render() {
    const { children, ...otherProps } = this.props;

    return (
      <View
        style={StyleSheet.absoluteFill}
        {...otherProps}
        onLayout={this.handleLayout}
      >
        {Object.keys(this.state.stretchies).map((key) => (
          <Stretchy
            key={key}
            layoutHeight={this.state.layoutHeight}
            scrollY={this.scrollY}
            {...this.state.stretchies[key]}
          />
        ))}
        {children({
          scrollEventThrottle: 0.5,
          onScroll: this.handleScroll,
          Stretchy: this.StretchyPortal,
          ref: this.setRef,
        })}
      </View>
    );
  }
}

export default StretchyView;
