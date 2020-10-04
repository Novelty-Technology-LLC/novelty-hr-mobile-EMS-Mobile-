import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { requestStyle as style } from '../../../assets/styles';
import RequestWithImage from './requestWithImage';
import State from './state';

import getDay from '../approveRequest/getDay';
import { ApproveDeny } from './approveDeny';

interface requestPropType {
  item: any;
  other?: boolean;
  recieved?: boolean;
  onPress?: Function;
}

const Request = ({ item, other, recieved, onPress }: requestPropType) => {
  let { day } = getDay(item);
  return (
    <>
      {!other ? (
        <TouchableOpacity
          style={style.container}
          onPress={() => onPress && !other && onPress()}
        >
          <View style={style.dateView}>
            <View>
              <Text style={style.date}>{item.date}</Text>
              <Text style={style.type}>{item.type}</Text>
            </View>
            <View style={style.status}>
              <State state={item.state} />
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <View style={style.container}>
          <RequestWithImage item={item} onPress={onPress} />
          {recieved ? (
            <View style={style.subcontainer}>
              <Text style={style.days}>
                {day > 1 ? day + ' days ago' : (day = 1 + ' day ago')}
              </Text>
              <View style={style.buttonContainer}>
                <View style={style.buttonView}>
                  <ApproveDeny title="Approve" style={style} item={item} />
                </View>
                <View style={style.buttonSpacer}></View>
                <View style={style.buttonView}>
                  <ApproveDeny title="Deny" style={style} item={item} />
                </View>
              </View>
            </View>
          ) : (
            <State state={item.state} />
          )}
        </View>
      )}
    </>
  );
};

export { Request };
