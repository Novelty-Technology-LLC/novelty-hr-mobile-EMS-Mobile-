import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { leaveType as style } from '../../../assets/styles';
import color from '../../../assets/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function Leavetype({ handleChange }) {
  const [type, setType] = useState(1);

  return (
    <View style={style.main}>
      <View style={style.wrapper}>
        <Text style={style.text}>Choose Leave Type</Text>
        <View style={style.body}>
          <TouchableOpacity
            onPress={() => {
              setType(1), handleChange('leaveType')('paid time of');
            }}
          >
            <View style={type == 1 ? style.paidView : style.floatingView}>
              {type === 1 && (
                <Icon
                  name="check-circle"
                  color={color.primary}
                  size={17}
                  style={{ marginRight: 6 }}
                />
              )}
              <Text>Paid Time Off</Text>
            </View>
          </TouchableOpacity>
          <View style={style.spacer}></View>
          <TouchableOpacity
            onPress={() => {
              setType(0), handleChange('leaveType')('floating day');
            }}
          >
            <View style={type == 1 ? style.floatingView : style.paidView}>
              {type === 0 && (
                <Icon
                  name="check-circle"
                  color={color.primary}
                  size={17}
                  style={{ marginRight: 6 }}
                />
              )}
              <Text>Floating day</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Leavetype;
