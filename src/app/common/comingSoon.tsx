import React from 'react';
import { View, Text } from 'react-native';
import { settingStyle as style } from '../../assets/styles';

const ComingSoon = ({ children }: any) => {
  return (
    <View style={style.comingSoonContainer}>
      <Text style={style.comingSoonText}>{children}</Text>
    </View>
  );
};

export { ComingSoon };
