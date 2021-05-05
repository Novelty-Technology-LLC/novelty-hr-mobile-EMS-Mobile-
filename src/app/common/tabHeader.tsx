import React, { useContext, useState } from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { removeToken, removeUser, getUser } from "../utils";
import { headerStyle as style, deleteAlertStyle } from "../../assets/styles";
import colors from "../../assets/colors";
import { AuthContext } from "../reducer";
import { signOutGoogle, logOutUser } from "../services";
import { ConfirmDialog } from "react-native-simple-dialogs";
import DeviceInfo from "react-native-device-info";
import { CommonActions } from "@react-navigation/native";

const tabHeader = ({ onPress = null, icon = false, children, navigation }: any) => {
  const [showAlert, setShowAlert] = useState(false);
  const show = () => setShowAlert(true);
  const hide = () => setShowAlert(false);
  const { dispatch } = useContext<any>(AuthContext);

  const device_id = DeviceInfo.getUniqueId();

  const onLogout = async () => {
    const user_id = await getUser();
    logOutUser({ device_id, user_id: JSON.parse(user_id).id }).then((data) => {
      // Reset stack navigation while logging out
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'login' }]
        })
      );
      dispatch({ type: "SIGN_OUT" });
      signOutGoogle();
      removeUser();
      removeToken();
    });
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
        contentStyle={{
          marginTop: -30,
        }}
        dialogStyle={{ borderRadius: 5 }}
        titleStyle={deleteAlertStyle.text1}
        positiveButton={{
          titleStyle: deleteAlertStyle.delete,
          title: "LOGOUT",
          onPress: () => {
            onLogout();
            hide();
          },
        }}
        negativeButton={{
          titleStyle: deleteAlertStyle.cancel,
          title: "CANCEL",
          onPress: () => hide(),
        }}
      />
    </View>
  );
};

export { tabHeader };
