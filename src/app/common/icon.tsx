import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AppIcon = ({ style = null, name, color, size }: any) => {
  return <Icon name={name} color={color} size={size} style={style} />;
};

export { AppIcon };
