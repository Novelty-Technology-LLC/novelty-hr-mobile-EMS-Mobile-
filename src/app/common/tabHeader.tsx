import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { removeToken, removeUser, getUser } from '../utils';
import { headerStyle as style, deleteAlertStyle } from '../../assets/styles';
import colors from '../../assets/colors';
import { AuthContext } from '../reducer';
import { signOutGoogle, logOutUser } from '../services';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import normalize from 'react-native-normalize';
import DeviceInfo from 'react-native-device-info';

const tabHeader = ({ onPress = null, icon = false, children }: any) => {
  const [showAlert, setShowAlert] = useState(false);
  const show = () => setShowAlert(true);
  const hide = () => setShowAlert(false);
  const { dispatch } = useContext(AuthContext);

  const device_id = DeviceInfo.getUniqueId();

  const onLogout = async () => {
    const user_id = await getUser();
    logOutUser({ device_id, user_id: JSON.parse(user_id).id });
    signOutGoogle();
    removeUser();
    removeToken();
    dispatch({ type: 'SIGN_OUT' });
  };

  return (
    <View style={style.container}>
      {children}
      <View style={style.textView}>
        {icon && (
          <Icon
            name="logout"
            size={25}
            color={colors.primary}
            onPress={() => {
              show();
            }}
          />
        )}
      </View>
      <ConfirmDialog
        title="Do you want to logout ?"
        visible={showAlert}
        onTouchOutside={() => setShowAlert(false)}
        contentStyle={{ display: 'none' }}
        dialogStyle={{ borderRadius: 5 }}
        titleStyle={deleteAlertStyle.text1}
        positiveButton={{
          titleStyle: deleteAlertStyle.delete,
          title: 'LOGOUT',
          onPress: () => {
            onLogout();
            hide();
          },
        }}
        negativeButton={{
          titleStyle: deleteAlertStyle.cancel,
          title: 'CANCEl',
          onPress: () => hide(),
        }}
      />
    </View>
  );
};

export { tabHeader };
