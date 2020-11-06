import React, { useState } from 'react';
import { View, Text } from 'react-native';
import {
  calenderStyle,
  descriptionStyle as style,
} from '../../../assets/styles';
import { Picker } from 'react-native-wheel-pick';
import { getHrsMins } from '../../utils';

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
  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);

  return (
    <View
      style={[edit ? style.alertmain : style.main, calenderStyle.container]}
    >
      <Text style={style.text}>Time *</Text>
      <View style={style.row}>
        <Picker
          style={[style.textArea, style.textinputTime]}
          selectedValue={defaultValue ? getHrsMins(defaultValue).hr : 1}
          pickerData={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
          onValueChange={(intdata: number) => {
            setHours(intdata);
            error
              ? handleChange('duration')((intdata * 60 + mins).toString())
              : handleChange((intdata * 60 + mins).toString());
          }}
        />
        <Text style={style.colon}>HRS</Text>
        <Text style={style.colon}>:</Text>
        <Picker
          style={[style.textArea, style.textinputTime]}
          selectedValue={defaultValue ? getHrsMins(defaultValue).mins : 5}
          pickerData={[0, 15, 30, 45]}
          onValueChange={(intdata: number) => {
            setMins(intdata);
            error
              ? handleChange('duration')((hours * 60 + intdata).toString())
              : handleChange((hours * 60 + intdata).toString());
          }}
        />
        <Text style={style.colon}>MINS</Text>
      </View>
      {error && touched && error.duration && touched.duration && (
        <Text style={style.error}>{error.duration}</Text>
      )}
    </View>
  );
};

export default Time;
