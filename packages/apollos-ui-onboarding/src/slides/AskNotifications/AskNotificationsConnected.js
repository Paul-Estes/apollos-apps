import React, { memo } from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
// This query is also found in core/permissionUtils. We should refactor into a notifications module.
import { GET_NOTIFICATIONS_STATUS } from '@apollosproject/ui-notifications';

import AskNotifications from './AskNotifications';
// eslint-disable-next-line react/display-name
const AskNotificationsConnected = memo(
  ({
    Component,
    onPressPrimary,
    onPressSecondary,
    onRequestPushPermissions,
    ...props
  }) => (
    <Query query={GET_NOTIFICATIONS_STATUS}>
      {({ data: { notificationsEnabled, hasPrompted } = {} }) => {
        console.log(hasPrompted, notificationsEnabled);
        return <Component
          onPressButton={() => onRequestPushPermissions()}
          buttonDisabled={notificationsEnabled || hasPrompted}
          buttonText={
            notificationsEnabled
              ? 'Notifications Enabled!'
              : 'Yes, enable notifications'
          }
          onPressPrimary={(notificationsEnabled || hasPrompted) ? onPressPrimary : null} // if notifications are enabled show the primary nav button (next/finish)
          onPressSecondary={
            // if notifications are not enabled show the secondary nav button (skip)
            (notificationsEnabled || hasPrompted) ? null : onPressSecondary || onPressPrimary // if onPressSecondary exists use it else default onPressPrimary
          }
          pressPrimaryEventName={'Ask Notifications Completed'}
          pressSecondaryEventName={'Ask Notifications Skipped'}
          {...props}
        />
      }}
    </Query>
  )
);

AskNotificationsConnected.propTypes = {
  Component: PropTypes.shape({}),
  onPressPrimary: PropTypes.func,
  onPressSecondary: PropTypes.func,
  onRequestPushPermissions: PropTypes.func.isRequired,
};

AskNotificationsConnected.defaultProps = {
  Component: AskNotifications,
};

AskNotificationsConnected.displayName = 'AskNotificationsConnected';

export default AskNotificationsConnected;
