import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import {
  calenderStyle,
  descriptionStyle as style,
} from '../../../assets/styles';
import { Picker } from 'react-native-wheel-datepicker';
import { getHrsMins } from '../../utils';

const Time = ({
  handleChange,
  error,
  touched,
  defaultValue,
}: {
  handleChange: Function;
  error: any;
  touched: any;
  defaultValue?: string;
}) => {
  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);

  return (
    <View style={[style.main, calenderStyle.container]}>
      <Text style={style.text}>Time *</Text>
      <View style={style.row}>
        <Picker
          style={[style.textArea, style.textinputTime]}
          selectedValue={defaultValue ? getHrsMins(defaultValue).hr : 1}
          pickerData={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
          onValueChange={(intdata: number) => {
            setHours(intdata);
            handleChange('duration')((intdata * 60 + mins).toString());
          }}
        />
        <Text style={style.colon}>HRS</Text>
        <Text style={style.colon}>:</Text>
        <Picker
          style={[style.textArea, style.textinputTime]}
          selectedValue={defaultValue ? getHrsMins(defaultValue).mins : 5}
          pickerData={[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]}
          onValueChange={(intdata: number) => {
            setMins(intdata);
            handleChange('duration')((hours * 60 + intdata).toString());
          }}
        />
        <Text style={style.colon}>MINS</Text>
      </View>
      {error.duration && touched.duration && (
        <Text style={style.error}>{error.duration}</Text>
      )}
    </View>
  );
};

export default Time;
