import * as Notifications from 'expo-notifications';
import * as TaskManager from 'expo-task-manager';
import { Platform } from 'react-native';

const BACKGROUND_TASK = 'wakeword-alarm-task';

TaskManager.defineTask(BACKGROUND_TASK, async ({ data, error }) => {
  if (error) return;
  if (data?.type === 'ALARM') {
    // This will be handled by notification response listener in App.js
  }
});

export async function registerBackgroundTask() {
  await Notifications.registerTaskAsync(BACKGROUND_TASK);
}

export async function scheduleLanguageAlarm(date, language) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "¡Buenos días! Time to learn",
      body: "Tap to learn a new word and stop the alarm",
      sound: true,
      data: { type: 'ALARM', language },
    },
    trigger: date,
  });
}

export async function cancelAllAlarms() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}
