import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import color from '../../assets/colors';
import { headerStyle as style } from '../../assets/styles';

const header = ({ onPress = null, children }: any) => {
  const navigation = useNavigation();
  console.log('press- > ', onPress);

  return (
    <View style={style.container}>
      <View style={style.textView}>
        <TouchableWithoutFeedback onPress={onPress || navigation.goBack}>
          <Icon name="chevron-left" size={30} color={color.primary} />
        </TouchableWithoutFeedback>
        {children}
      </View>
    </View>
  );
};

export { header };
