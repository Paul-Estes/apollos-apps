import {
  ActivityIndicator as NativeActivityIndicator,
  StyleSheet,
} from 'react-native';

import styled from '../styled';

const ActivityIndicator = styled(
  {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    alignSelf: 'center',
  },
  'ui-kit.ActivityIndicator'
)(NativeActivityIndicator);

export {
  ActivityIndicator as default,
  NativeActivityIndicator as InlineActivityIndicator,
};
