import { emptyContainerStyle as style } from '../../assets/styles';
import React from 'react';
import { Text, View } from 'react-native';

const EmptyContainer = ({
  text,
  containerStyle,
}: {
  text: string;
  containerStyle?: object;
}) => {
  return (
    <View style={[style.emptyContainer, containerStyle]}>
      <Text style={[style.emptyText]}>{text}</Text>
    </View>
  );
};

export { EmptyContainer };
