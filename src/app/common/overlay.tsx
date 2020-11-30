import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { headerStyle } from '../../assets/styles';

const Overlay = () => {
  return (
    <View style={headerStyle.overlay}>
      <ActivityIndicator size={50} color="white" />
    </View>
  );
};

export default Overlay;
