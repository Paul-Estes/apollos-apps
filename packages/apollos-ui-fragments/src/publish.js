import gql from 'graphql-tag';

const PUBLISH_FRAGMENT = gql`
  fragment publishFragment on ContentItem {
    ... on UniversalContentItem {
      publishDate
    }
    ... on DevotionalContentItem {
      publishDate
    }
    ... on MediaContentItem {
      publishDate
    }
    ... on ContentSeriesContentItem {
      publishDate
    }
    ... on WeekendContentItem {
      publishDate
    }
  }
`;

export { PUBLISH_FRAGMENT };
