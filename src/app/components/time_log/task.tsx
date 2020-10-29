import React from 'react';
import { View, Text, TextInput } from 'react-native';
import {
  calenderStyle,
  descriptionStyle as style,
} from '../../../assets/styles';

const Task = ({
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
      <Text style={style.text}>Task *</Text>
      <TextInput
        style={[style.textArea, style.textinputContainer]}
        placeholderTextColor={'#c7c7c7'}
        underlineColorAndroid={'transparent'}
        name="task"
        label="task"
        onChangeText={(data) => handleChange('task')(data)}
      />
      {error.task && touched.task && (
        <Text style={style.error}>{error.task}</Text>
      )}
    </View>
  );
};

export { Task };
