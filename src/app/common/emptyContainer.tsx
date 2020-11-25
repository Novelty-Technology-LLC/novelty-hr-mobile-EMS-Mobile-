import { emptyContainerStyle as style } from '../../assets/styles';
import React from 'react';
import { Text, View } from 'react-native';

const EmptyContainer = ({ text }: { text: string }) => {
  return (
    <View style={style.emptyContainer}>
      <Text style={style.emptyText}>{text}</Text>
    </View>
  );
};

export { EmptyContainer };
