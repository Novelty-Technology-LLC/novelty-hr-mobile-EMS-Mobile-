import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../../assets/colors';
import { requestStyle as style } from '../../../assets/styles';

const State = ({ state, children }: { state: string }) => {
  return (
    <View style={style.row}>
      {state === 'Approved' && (
        <>
          <View style={style.main}>
            <View style={style.wrapper}>
              <Icon name="check-circle" size={18} color={colors.green} />

              <View style={style.space}></View>
              <Text style={style.state}>{state}</Text>
            </View>
          </View>
        </>
      )}
      {state === 'Denied' && (
        <>
          <View style={style.main}>
            <View style={style.wrapper}>
              <Icon name="alert-circle" size={18} color={colors.tomato} />
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
                <Icon name="timer-sand" size={10} color={colors.white} />
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
                <Icon name="send" size={10} color={colors.white} />
              </View>
              <View style={style.space}></View>
              <Text style={style.state}>{state}</Text>
            </View>
            <View>
              <Text style={style.text}>on {children}</Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default State;
