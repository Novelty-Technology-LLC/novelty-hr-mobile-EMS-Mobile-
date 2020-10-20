import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { headerText } from '../../assets/styles';
import { settingStyle as style } from '../../assets/styles/tabs';
import { ComingSoon, tabHeader as Header } from '../common';

import { AuthContext } from '../reducer';

const Activity = () => {
  return (
    <View style={style.container}>
      <Header>
        <Text style={headerText}>Activity</Text>
      </Header>
      <ComingSoon />
    </View>
  );
};

export { Activity };
