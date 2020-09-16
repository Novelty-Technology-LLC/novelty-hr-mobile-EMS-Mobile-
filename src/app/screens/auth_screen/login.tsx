import React from 'react';
import {Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {loginStyle as style} from '../../../assets/styles';

const Login = () => {
  const navigation = useNavigation();

  return (
    <View style={style.container}>
      <Text style={style.title}>Novelty EMS</Text>
      <Text>Continue with</Text>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate('leaveList')}>
        <Text>Leave List</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

export {Login};
