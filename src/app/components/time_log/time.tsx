import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import {
  calenderStyle,
  descriptionStyle as style,
} from '../../../assets/styles';
import TimePicker from 'react-native-simple-time-picker';

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
          underlineColorAndroid={'transparent'}
          keyboardType="numeric"
          name="hrs"
          label="hrs"
          onChangeText={(data) => handleChange('duration')(data)}
        />
        <Text style={style.colon}>:</Text>
        <TextInput
          style={[style.textArea, style.textinputTime]}
          placeholderTextColor={'#c7c7c7'}
          placeholder={'MM'}
          underlineColorAndroid={'transparent'}
          keyboardType="numeric"
          name="mins"
          label="mins"
          onChangeText={(data) => handleChange('duration')(data)}
        />
      </View>
      {/* <TimePicker
        selectedHours={hours}
        selectedMinutes={mins}
        hoursUnit={'(hrs)'}
        minutesUnit={'(mins)'}
        onChange={(hours, minutes) => console.log({ hours, minutes })}
      /> */}

      {error.duration && touched.duration && (
        <Text style={style.error}>{error.duration}</Text>
      )}
    </View>
  );
};

export default Time;
