import React from 'react';
import { get } from 'lodash';

import { DefaultCard, HighlightCard } from '@apollosproject/ui-kit';

const contentCardComponentMapper = (props) => {
  // TODO: Update to `ContentCardComponentMapper` and remove this backwards compatibility function
  console.warn(
    'Deprecation Notice: This function is depricated and will be removed in a future release. Please migrate to using `ContentCardComponentMapper`'
  );

  // map typename to the the card we want to render.
  switch (get(props, '__typename')) {
    case 'MediaContentItem':
    case 'WeekendContentItem':
    case 'ContentSeriesContentItem':
    case 'DevotionalContentItem':
      return <HighlightCard {...props} />;
    default:
      return <DefaultCard {...props} />;
  }
};

export default contentCardComponentMapper;
