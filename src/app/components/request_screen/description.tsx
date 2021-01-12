import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Textarea from 'react-native-textarea';
import { descriptionStyle as style } from '../../../assets/styles';
import { HashTagButton } from '../../common';
import { HashtagPlaceHolder } from '../loader';
import { getHash } from '../../services/timeLogService';

const Description = ({
  handleChange,
  defaultValue,
  timelog,
  editlog,
  error,
  touched,
  values,
  updatehashtag,
}: {
  handleChange: Function;
  defaultValue?: string;
  timelog?: boolean;
  editlog?: boolean;
  error?: any;
  touched?: any;
  values?: any;
  updatehashtag?: any;
}) => {
  const [type, setType] = useState(0);
  const [loading, setloading] = useState(false);
  const [hashtag, setHashtag] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        setloading(true);
        const response = await getHash('timelogHashtag');
        const mapData =
          updatehashtag !== null
            ? response.hashtags.map((item) => {
                if (updatehashtag.includes(item.value)) {
                  return {
                    ...item,
                    isSelected: true,
                  };
                }
                return item;
              })
            : response.hashtags.map((item) => {
                return {
                  ...item,
                  isSelected: false,
                };
              });
        setHashtag(mapData);
        setloading(false);
      } catch (error) {
        setloading(false);
      }
    };
    fetch();
  }, [updatehashtag]);

  return (
    <View>
      <View style={[style.main, editlog ? { marginTop: 0 } : {}]}>
        <Text style={style.text}>{timelog ? 'Task summary' : 'Note'}</Text>
        {timelog && (
          <>
            <View style={style.hashtag}>
              {loading && <HashtagPlaceHolder />}
              {hashtag.length > 0 &&
                hashtag.map((item, index) => (
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
          defaultValue={defaultValue ? defaultValue : values?.note}
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
