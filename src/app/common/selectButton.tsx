import React from 'react';
import { selectButtonStyle as style } from '../../assets/styles';
import { View, Text } from 'react-native';

const SelectButton = ({ text, active }: { text: string; active: Boolean }) => {
  return (
    <View style={active ? style.paidView : style.floatingView}>
      <Text style={active ? style.buttonTextPaid : style.buttonTextFloat}>
        {text}
      </Text>
    </View>
  );
};

export { SelectButton };
