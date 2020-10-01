import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { requestStyle as style } from '../../../assets/styles';
import RequestWithImage from './requestWithImage';
import State from './state';
import { button as Button } from '../../common';
import getDay from '../approveRequest/getDay';
import colors from '../../../assets/colors';

interface requestPropType {
  item: any;
  other?: boolean;
  recieved?: boolean;
  onPress?: Function;
}

const Request = ({ item, other, recieved, onPress }: requestPropType) => {
  let { day } = getDay(item);
  const [isLoading, setisLoading] = useState(false);
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
                <Button onPress={() => console.log('approve', item)}>
                  <View style={style.buttonApprove}>
                    <Text style={style.approve}>Approve</Text>
                    {isLoading && (
                      <ActivityIndicator size={'small'} color={colors.white} />
                    )}
                  </View>
                </Button>
                <View style={style.buttonSpacer}></View>
                <Button onPress={() => console.log('deny', item)}>
                  <View style={style.buttonDeny}>
                    <Text style={style.deny}>Deny</Text>
                    {isLoading && (
                      <ActivityIndicator
                        size={'small'}
                        color={colors.primary}
                      />
                    )}
                  </View>
                </Button>
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
