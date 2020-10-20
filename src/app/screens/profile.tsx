import React from 'react';
import { View, Text } from 'react-native';
import { headerText } from '../../assets/styles';
import { settingStyle as style } from '../../assets/styles/tabs';
import { ComingSoon, tabHeader as Header } from '../common';

const Profile = () => {
  return (
    <View style={style.container}>
      <Header>
        <Text style={headerText}>Profile</Text>
      </Header>
      <ComingSoon />
    </View>
  );
};

export { Profile };
