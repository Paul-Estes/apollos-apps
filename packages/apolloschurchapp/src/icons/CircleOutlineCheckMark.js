import React from 'react';
import PropTypes from 'prop-types';
import Svg, { Path, Polygon } from 'react-native-svg';

import makeIcon from '@apollosproject/ui-kit/src/Icon/icons/makeIcon';

const Icon = makeIcon(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 60 61" {...otherProps}>
    <Polygon
      fill={fill}
      points="25.9570657 39.7210789 26.6666667 40.4357125 27.3762676 39.7210789 40.709601 26.293183 41.4092427 25.5885792 40.709601 24.8839754 38.0429343 22.1983962 37.3333333 21.4837626 36.6237324 22.1983962 25.9570657 32.940713 27.3762676 32.940713 23.3762676 28.9123442 22.6666667 28.1977106 21.9570657 28.9123442 19.290399 31.5979234 18.5907573 32.3025272 19.290399 33.007131"
    />
    <Path
      fill={fill}
      d="M30,54.903 L30,54.903 C43.254834,54.903 54,44.157834 54,30.903 C54,17.648166 43.254834,6.903 30,6.903 C16.745166,6.903 6,17.648166 6,30.903 C6,44.157834 16.745166,54.903 30,54.903 L30,54.903 Z M30,60.903 L30,60.903 C13.4314575,60.903 0,47.4715425 0,30.903 C0,14.3344575 13.4314575,0.903 30,0.903 C46.5685425,0.903 60,14.3344575 60,30.903 C60,47.4715425 46.5685425,60.903 30,60.903 L30,60.903 Z"
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
