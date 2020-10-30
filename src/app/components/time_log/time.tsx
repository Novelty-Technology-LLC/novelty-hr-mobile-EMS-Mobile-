import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import {
  calenderStyle,
  descriptionStyle as style,
} from '../../../assets/styles';

const Time = ({
  handleChange,
  error,
  touched,
}: {
  handleChange: Function;
  error: any;
  touched: any;
}) => {
  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);
  return (
    <View style={[style.main, calenderStyle.container]}>
      <Text style={style.text}>Time *</Text>
      <View style={style.row}>
        <TextInput
          style={[style.textArea, style.textinputTime]}
          placeholderTextColor={'#c7c7c7'}
          placeholder={'HH'}
          maxLength={2}
          underlineColorAndroid={'transparent'}
          keyboardType="numeric"
          name="hrs"
          label="hrs"
          onChangeText={(data) => {
            let intdata = data === '' ? 0 : data;
            setHours(intdata);
            handleChange('duration')((data * 60 + parseInt(mins)).toString());
          }}
        />
        <Text style={style.colon}>HRS</Text>
        <Text style={style.colon}>:</Text>
        <TextInput
          style={[style.textArea, style.textinputTime]}
          placeholderTextColor={'#c7c7c7'}
          placeholder={'MM'}
          maxLength={2}
          underlineColorAndroid={'transparent'}
          keyboardType="numeric"
          name="mins"
          label="mins"
          onChangeText={(data) => {
            let intdata = data === '' ? 0 : data;
            setMins(intdata);
            handleChange('duration')(
              (hours * 60 + parseInt(intdata)).toString()
            );
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
