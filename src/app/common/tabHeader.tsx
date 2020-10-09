import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { removeToken, removeUser } from '../utils';
import { headerStyle as style } from '../../assets/styles';
import colors from '../../assets/colors';
import { AuthContext } from '../reducer';

const tabHeader = ({ onPress = null, icon = false, children }: any) => {
  const navigation = useNavigation();
  const { dispatch } = useContext(AuthContext);

  return (
    <View style={style.container}>
      {children}
      <View style={style.textView}>
        {icon && (
          <TouchableWithoutFeedback onPress={onPress || navigation.goBack}>
            <Icon
              name="logout"
              size={25}
              color={colors.primary}
              onPress={() => {
                removeUser();
                removeToken();
                dispatch({ type: 'SIGN_OUT' });
              }}
            />
          </TouchableWithoutFeedback>
        )}
      </View>
    </View>
  );
};

export { tabHeader };
