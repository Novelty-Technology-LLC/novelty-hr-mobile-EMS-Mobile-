import { PermissionsAndroid, Platform } from "react-native";

export const requestNotificationPermission = async () => {
  if (Platform.OS === "android") {
    const permission: any = "android.permission.POST_NOTIFICATIONS";
    return await PermissionsAndroid.request(permission);
  }
};
