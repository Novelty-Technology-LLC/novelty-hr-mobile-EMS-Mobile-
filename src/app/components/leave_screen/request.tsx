import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { requestStyle as style } from '../../../assets/styles';
import RequestWithImage from './requestWithImage';
import State from './state';
import { ApproveDeny } from './approveDeny';

interface requestPropType {
  item: any;
  other?: boolean;
  recieved?: boolean;
  onPress?: Function;
}

const Request = ({ item, other, recieved, onPress }: requestPropType) => {
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
            <State state={item.state} />
          </View>
        </TouchableOpacity>
      ) : (
        <View style={style.container}>
          <RequestWithImage item={item} onPress={onPress} />
          {recieved ? (
            <View style={style.subcontainer}>
              <Text style={style.days}>
                {+new Date().toString().slice(8, 10) -
                  +item.leave_date.startDate.slice(8, 10) +
                  ' '}
                days ago
              </Text>
              <View style={style.buttonContainer}>
                <View style={style.buttonView}>
                  <ApproveDeny
                    title="Approve"
                    style={style.buttonApprove}
                    item={item}
                  />
                </View>
                <View style={style.buttonSpacer}></View>
                <View style={style.buttonView}>
                  <ApproveDeny
                    title="Deny"
                    style={style.buttonDeny}
                    item={item}
                  />
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
