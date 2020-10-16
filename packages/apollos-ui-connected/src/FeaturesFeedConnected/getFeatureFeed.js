import ApollosConfig from '@apollosproject/config';
import gql from 'graphql-tag';

export default gql`
  query getFeatureFeed($nodeId: ID!) {
    node(id: $nodeId) {
      id
      ... on FeatureFeed {
        features {
          ...FeedFeaturesFragment
        }
      }
      ... on WeekendContentItem {
        featureFeed {
          id
          features {
            ...FeaturesFragment
          }
        }
      }
      ... on ContentSeriesContentItem {
        featureFeed {
          id
          features {
            ...FeaturesFragment
          }
        }
      }
    }
  }
  ${ApollosConfig.FRAGMENTS.FEED_FEATURES_FRAGMENT}
  ${ApollosConfig.FRAGMENTS.FEATURES_FRAGMENT}
  ${ApollosConfig.FRAGMENTS.TEXT_FEATURE_FRAGMENT}
  ${ApollosConfig.FRAGMENTS.SCRIPTURE_FEATURE_FRAGMENT}
  ${ApollosConfig.FRAGMENTS.WEBVIEW_FEATURE_FRAGMENT}
`;
