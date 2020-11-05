import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { descriptionStyle, timeLogStyle } from '../../../assets/styles';
import { Task } from './task';
import Swipe from '../leave_screen/swipe';
import { AppIcon } from '../../common';
import colors from '../../../assets/colors';
import { EditLogAlert } from '../time_log/editLog';

const Tasks = ({ value }) => {
  const [showAlert, setShowAlert] = useState(false);

  return (
    <View style={descriptionStyle.main}>
      <View style={[timeLogStyle.rowAlign, timeLogStyle.pad]}>
        <Text style={descriptionStyle.text}>Tasks </Text>
        <TouchableOpacity onPress={() => setShowAlert(true)}>
          <AppIcon name="plus" color={colors.black} size={20} />
        </TouchableOpacity>
      </View>
      {value.map((item) => (
        <Swipeable
          renderRightActions={() => <Swipe edittimelog={true} item={item} />}
        >
          <Task item={item} />
        </Swipeable>
      ))}
      <EditLogAlert showAlert={showAlert} setShowAlert={setShowAlert} />
    </View>
  );
};

export { Tasks };
