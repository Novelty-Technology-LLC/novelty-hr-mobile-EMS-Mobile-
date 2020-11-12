import React, { useState } from 'react';
import { View, Text } from 'react-native';
import {
  calenderStyle,
  descriptionStyle as style,
} from '../../../assets/styles';

import {
  WheelPicker,
  TimePicker,
  DatePicker,
} from 'react-native-wheel-picker-android';

const Time = ({
  handleChange,
  error,
  touched,
  defaultValue,
  edit,
}: {
  handleChange: Function;
  error?: any;
  touched?: any;
  defaultValue?: string;
  edit?: boolean;
}) => {
  const [hours, setHours] = useState('');
  const [mins, setMins] = useState(0);
  const hrdata = [
    '1 hr',
    '2 hrs',
    '3 hrs',
    '4 hrs',
    '5 hrs',
    '6 hrs',
    '7 hrs',
    '8 hrs',
    '9 hrs',
    '10 hrs',
    '11 hrs',
    '12 hrs',
  ];
  const mindata = ['0 min', '15 mins', '30 mins', '45 mins'];

  return (
    <View
      style={[edit ? style.alertmain : style.main, calenderStyle.container]}
    >
      <Text style={style.text}>Time *</Text>
      <View style={style.row}>
        <WheelPicker
          style={style.iospicker}
          onItemSelected={(index) => {
            const intdata = parseInt(hrdata[index].split(' ')[0]);
            setHours(intdata);
            error
              ? handleChange('duration')((intdata * 60 + mins).toString())
              : handleChange((intdata * 60 + mins).toString());
          }}
          data={hrdata}
          selectedItemTextSize={24}
        />
        <View>
          <Text style={style.colon}>:</Text>
        </View>

        <WheelPicker
          style={style.iospicker}
          onItemSelected={(index) => {
            const intdata = parseInt(mindata[index].split(' ')[0]);
            setMins(intdata);
            error
              ? handleChange('duration')((hours * 60 + intdata).toString())
              : handleChange((hours * 60 + intdata).toString());
          }}
          data={mindata}
          selectedItemTextSize={24}
        />
      </View>
      {error && touched && error.duration && touched.duration && (
        <Text style={style.error}>{error.duration}</Text>
      )}
    </View>
  );
};

export default Time;
