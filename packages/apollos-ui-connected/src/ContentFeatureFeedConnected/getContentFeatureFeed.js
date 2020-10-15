import gql from 'graphql-tag';
import ApollosConfig from '@apollosproject/config';

const {
  TEXT_FEATURE_FRAGMENT,
  SCRIPTURE_FEATURE_FRAGMENT,
  WEBVIEW_FEATURE_FRAGMENT,
  FEATURES_FRAGMENT,
} = ApollosConfig.FRAGMENTS;

export default gql`
  query contentFeatureFeed($id: ID!) {
    node(id: $id) {
      id
      ... on FeaturesNode {
        featureFeed {
          id
          features {
            ...FeaturesFragment
          }
        }
      }
    }
  }
  ${TEXT_FEATURE_FRAGMENT}
  ${SCRIPTURE_FEATURE_FRAGMENT}
  ${WEBVIEW_FEATURE_FRAGMENT}
  ${FEATURES_FRAGMENT}
`;
