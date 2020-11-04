import React from 'react';
import { View, Text } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { calenderStyle, descriptionStyle } from '../../../assets/styles';
import { Task } from './task';
import Swipe from '../leave_screen/swipe';

const Tasks = ({ value }) => {
  return (
    <View style={descriptionStyle.main}>
      <Text style={descriptionStyle.text}>Tasks </Text>
      {value.map((item) => (
        <Swipeable
          renderRightActions={() => <Swipe edittimelog={true} item={item} />}
        >
          <Task item={item} />
        </Swipeable>
      ))}
    </View>
  );
};

export { Tasks };
