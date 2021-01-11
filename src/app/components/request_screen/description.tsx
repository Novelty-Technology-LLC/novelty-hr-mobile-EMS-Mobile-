import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Textarea from 'react-native-textarea';
import { descriptionStyle as style } from '../../../assets/styles';

const hashtag = [
  {
    label: '#meeting',
    value: '#meeting',
    key: '1',
  },
  {
    label: '#discussion',
    value: '#discussion',
    key: '2',
  },
  {
    label: '#R&D',
    value: '#R&D',
    key: '3',
  },
];

const Description = ({
  handleChange,
  defaultValue,
  timelog,
  editlog,
  error,
  touched,
  values,
}: {
  handleChange: Function;
  defaultValue?: string;
  timelog?: boolean;
  editlog?: boolean;
  error?: any;
  touched?: any;
  values?: any;
}) => {
  const [hash, sethash] = useState('');
  const append = (item: any) => {
    sethash(item.value);
    values.note = values.note + item.value;
  };

  return (
    <View>
      <View style={[style.main, editlog ? { marginTop: 0 } : {}]}>
        <Text style={style.text}>{timelog ? 'Task summary' : 'Note'}</Text>
        {timelog && (
          <View style={style.hashtag}>
            {hashtag.map((item) => (
              <TouchableWithoutFeedback
                onPress={() => append(item)}
                key={item.key}
              >
                <Text style={style.hashtagLabel}>{item.label}</Text>
              </TouchableWithoutFeedback>
            ))}
          </View>
        )}
        <Textarea
          containerStyle={
            error ? style.textareaContainer : style.editlogContainer
          }
          style={style.textArea}
          maxLength={200}
          defaultValue={defaultValue ? defaultValue : values.note}
          placeholder={
            timelog
              ? 'Write a short summary about your task..'
              : 'Write a short note for your leave..'
          }
          placeholderTextColor={'#c7c7c7'}
          underlineColorAndroid={'transparent'}
          name={timelog ? 'task' : 'note'}
          label={timelog ? 'task' : 'note'}
          onChangeText={(text: any) =>
            error ? handleChange('note')(text) : handleChange('task')(text)
          }
        />
        {error && touched && error.note && touched.note && (
          <Text style={style.error}>{error.note}</Text>
        )}
      </View>
    </View>
  );
};

export { Description };
