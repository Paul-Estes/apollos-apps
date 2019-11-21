import OneSignal from 'react-native-onesignal';
import gql from 'graphql-tag';

const getHasPrompted = async () =>
  new Promise((resolve) =>
    OneSignal.getPermissionSubscriptionState((status) =>
      resolve(status.hasPrompted)
    )
  );

const getPushPermissions = async () =>
  new Promise((resolve) =>
    OneSignal.getPermissionSubscriptionState((status) =>
      // Ensure the client (notificationsEnabled) && OneSignal (subscriptionEnabled) are boolean values
      resolve(!!(status.notificationsEnabled && status.subscriptionEnabled))
    )
  );

const promptForPushNotificationsWithUserResponse = async () =>
  new Promise((resolve) =>
    OneSignal.promptForPushNotificationsWithUserResponse(resolve)
  );

const SET_NOTIFCATIONS_ENABLED = gql`
  mutation updatePushPermissions($enabled: Boolean!) {
    updatePushPermissions(enabled: $enabled) @client
  }
`;

const GET_NOTIFICATIONS_STATUS = gql`
  query getPushPermissions {
    notificationsEnabled @client(always: true)
    hasPrompted @client
  }
`;

const GET_PUSH_ID = gql`
  query getPushId {
    pushId @client
  }
`;

const requestPushPermissions = async ({ client }) => {
  const notificationsEnabled = await promptForPushNotificationsWithUserResponse();
  await client.mutate({
    mutation: SET_NOTIFCATIONS_ENABLED,
    variables: { enabled: notificationsEnabled },
  });

  return notificationsEnabled;
};

export {
  getPushPermissions,
  getHasPrompted,
  requestPushPermissions,
  GET_NOTIFICATIONS_STATUS,
  GET_PUSH_ID,
};
