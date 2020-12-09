import React from 'react';
import { View, Text, Platform } from 'react-native';
import colors from '../../../assets/colors';
import { requestStyle as style } from '../../../assets/styles';
import { AppIcon } from '../../common';

const State = ({ state, children }: { state: string; children?: any }) => {
  return (
    <View style={style.row}>
      {state === 'Approved' && (
        <>
          <AppIcon name="check-circle" size={16} color={colors.green} />
          <View style={style.space}></View>
          <Text style={style.state}>{state}</Text>
        </>
      )}
      {state === 'Cancelled' && (
        <>
          <AppIcon name="close-circle" size={16} color={colors.tomato} />
          <View style={style.space}></View>
          <Text style={style.state}>{state}</Text>
        </>
      )}
      {state === 'Denied' && (
        <>
          <AppIcon name="alert-circle" size={18} color={colors.tomato} />
          <View style={style.space}></View>
          <Text style={style.denyStat}>{state}</Text>
        </>
      )}
      {state === 'Pending' && (
        <>
          <View style={style.main}>
            <View style={style.wrapper}>
              <View style={style.progress}>
                <AppIcon
                  name="timer-sand"
                  size={Platform.OS === 'ios' ? 10 : 12}
                  color={colors.white}
                />
              </View>
              <View style={style.space}></View>
              <Text style={style.state}>{state}</Text>
            </View>
          </View>
        </>
      )}
      {state === 'In Progress' && (
        <>
          <View style={style.main}>
            <View style={style.wrapper}>
              <View style={style.progress}>
                <AppIcon
                  name="progress-clock"
                  size={Platform.OS === 'ios' ? 10 : 12}
                  color={colors.white}
                />
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
              <View>
                <AppIcon
                  style={style.icon}
                  name="send-circle"
                  size={Platform.OS === 'ios' ? 20 : 20}
                  color={colors.requested}
                />
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
