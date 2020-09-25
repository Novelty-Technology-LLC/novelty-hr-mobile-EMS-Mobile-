import React from 'react';
import { View, Text } from 'react-native';
import colors from '../../../assets/colors';
import { requestStyle as style } from '../../../assets/styles';
import AppIcon from '../../common/icon';
const State = ({ state, children }: { state: string }) => {
  return (
    <View style={style.row}>
      {state === 'Approved' && (
        <>
          <AppIcon name="check-circle" size={16} color={colors.green} />
          <View style={style.space}></View>
          <Text style={style.state}>{state}</Text>
        </>
      )}
      {state === 'Denied' && (
        <>
          <AppIcon name="alert-circle" size={16} color={colors.tomato} />
          <View style={style.space}></View>
          <Text style={style.state}>{state}</Text>
        </>
      )}
      {state === 'Pending' && (
        <>
          <View style={style.main}>
            <View style={style.wrapper}>
              <View style={style.progress}>
                <AppIcon name="timer-sand" size={10} color={colors.white} />
              </View>
              <View style={style.space}></View>
              <Text style={style.state}>{state}</Text>
            </View>
          </View>
        </>
      )}
      {state === 'Requested' && (
        <>
          <View style={style.main}>
            <View style={style.wrapper}>
              <View style={style.requested}>
                <AppIcon name="send" size={10} color={colors.white} />
              </View>
              <View style={style.space}></View>
              <Text style={style.state}>{state}</Text>
            </View>
            <Text style={style.text}>on {children} </Text>
          </View>
        </>
      )}
    </View>
  );
};

export default State;
