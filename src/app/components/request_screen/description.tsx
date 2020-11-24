import React from 'react';
import { View, Text } from 'react-native';
import Textarea from 'react-native-textarea';
import { descriptionStyle as style } from '../../../assets/styles';

const Description = ({
  handleChange,
  defaultValue,
  timelog,
  editlog,
  error,
  touched,
}: {
  handleChange: Function;
  defaultValue?: string;
  timelog?: boolean;
  editlog?: boolean;
  error?: any;
  touched?: any;
}) => {
  return (
    <View>
      <View style={style.main}>
        <Text style={style.text}>
          {timelog ? 'Task summary' : 'Write a note'}
        </Text>
        <Textarea
          containerStyle={
            error ? style.textareaContainer : style.editlogContainer
          }
          style={style.textArea}
          maxLength={200}
          defaultValue={defaultValue}
          placeholder={
            timelog
              ? 'Write a short summary about the task..'
              : 'Write a short note for your leave..'
          }
          placeholderTextColor={'#c7c7c7'}
          underlineColorAndroid={'transparent'}
          name="note"
          label="note"
          onChangeText={error ? handleChange('note') : handleChange}
        />
        {error && touched && error.note && touched.note && (
          <Text style={style.error}>{error.note}</Text>
        )}
      </View>
    </View>
  );
};

export { Description };
