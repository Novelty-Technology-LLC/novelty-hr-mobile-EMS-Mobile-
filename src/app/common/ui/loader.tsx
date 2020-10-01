import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { loaderStyle as s } from '../../../assets/styles/';

interface LoaderPropType {
  size?: any;
  color?: string;
  styles?: any;
}
const Loader = (prop: LoaderPropType) => {
  return (
    <View style={[s.container, prop.styles]}>
      <ActivityIndicator size={prop.size} color={prop.color} />
    </View>
  );
};

export { Loader };
