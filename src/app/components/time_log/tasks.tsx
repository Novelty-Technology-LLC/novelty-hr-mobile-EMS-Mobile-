import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { descriptionStyle, timeLogStyle } from '../../../assets/styles';
import { Task } from './task';
import Swipe from '../leave_screen/swipe';
import { AppIcon } from '../../common';
import colors from '../../../assets/colors';
import { EditLogAlert } from '../time_log/editLog';
import { getHrs, totalHours } from '../../utils';
import TaskContext from './taskContext';

const Tasks = ({ value, handleChange }: any) => {
  const [showAlert, setShowAlert] = useState(false);
  const [taskItem, setTaskItem] = useState(null);
  const { tasks } = useContext(TaskContext);
  let row: Array<any> = [];

  return (
    <View style={descriptionStyle.main}>
      <View style={timeLogStyle.rowAlign}>
        <Text style={descriptionStyle.text}>Tasks </Text>
        <TouchableOpacity onPress={() => setShowAlert(true)}>
          <AppIcon name="plus" color={colors.black} size={20} />
        </TouchableOpacity>
      </View>
      {tasks.map((item, index) => (
        <Swipeable
          key={item.id}
          ref={(ref) => (row[index] = ref)}
          renderRightActions={() => (
            <Swipe
              edittimelog={true}
              item={item}
              value={value}
              handleChange={handleChange}
              onPress={() => row[index].close()}
            />
          )}
        >
          <TouchableOpacity
            onPress={() => {
              setTaskItem(item);
              setShowAlert(true);
            }}
          >
            <Task item={item} />
          </TouchableOpacity>
        </Swipeable>
      ))}

      <View style={timeLogStyle.dateView}>
        <View style={[timeLogStyle.total, timeLogStyle.gap]}>
          <Text style={timeLogStyle.date}>Total</Text>
          <Text style={timeLogStyle.duration}>
            {getHrs(totalHours({ note: tasks }))}
          </Text>
        </View>
      </View>
      <EditLogAlert
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        onCancel={() => setTaskItem(null)}
        def={taskItem}
        item={value}
      />
    </View>
  );
};

export { Tasks };
