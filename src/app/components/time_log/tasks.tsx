import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {
  descriptionStyle,
  leaveType,
  timeLogStyle,
} from '../../../assets/styles';
import { Task } from './task';
import Swipe from '../leave_screen/swipe';
import { getHrs, momentdate, totalHours } from '../../utils';
import TaskContext from './taskContext';
import { navigate } from '../../utils/navigation';

const Tasks = ({ value, handleChange, note }: any) => {
  const [loading, setLoading] = useState(false);
  const { tasks } = useContext(TaskContext);
  let notes = [];
  if (note) {
    notes = [...note];
  } else {
    notes = [...tasks];
  }
  let row: Array<any> = [];

  return (
    <View style={descriptionStyle.main}>
      <View style={timeLogStyle.rowAlign}>
        <Text style={descriptionStyle.text}>Tasks </Text>
        {note && (
          <Text style={[leaveType.text, { marginBottom: 0 }]}>
            {momentdate(value.log_date, 'll')}
          </Text>
        )}
      </View>
      {notes[0] &&
        notes.map((item, index) => (
          <Swipeable
            key={item.id}
            ref={(ref) => (row[index] = ref)}
            renderRightActions={() => (
              <Swipe
                edittimelog={true}
                item={item}
                value={value}
                // handleChange={handleChange}
                onPress={() => row[index].close()}
                setLoading={setLoading}
              />
            )}
          >
            <TouchableOpacity
              onPress={() => {
                value.item = item;
                navigate('logtime', value);
              }}
              disabled={loading}
            >
              <Task item={item} />
            </TouchableOpacity>
          </Swipeable>
        ))}

      <View style={[timeLogStyle.dateView, { marginBottom: 20 }]}>
        <View style={[timeLogStyle.total, timeLogStyle.gap]}>
          <Text style={timeLogStyle.date}>Total</Text>
          <Text style={timeLogStyle.duration}>
            {getHrs(totalHours(note ? { note: notes } : { note: tasks }))}
          </Text>
        </View>
      </View>
    </View>
  );
};

export { Tasks };
