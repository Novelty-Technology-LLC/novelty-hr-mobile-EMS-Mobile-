import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { settingStyle as style } from '../../assets/styles/tabs';
import { header as Header } from '../common/header';
import { headerText } from '../../assets/styles';
import { removeToken, removeUser } from '../utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../reducer';
import colors from '../../assets/colors';

const ComingSoon = () => {
  const { dispatch } = useContext(AuthContext);
  return (
    <View style={style.container}>
      <Header>
        <View style={style.headerView}>
          <Text style={headerText}>Setting</Text>
          <Icon
            name="logout"
            size={25}
            color={colors.primary}
            onPress={() => {
              removeUser();
              removeToken();
              dispatch({ type: 'SIGN_OUT' });
            }}
          ></Icon>
        </View>
      </Header>
    </View>
  );
};

export { ComingSoon };
