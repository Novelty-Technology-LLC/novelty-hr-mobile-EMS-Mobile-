import React from 'react';
import { View, Text } from 'react-native';
import { headerTxtStyle } from '../../assets/styles';
import { settingStyle as style } from '../../assets/styles/tabs';
import { ComingSoon, tabHeader as Header } from '../common';

const Activity = () => {
  return (
    <View style={style.container}>
      <Header>
        <Text style={headerTxtStyle.headerText}>Activity</Text>
      </Header>
      <ComingSoon>COMING SOON</ComingSoon>
    </View>
  );
};

export { Activity };
