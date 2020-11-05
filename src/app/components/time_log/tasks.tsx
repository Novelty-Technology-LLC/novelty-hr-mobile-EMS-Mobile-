import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { descriptionStyle, timeLogStyle } from '../../../assets/styles';
import { Task } from './task';
import Swipe from '../leave_screen/swipe';
import { AppIcon } from '../../common';
import colors from '../../../assets/colors';
import { EditLogAlert } from '../time_log/editLog';

const Tasks = ({ value, handleChange }: any) => {
  const [showAlert, setShowAlert] = useState(false);

  return (
    <View style={descriptionStyle.main}>
      <View style={[timeLogStyle.rowAlign, timeLogStyle.pad]}>
        <Text style={descriptionStyle.text}>Tasks </Text>
        <TouchableOpacity onPress={() => setShowAlert(true)}>
          <AppIcon name="plus" color={colors.black} size={20} />
        </TouchableOpacity>
      </View>
      {value.note.map((item) => (
        <Swipeable
          key={item.id}
          renderRightActions={() => (
            <Swipe
              edittimelog={true}
              item={item}
              value={value}
              handleChange={handleChange}
            />
          )}
        >
          <Task item={item} />
        </Swipeable>
      ))}
      <EditLogAlert
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        item={value}
        handleChange={handleChange}
      />
    </View>
  );
};

export { Tasks };
