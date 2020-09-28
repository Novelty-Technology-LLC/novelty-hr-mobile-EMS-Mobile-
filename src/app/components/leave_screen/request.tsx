import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { requestStyle as style } from '../../../assets/styles';
import RequestWithImage from './requestWithImage';
import State from './state';

import { button as Button } from '../../common';

interface requestPropType {
  item: object;
  other?: boolean;
  recieved?: boolean;
  onPress: Function;
}

const Request = ({ item, other, recieved, onPress }: requestPropType) => {
  return (
    <>
      {!other ? (
        <TouchableOpacity
          style={style.container}
          onPress={() => onPress && !other && onPress()}
        >
          <View>
            <Text style={style.date}>{item.date}</Text>
            <Text style={style.type}>{item.type}</Text>
          </View>
          <State state={item.state} />
        </TouchableOpacity>
      ) : (
        <View style={style.container}>
          <RequestWithImage item={item} onPress={onPress} />
          {recieved ? (
            <View style={style.subcontainer}>
              <Text style={style.days}>5 days ago</Text>
              <View style={style.buttonContainer}>
                <View style={style.buttonView}>
                  <Button
                    title="Approve"
                    style={style.buttonApprove}
                    onPress={() => console.log('approve', item)}
                  />
                </View>
                <View style={style.buttonSpacer}></View>
                <View style={style.buttonView}>
                  <Button
                    title="Deny"
                    style={style.buttonDeny}
                    onPress={() => console.log('deny', item)}
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
