import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { settingStyle as style } from '../../assets/styles/tabs';
import { tabHeader as Header } from '../common';
import { headerText } from '../../assets/styles';
import { ComingSoon as Soon } from '../common';
import { AuthContext } from '../reducer';

const ComingSoon = () => {
  const { state } = useContext(AuthContext);
  return (
    <View style={style.container}>
      <Header>
        <Text style={headerText}>Setting</Text>
      </Header>
      <Soon>Welcome to Novelty EMS, {state.user.email}</Soon>
    </View>
  );
};

export { ComingSoon };
