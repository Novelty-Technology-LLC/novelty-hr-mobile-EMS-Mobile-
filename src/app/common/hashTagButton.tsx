import React from 'react';
import { hashtagStyle as style } from '../../assets/styles';
import { View, Text } from 'react-native';

const HashTagButton = ({ text, active }: { text: string; active: Boolean }) => {
  return (
    <View style={active ? style.paidView : style.floatingView}>
      <Text style={active ? style.buttonTextPaid : style.buttonTextFloat}>
        {text}
      </Text>
    </View>
  );
};

export { HashTagButton };
