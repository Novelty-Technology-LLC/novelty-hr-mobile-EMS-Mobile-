import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { leaveType as style } from '../../../assets/styles';
import color from '../../../assets/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function Leavetype({
  handleChange,
  defaultValue,
}: {
  handleChange: Function;
  defaultValue: string;
}) {
  const [type, setType] = useState(
    defaultValue ? (defaultValue.toUpperCase() === 'PAID TIME OFF' ? 1 : 0) : 1
  );
  return (
    <View style={style.container}>
      <View style={style.wrapper}>
        <Text style={style.text}>Choose Leave Type</Text>
        <View style={style.requestBody}>
          <TouchableOpacity
            onPress={() => {
              setType(1), handleChange('type')('PAID TIME OFF');
            }}
          >
            <View style={type == 1 ? style.paidView : style.floatingView}>
              <View style={style.icon}>
                {type === 1 && (
                  <Icon
                    name="check-circle"
                    color={color.primary}
                    size={17}
                    style={{ marginRight: 6 }}
                  />
                )}
              </View>
              <Text
                style={type == 0 ? style.buttonTextFloat : style.buttonTextPaid}
              >
                Paid Time Off
              </Text>
            </View>
          </TouchableOpacity>
          <View style={style.spacer}></View>
          <TouchableOpacity
            onPress={() => {
              setType(0), handleChange('type')('FLOATING DAY');
            }}
          >
            <View style={type == 1 ? style.floatingView : style.paidView}>
              <View style={style.icon}>
                {type === 0 && (
                  <Icon
                    name="check-circle"
                    color={color.primary}
                    size={17}
                    style={{ marginRight: 6 }}
                  />
                )}
              </View>
              <Text
                style={type == 1 ? style.buttonTextFloat : style.buttonTextPaid}
              >
                Floating day
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export { Leavetype };
