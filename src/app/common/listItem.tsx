import React from 'react';
import { View, Text } from 'react-native';

const ListItem = ({ title, subTitle }: { title: string; subTitle: string }) => {
  return (
    <View style={{ width: '100%' }}>
      <Text>{title}</Text>
      <Text>{subTitle}</Text>
    </View>
  );
};

export { ListItem };
