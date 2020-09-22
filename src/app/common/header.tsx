import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import color from '../../assets/colors';
import { headerStyle as style } from '../../assets/styles';
import { AuthContext } from '../reducer';
import { removeToken } from '../utils';

const header = ({ children }: any) => {
  const navigation = useNavigation();
  const { dispatch } = useContext(AuthContext);

  return (
    <View style={style.container}>
      <View style={style.textContainer}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={30} color={color.primary} />
        </TouchableWithoutFeedback>
        <View style={style.textView}>{children}</View>
      </View>
      <TouchableWithoutFeedback
        onPress={() => {
          removeToken();
          dispatch({ type: 'SIGN_OUT' });
        }}
      >
        <Icon name="logout" size={25} color={color.primary} />
      </TouchableWithoutFeedback>
    </View>
  );
};

export { header };
