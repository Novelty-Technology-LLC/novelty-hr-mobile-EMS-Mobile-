import React from 'react';
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
      {error.duration && touched.duration && (
        <Text style={style.error}>{error.duration}</Text>
      )}
    </View>
  );
};

export default Time;
