import React, { useContext, useEffect } from "react";
import { Linking, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ScreenStack from "./screenStack";
import colors from "../../assets/colors";
import { Profile } from "../screens";
import { AppIcon } from "../common";
import { getUniqueId } from "react-native-device-info";
import { getUser, removeUser, setUser } from "../utils";
import { getRequest, store } from "../services";
import messaging from "@react-native-firebase/messaging";
import { AuthContext } from "../reducer";
import DashNav from "./dashBoardStack";
import { navigate } from "../utils/navigation";
import { WfhNav } from "./wfhStack";
import WfhSvg from "../../assets/images/WFH.svg";
import WfhActiveSvg from "../../assets/images/WFHActive.svg";
import { PendingRequestContext } from "../reducer/pendingRequestReducer";
import { api } from "../api/api";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { dispatch, state }: any = useContext(AuthContext);
  const { pendingRequests, dispatchPendingRequest } = useContext<any>(
    PendingRequestContext
  );

  const onPressTimlogNotification = (url: string) => {
    Linking.openURL(url);
  };

  useEffect(() => {
    (async () => {
      if (isApprover(state?.user)) {
        const response = await api.get("user/pending-response");
        dispatchPendingRequest({
          type: "SET_PENDING_REQUEST",
          payload: response.data.data,
        });
      }
    })();
  }, [state?.user, pendingRequests?.reload]);

  useEffect(() => {
    const initialNotification = () => {
      messaging()
        .getInitialNotification()
        .then(async (remoteMessage: any) => {
          if (remoteMessage && Object.keys(remoteMessage.data).length) {
            // if (remoteMessage.data.type === "work_from_home") {
            //   navigate(NAVIGATION_ROUTE.WFH_DASHBOARD, {
            //     notifdata: remoteMessage.data,
            //   });
            //   return;
            // }
            if (remoteMessage.data.type === "activity") {
              onPressTimlogNotification(remoteMessage.data.url);
              return;
            }

            if (remoteMessage.data.type === "announcements") {
              try {
                var response: any = await getRequest(
                  "/webportal/announcements",
                  {}
                );
                let itemData: any = [];

                response.forEach((element: any): any => {
                  itemData.push(element);
                });
                const id = JSON.parse(
                  remoteMessage.data.announcement_id.toString()
                );
                var findAnnouncement = response.find(
                  (item: any) => item.id == +id
                );
                navigate("announcementsDetails", {
                  id: findAnnouncement?.id,
                  headerText: findAnnouncement?.title,
                  title: findAnnouncement?.title,
                  subTitle: findAnnouncement?.subTitle,
                  date: findAnnouncement?.date,
                  html: findAnnouncement?.html,
                });
              } catch (error) {}
            } else if (remoteMessage?.data.type === "shoutout") {
              handleShoutoutNotification(remoteMessage?.data.id.toString());
            } else {
              dispatch({ type: "Notification", payload: remoteMessage.data });
              Linking.openURL(`noveltyhrmobile://${remoteMessage.data.url}`);
            }
          }
        });
    };
    initialNotification();
  }, [messaging]);

  useEffect(() => {
    requestUserPermission();
    messaging().onNotificationOpenedApp(async (remoteMessage: any) => {
      if (remoteMessage && Object.keys(remoteMessage?.data).length) {
        // if (remoteMessage.data.type === "work_from_home") {
        //   navigate(NAVIGATION_ROUTE.WFH_DASHBOARD, {
        //     notifdata: remoteMessage.data,
        //   });
        //   return;
        // }

        if (remoteMessage.data.type === "activity") {
          onPressTimlogNotification(remoteMessage.data.url);
          return;
        }

        if (remoteMessage?.data.type === "announcements") {
          try {
            var response: any = await getRequest(
              "/webportal/announcements",
              {}
            );
            let itemData: any = [];

            response.forEach((element: any): any => {
              itemData.push(element);
            });
            const id = JSON.parse(
              remoteMessage.data.announcement_id.toString()
            );
            var findAnnouncement = response.find((item: any) => item.id == +id);
            navigate("announcementsDetails", {
              id: findAnnouncement?.id,
              headerText: findAnnouncement?.title,
              title: findAnnouncement?.title,
              subTitle: findAnnouncement?.subTitle,
              date: findAnnouncement?.date,
              html: findAnnouncement?.html,
            });
          } catch (error) {}
        } else if (remoteMessage?.data.type === "shoutout") {
          handleShoutoutNotification(remoteMessage?.data.id.toString());
        } else {
          dispatch({ type: "Notification", payload: remoteMessage?.data });
          Linking.openURL(`noveltyhrmobile://${remoteMessage?.data?.url}`);
        }
      }
    });
  }, [messaging]);

  const handleShoutoutNotification = (shoutoutID: string) => {
    navigate("shoutoutDetail", {
      id: shoutoutID,
    });
  };

  async function requestUserPermission() {
    const token = await messaging().getToken();

    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    let user: any = await getUser();
    user = JSON.parse(user);
    const device_id = await getUniqueId();

    const isValid = user.device_tokens?.some(
      (item: any) =>
        item.user_id === user.id &&
        item.device_id === device_id &&
        item.notification_token === token
    );

    const data = {
      id: user.id, // REMOVABLE
      notification_token: token,
      device_id,
      platform: Platform.OS,
    };

    if (!isValid) {
      store(data).then(async (data: any) => {
        await removeUser(), await setUser(data);
      });
    }
  }

  const isApprover = (user: any) => {
    if (+user?.is_approver === 1 || +user?.is_default_approver === 1)
      return true;
    return false;
  };

  const showBadge = (user: any, total_count: number) => {
    if (isApprover(user) && total_count > 0) return true;
    return false;
  };

  return (
    <>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: colors.primary,
          showLabel: false,
          keyboardHidesTabBar: true,
        }}
      >
        <Tab.Screen
          name="Dashboard"
          component={DashNav}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AppIcon name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Activity"
          component={WfhNav}
          options={{
            tabBarBadgeStyle: {
              top: Platform.OS === "ios" ? 0 : 4,
              minWidth: 16,
              maxHeight: 16,
              borderRadius: 8,
              fontSize: 10,
              lineHeight: 16,
              marginTop: 3,
            },
            tabBarBadge: showBadge(state?.user, pendingRequests?.pending_wfh)
              ? pendingRequests?.pending_wfh
              : null,
            tabBarIcon: ({ focused }) =>
              focused ? <WfhActiveSvg /> : <WfhSvg />,
          }}
        />
        <Tab.Screen
          name="Home"
          component={ScreenStack}
          options={{
            tabBarBadgeStyle: {
              top: Platform.OS === "ios" ? 0 : 4,
              minWidth: 16,
              maxHeight: 16,
              borderRadius: 8,
              fontSize: 10,
              lineHeight: 16,
              marginTop: 3,
            },
            tabBarBadge: showBadge(state?.user, pendingRequests?.pending_leave)
              ? pendingRequests?.pending_leave
              : null,
            tabBarIcon: ({ color, size }) => (
              <AppIcon name="briefcase-clock" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          initialParams={{ userProfile: true }}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AppIcon name="account" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default TabNavigator;
