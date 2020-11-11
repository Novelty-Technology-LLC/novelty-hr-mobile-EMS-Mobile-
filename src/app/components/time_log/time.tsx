import React, { useState } from 'react';
import { View, Text, Platform } from 'react-native';
import {
  calenderStyle,
  descriptionStyle as style,
} from '../../../assets/styles';

import { Picker } from '@react-native-picker/picker';
import { Picker as AndroidPicker } from 'react-native-wheel-pick';

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
        {Platform.OS === 'android' ? (
          <>
            <AndroidPicker
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
          </>
        ) : (
          <Picker
            selectedValue={hours}
            style={style.iospicker}
            onValueChange={(intdata: number) => {
              setHours(intdata);
              error
                ? handleChange('duration')((intdata * 60 + mins).toString())
                : handleChange((intdata * 60 + mins).toString());
            }}
          >
            <Picker.Item label="1 hr" value={1} />
            <Picker.Item label="2 hrs" value={2} />
            <Picker.Item label="3 hrs" value={3} />
            <Picker.Item label="4 hrs" value={4} />
            <Picker.Item label="5 hrs" value={5} />
            <Picker.Item label="6 hrs" value={6} />
            <Picker.Item label="7 hrs" value={7} />
            <Picker.Item label="8 hrs" value={8} />
            <Picker.Item label="9 hrs" value={9} />
            <Picker.Item label="10 hrs" value={10} />
            <Picker.Item label="11 hrs" value={11} />
            <Picker.Item label="12 hrs" value={12} />
          </Picker>
        )}

        <Text style={style.colon}>:</Text>
        {Platform.OS === 'android' ? (
          <>
            <AndroidPicker
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
          </>
        ) : (
          <Picker
            selectedValue={mins}
            style={style.iospicker}
            onValueChange={(intdata: number) => {
              setMins(intdata);
              error
                ? handleChange('duration')((hours * 60 + intdata).toString())
                : handleChange((hours * 60 + intdata).toString());
            }}
          >
            <Picker.Item label="0 min" value={0} />
            <Picker.Item label="15 mins" value={15} />
            <Picker.Item label="30 mins" value={30} />
            <Picker.Item label="45 mins" value={45} />
          </Picker>
        )}
      </View>
      {error && touched && error.duration && touched.duration && (
        <Text style={style.error}>{error.duration}</Text>
      )}
    </View>
  );
};

export default Time;
