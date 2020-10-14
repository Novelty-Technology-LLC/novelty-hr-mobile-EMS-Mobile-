import React, { Children } from 'react';
import { TouchableOpacity } from 'react-native';

interface buttonPropType {
  style: object;
  title: string;
  onPress: Function;
}

const button = ({ children, onPress }) => {
  return (
    <>
      <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>
    </>
  );
};

export { button };
