import React from 'react';
import { View, Text } from 'react-native';
import { daysRemainingStyle as style } from '../../../assets/styles/';
import AnimateNumber from 'react-native-countup';

interface DaysRemainingPropType {
  total: number;
  remaining: number;
  title: String;
  timelog?: boolean;
}

const DaysRemaining = ({
  total,
  remaining,
  title,
  timelog,
}: DaysRemainingPropType) => {
  return (
    <View style={style.container}>
      <Text style={style.text}>
        <Text style={style.remaining}>
          <AnimateNumber
            value={remaining}
            initial={-1}
            interval={120}
            countBy={1}
            timing="linear"
          />
          {/* {remaining} */}
        </Text>
        <Text style={style.total}>/</Text>
        <View style={style.gap}></View>
        <Text style={style.total}>{total}</Text>
      </Text>
      <Text style={style.title}>{title}</Text>
      {!timelog && <Text style={style.footer}>REMAINING</Text>}
    </View>
  );
};

export { DaysRemaining };
