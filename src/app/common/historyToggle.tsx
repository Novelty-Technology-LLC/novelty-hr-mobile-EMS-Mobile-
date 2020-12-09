import React from 'react';
import { View, Text } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import colors from '../../assets/colors';
import { myRequestsStyle as style } from '../../assets/styles';
import { AppIcon } from './icon';

const HistoryToggle = ({
  toggle,
  setToggle,
}: {
  toggle: string;
  setToggle: Function;
}) => {
  return (
    <View style={style.row}>
      <Text style={style.history}> History</Text>
      <View style={style.gap}></View>
      <TouchableWithoutFeedback
        onPress={() => {
          setToggle(
            toggle === 'toggle-switch' ? 'toggle-switch-off' : 'toggle-switch'
          );
        }}
      >
        <AppIcon
          name={toggle}
          color={toggle === 'toggle-switch' ? colors.primary : colors.secondary}
          size={40}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default HistoryToggle;
