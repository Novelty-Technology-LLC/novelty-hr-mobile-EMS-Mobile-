import React from 'react';
import { View, Text } from 'react-native';
import { settingStyle as style } from '../../assets/styles';

const ComingSoon = () => {
  return (
    <View style={style.comingSoonContainer}>
      <Text style={style.comingSoonText}>COMING SOON</Text>
    </View>
  );
};

export { ComingSoon };
