import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import {
  calenderStyle,
  descriptionStyle as style,
} from '../../../assets/styles';

import { WheelPicker } from 'react-native-wheel-picker-android';
import { getHrsMins } from '../../utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const mindata = ['0 min', '15 mins', '30 mins', '45 mins'];
const hrdata = [
  '0 hr',
  '1 hr',
  '2 hrs',
  '3 hrs',
  '4 hrs',
  '5 hrs',
  '6 hrs',
  '7 hrs',
  '8 hrs',
];

const Time = ({
  handleChange,
  error,
  touched,
  defaultValue,
  edit,
}: {
  handleChange: Function;
  error?: any;
  touched?: any;
  defaultValue?: string;
  edit?: boolean;
}) => {
  const [hrIndex, setHrIndex] = useState(1);
  const [minIndex, setMinIndex] = useState(0);

  useEffect(() => {
    if (defaultValue) {
      const time = getHrsMins(defaultValue);
      setHrIndex(time.hr);
      setMinIndex(time.mins / 15);
    } else {
      error ? handleChange('duration')('60') : handleChange('60');
    }
  }, []);

  return (
    <>
      <View
        style={[
          edit ? style.modalPickerContainer : style.pickerContainer,
          calenderStyle.container,
        ]}
      >
        <Text style={style.text}>Duration</Text>
        <View style={style.row}>
          <WheelPicker
            selectedItem={hrIndex}
            style={style.iospicker}
            onItemSelected={(index) => {
              setHrIndex(index);
              const intdata = parseInt(hrdata[index].split(' ')[0]);
              const mins = parseInt(mindata[minIndex].split(' ')[0]);
              error
                ? handleChange('duration')((intdata * 60 + mins).toString())
                : handleChange((intdata * 60 + mins).toString());
            }}
            data={hrdata}
            selectedItemTextSize={24}
            indicatorColor="#f2f2f2"
            backgroundColor="#f2f2f2"
          />
          <View style={style.timeSeparator}>
            <Icon name="swap-vertical" size={20} />
          </View>
          <WheelPicker
            selectedItem={minIndex}
            style={style.iospicker}
            onItemSelected={(index) => {
              setMinIndex(index);
              const intdata = parseInt(mindata[index].split(' ')[0]);
              const hrs = parseInt(hrdata[hrIndex].split(' ')[0]);
              error
                ? handleChange('duration')((hrs * 60 + intdata).toString())
                : handleChange((hrs * 60 + intdata).toString());
            }}
            data={mindata}
            selectedItemTextSize={24}
            indicatorColor="#f2f2f2"
            backgroundColor="#f2f2f2"
          />
        </View>
      </View>
      {error && error.duration && (
        <Text style={[style.error, style.time]}>{error.duration}</Text>
      )}
    </>
  );
};

export default Time;
