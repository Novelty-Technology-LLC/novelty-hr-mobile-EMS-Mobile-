import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { headerText } from '../../assets/styles';
import { settingStyle as style } from '../../assets/styles/tabs';
import { tabHeader as Header } from '../common';

import { AuthContext } from '../reducer';

const Activity = () => {
  const { dispatch } = useContext(AuthContext);
  return (
    <View style={style.container}>
      <Header icon={true}>
        <Text style={headerText}>Activity</Text>
      </Header>
    </View>
  );
};

export { Activity };
