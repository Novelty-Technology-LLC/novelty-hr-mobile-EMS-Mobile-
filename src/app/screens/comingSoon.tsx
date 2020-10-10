import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { settingStyle as style } from '../../assets/styles/tabs';
import { tabHeader as Header } from "../common";
import { headerText } from '../../assets/styles';
import { AuthContext } from '../reducer';

const ComingSoon = () => {

  return (
    <View style={style.container}>
      <Header icon={true}><Text style={headerText}>Setting</Text></Header>
    </View>
  );
};

export { ComingSoon };

