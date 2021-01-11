import React, { useState, useRef } from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Textarea from 'react-native-textarea';
import { descriptionStyle as style } from '../../../assets/styles';
import { HashTagButton } from '../../common';
import { ProjectPlaceHolder } from '../loader';

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
  const [type, setType] = useState(0);
  const [loading, setloading] = useState(false);
  const [hashtag, setHashtag] = useState([
    {
      label: '#meeting',
      value: '#meeting',
      isSelected: false,
      key: '1',
    },
    {
      label: '#discussion',
      value: '#discussion',
      key: '2',
      isSelected: false,
    },
    {
      label: '#R&D',
      value: '#R&D',
      key: '3',
      isSelected: false,
    },
  ]);

  return (
    <View>
      <View style={[style.main, editlog ? { marginTop: 0 } : {}]}>
        <Text style={style.text}>{timelog ? 'Task summary' : 'Note'}</Text>
        {timelog && (
          <>
            <View style={style.hashtag}>
              {loading && <ProjectPlaceHolder />}
              {hashtag.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    item.isSelected = !item.isSelected;
                    setType(0),
                      handleChange('hashtag')(
                        JSON.stringify(
                          hashtag
                            .filter((item) => item.isSelected === true)
                            .map((item) => item.value)
                        )
                      );
                  }}
                >
                  <HashTagButton text={item.label} active={item.isSelected} />
                </TouchableOpacity>
              ))}
            </View>
          </>
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
