import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { ErrorCard, PaddedView } from '@apollosproject/ui-kit';
import TextFeature from '../features/TextFeature';
import ScriptureFeature from '../features/ScriptureFeature';
import WebviewFeature from '../features/WebviewFeature';
import GET_CONTENT_FEATURE_FEED from './getContentFeatureFeed';

const FEATURE_MAP = {
  TextFeature,
  ScriptureFeature,
  WebviewFeature,
};

const ContentFeatureFeedConnected = ({ contentId }) => {
  if (!contentId) return null;

  return (
    <Query
      query={GET_CONTENT_FEATURE_FEED}
      fetchPolicy="cache-and-network"
      variables={{ id: contentId }}
    >
      {({ data, loading, error }) => {
        if (error) return console.error(error) || <ErrorCard error={error} />;
        if (loading) return null;
        return (
          console.log(data) || (
            <PaddedView horizontal={false}>
              {data.node.featureFeed.features.map(
                ({ __typename, ...feature }) => {
                  const Feature = FEATURE_MAP[__typename];
                  if (!Feature) return null;
                  return (
                    <Feature
                      key={feature.id}
                      {...feature}
                      contentId={contentId}
                      isLoading={loading}
                    />
                  );
                }
              )}
            </PaddedView>
          )
        );
      }}
    </Query>
  );
};

ContentFeatureFeedConnected.propTypes = {
  contentId: PropTypes.string,
};

export default ContentFeatureFeedConnected;
