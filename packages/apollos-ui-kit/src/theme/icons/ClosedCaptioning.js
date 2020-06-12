import React from 'react';
import PropTypes from 'prop-types';
import Svg, { Path } from 'react-native-svg';

import makeIcon from '../../Icon/makeIcon';

const Icon = makeIcon(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 459 459" {...otherProps}>
    <Path
      d="M408,25.5H51c-28.05,0-51,22.95-51,51v306c0,28.05,22.95,51,51,51h357c28.05,0,51-22.95,51-51v-306 C459,48.45,436.05,25.5,408,25.5z M204,204h-38.25v-12.75h-51v76.5h51V255H204v25.5c0,15.3-10.2,25.5-25.5,25.5H102 c-15.3,0-25.5-10.2-25.5-25.5v-102c0-15.3,10.2-25.5,25.5-25.5h76.5c15.3,0,25.5,10.2,25.5,25.5V204z M382.5,204h-38.25v-12.75 h-51v76.5h51V255h38.25v25.5c0,15.3-10.2,25.5-25.5,25.5h-76.5c-15.3,0-25.5-10.2-25.5-25.5v-102c0-15.3,10.2-25.5,25.5-25.5H357 c15.3,0,25.5,10.2,25.5,25.5V204z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;

