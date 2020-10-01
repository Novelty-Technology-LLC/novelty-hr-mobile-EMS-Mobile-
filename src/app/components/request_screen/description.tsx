import React from 'react';
import { View, Text } from 'react-native';
import Textarea from 'react-native-textarea';

import { descriptionStyle as style } from '../../../assets/styles';

const Description = ({ handleChange }) => {
  return (
    <View>
      <View style={style.main}>
        <Text style={style.text}>Write a note</Text>
        <Textarea
          containerStyle={style.textareaContainer}
          style={style.textArea}
          maxLength={250}
          placeholder={'Write a short note for your leave..'}
          placeholderTextColor={'#c7c7c7'}
          underlineColorAndroid={'transparent'}
          name="description"
          onPress={dismiss}
          onChangeText={handleChange('note')}
        />
      </View>
    </View>
  );
};

export { Description };
