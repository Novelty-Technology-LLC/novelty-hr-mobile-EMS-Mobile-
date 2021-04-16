import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import normalize from 'react-native-normalize';
import { leaveType, leaveType as style } from '../../../assets/styles';
import { SelectButton, SmallHeader } from '../../common';

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
      <View style={[style.wrapper, { marginBottom: normalize(15) }]}>
        <SmallHeader text="Choose Leave Type" />
        <View style={style.requestBody}>
          <TouchableOpacity
            onPress={() => {
              setType(1), handleChange('type')('PAID TIME OFF');
            }}
            style={leaveType.button}
          >
            <SelectButton text="Paid Time Off" active={type === 1} />
          </TouchableOpacity>
          <View style={style.spacer}></View>
          <TouchableOpacity
            onPress={() => {
              setType(0), handleChange('type')('FLOATING DAY');
            }}
            style={leaveType.button}
          >
            <SelectButton text="Floating day" active={type === 0} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export { Leavetype };
