import React from 'react';
import {View, Text} from 'react-native';
import AnimateNumber from 'react-native-countup';
import {daysRemainingStyle as style} from '../../../assets/styles/';

interface DaysRemainingPropType {
  remaining: number;
  title: String;
  timelog?: boolean;
  total?: number;
  isLeave?: boolean;
}

const DaysRemaining = ({
  isLeave = false,
  total,
  remaining,
  title,
  timelog,
}: DaysRemainingPropType) => {
  return (
    <View style={timelog ? style.logcontainer : style.container}>
      <Text style={style.text}>
        <Text style={style.remaining}>
          <AnimateNumber
            value={remaining}
            initial={-1}
            interval={0}
            countBy={1}
            timing="linear"
            formatter={val => {
              return !timelog || Number.isInteger(val)
                ? val
                : parseFloat(val).toFixed(1);
            }}
          />
        </Text>
        {isLeave && (
          <>
            <Text style={style.total}> / </Text>
            <Text style={style.total}>{total}</Text>
          </>
        )}
      </Text>
      {timelog && <Text style={style.title}>Hours</Text>}
      {isLeave && (
        <Text style={timelog ? style.footer : style.title}>
          {title.toUpperCase()}
        </Text>
      )}
      {!timelog &&
        (isLeave ? (
          <Text style={style.footer}>REMAINING</Text>
        ) : (
          <Text style={[style.footer, {textTransform: 'none'}]}>Total WFH</Text>
        ))}
    </View>
  );
};

export {DaysRemaining};
