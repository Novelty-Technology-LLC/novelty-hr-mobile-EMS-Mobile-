import React, { useContext, useEffect } from 'react';
import { Linking, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScreenStack from './screenStack';
import colors from '../../assets/colors';
import { Profile } from '../screens';
import { AppIcon } from '../common';
import LogNav from './logStack';
import DeviceInfo from 'react-native-device-info';
import {
  getUser,
  removeToken,
  removeUser,
  setUser,
  storeToken,
} from '../utils';
import { getRequest, store } from '../services';
import messaging from '@react-native-firebase/messaging';
import { AuthContext } from '../reducer';
import DashNav from './dashBoardStack';
import { navigate } from '../utils/navigation';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    const initialNotification = () => {
      messaging()
        .getInitialNotification()
        .then(async (remoteMessage) => {
          if (remoteMessage && Object.keys(remoteMessage.data).length) {
            if (remoteMessage.data.type === 'announcements') {
              try {
                var response: any = await getRequest(
                  '/webportal/announcements',
                  {}
                );
                let itemData: any = [];

                response.forEach((element: any): any => {
                  itemData.push(element);
                });

                var findAnnouncement = response.find(
                  (item: any) => item.id == +remoteMessage.data.announcement_id
                );
                navigate('announcementsDetails', {
                  headerText: findAnnouncement?.title,
                  title: findAnnouncement?.title,
                  subTitle: findAnnouncement?.subTitle,
                  date: findAnnouncement?.date,
                  html: findAnnouncement?.html,
                });
              } catch (error) {
                console.log(error, 'error');
              }
            } else {
              dispatch({ type: 'Notification', payload: remoteMessage.data });
              Linking.openURL(`noveltyhrmobile://${remoteMessage.data.url}`);
            }
          }
        });
    };
    initialNotification();
  }, [messaging]);

  useEffect(() => {
    requestUserPermission();
    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      if (remoteMessage && Object.keys(remoteMessage.data).length) {
        if (remoteMessage.data.type === 'announcements') {
          try {
            var response: any = await getRequest(
              '/webportal/announcements',
              {}
            );
            let itemData: any = [];

            response.forEach((element: any): any => {
              itemData.push(element);
            });

            var findAnnouncement = response.find(
              (item: any) => item.id == +remoteMessage.data.announcement_id
            );
            navigate('announcementsDetails', {
              headerText: findAnnouncement?.title,
              title: findAnnouncement?.title,
              subTitle: findAnnouncement?.subTitle,
              date: findAnnouncement?.date,
              html: findAnnouncement?.html,
            });
          } catch (error) {
            console.log(error, 'error');
          }
        } else {
          dispatch({ type: 'Notification', payload: remoteMessage.data });
          Linking.openURL(`noveltyhrmobile://${remoteMessage.data.url}`);
        }
      }
    });
  }, [messaging]);

  async function requestUserPermission() {
    const token = await messaging().getToken();

    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    let user = await getUser();
    user = JSON.parse(user);
    const device_id = DeviceInfo.getUniqueId();

    const isValid = user.device_tokens?.some(
      (item) =>
        item.user_id === user.id &&
        item.device_id === device_id &&
        item.notification_token === token
    );

    const data = {
      id: user.id,
      notification_token: token,
      device_id,
      platform: Platform.OS,
    };

    if (!isValid) {
      store(data).then(async (data) => {
        await removeUser(),
          await removeToken(),
          await setUser(data),
          await storeToken(JSON.stringify(data));
      });
    }
  }

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
          name='Dashboard'
          component={DashNav}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AppIcon name='home' color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name='Activity'
          component={LogNav}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AppIcon name='timer' color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name='Home'
          component={ScreenStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AppIcon name='briefcase-clock' color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name='Profile'
          component={Profile}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AppIcon name='account' color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default TabNavigator;
