import ApollosConfig from '@apollosproject/config';
import gql from 'graphql-tag';

export default gql`
  query getContentNode($nodeId: ID!) {
    node(id: $nodeId) {
      id
      ...ContentNodeFragment
      ...ContentSingleFragment
      # ...publishFragment
    }
  }
  ${ApollosConfig.FRAGMENTS.CONTENT_NODE_FRAGMENT}
  ${ApollosConfig.FRAGMENTS.CONTENT_SINGLE_FRAGMENT}
  # ${ApollosConfig.FRAGMENTS.PUBLISH_FRAGMENT}
`;
