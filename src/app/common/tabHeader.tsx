import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { removeToken, removeUser } from '../utils';
import { headerStyle as style, deleteAlertStyle } from '../../assets/styles';
import colors from '../../assets/colors';
import { AuthContext } from '../reducer';
import { signOutGoogle } from '../services';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import normalize from 'react-native-normalize';

const tabHeader = ({ onPress = null, icon = false, children }: any) => {
  const [showAlert, setShowAlert] = useState(false);
  const show = () => setShowAlert(true);
  const hide = () => setShowAlert(false);
  const { dispatch } = useContext(AuthContext);

  const onLogout = () => {
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
        contentStyle={{ marginBottom: normalize(-20) }}
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
