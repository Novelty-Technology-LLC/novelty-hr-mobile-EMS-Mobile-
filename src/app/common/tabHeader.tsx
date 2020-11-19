import React, { useContext, useState } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { removeToken, removeUser } from '../utils';
import { headerStyle as style, deleteAlertStyle } from '../../assets/styles';
import colors from '../../assets/colors';
import { AuthContext } from '../reducer';
import Dialog from 'react-native-dialog';
import { signOutGoogle } from '../services';

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
      <Dialog.Container
        visible={showAlert}
        contentStyle={deleteAlertStyle.dialogContainer}
      >
        <View style={deleteAlertStyle.container}>
          <View style={deleteAlertStyle.main}>
            <Dialog.Title style={deleteAlertStyle.text1}>
              Do you want to logout ?
            </Dialog.Title>
          </View>
        </View>
        <View style={deleteAlertStyle.buttons}>
          <Dialog.Button
            label="CANCEL"
            onPress={hide}
            style={deleteAlertStyle.cancel}
          />
          <Dialog.Button
            label="LOGOUT"
            onPress={() => {
              onLogout();
              hide();
            }}
            style={deleteAlertStyle.delete}
          />
        </View>
      </Dialog.Container>
    </View>
  );
};

export { tabHeader };
