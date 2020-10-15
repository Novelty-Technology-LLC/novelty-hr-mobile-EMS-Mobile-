import React from 'react';
import { View, Text } from 'react-native';
import Textarea from 'react-native-textarea';

import { descriptionStyle as style } from '../../../assets/styles';

const Description = ({
  handleChange,
  defaultValue,
}: {
  handleChange: Function;
  defaultValue?: string;
}) => {
  return (
    <View>
      <View style={style.main}>
        <Text style={style.text}>Write a note</Text>
        <Textarea
          containerStyle={style.textareaContainer}
          style={style.textArea}
          maxLength={200}
          defaultValue={defaultValue}
          placeholder={'Write a short note for your leave..'}
          placeholderTextColor={'#c7c7c7'}
          underlineColorAndroid={'transparent'}
          name="description"
          onChangeText={handleChange('note')}
        />
      </View>
    </View>
  );
};

export { Description };
