import { AsyncStorage } from "react-native";
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";

const NOTIFICATION_KEY = "MY_NOTIFICATION_KEY";

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}

export const createNotification = () => {
  return {
    title: "You didn't end a quiz today",
    body: "Please end one quiz today",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true,
    },
  };
};

export const setLocalNotification = () => {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(
          async ({ status }) => {
            if (status === "granted") {
              await Notifications.cancelAllScheduledNotificationsAsync();
              let tommorow = new Date();
              tommorow.setDate(tommorow.getDate());
              tommorow.setHours(12);
              tommorow.setMinutes(43);

              await Notifications.setNotificationHandler({
                handleNotification: async () => ({
                  shouldShowAlert: true,
                  shouldPlaySound: false,
                  shouldSetBadge: false,
                }),
              });

              await Notifications.scheduleNotificationAsync({
                content: {
                  title: "You didn't end a quiz today",
                  body: "Please end one quiz today",
                },
                trigger: {
                  seconds: 60 * 60 * 24,
                  repeats: true,
                },
              });

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
            }
          }
        );
      }
    });
};
