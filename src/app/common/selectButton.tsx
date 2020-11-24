import React from 'react';
import { selectButtonStyle as style } from '../../assets/styles';
import { View, Text } from 'react-native';

import { AppIcon } from './icon';
import colors from '../../assets/colors';

const SelectButton = ({ text, active }: { text: string; active: Boolean }) => {
  return (
    <View style={active ? style.paidView : style.floatingView}>
      {active && (
        <View style={style.timelogicon}>
          <AppIcon
            name="check-circle"
            color={colors.primary}
            size={17}
            style={{ marginRight: 3 }}
          />
        </View>
      )}
      <Text style={active ? style.buttonTextPaid : style.buttonTextFloat}>
        {text}
      </Text>
    </View>
  );
};

export { SelectButton };
