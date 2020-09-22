import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { requestStyle as style } from '../../../assets/styles';
import Button from '../../common/button';
import RequestWithImage from './requestWithImage';
import State from './state';

const Request = ({ item, other, recieved, onPress }: any) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={style.container} onPress={() => onPress()}>
      {other ? (
        <RequestWithImage item={item} />
      ) : (
        <View>
          <Text style={style.date}>{item.date}</Text>
          <Text style={style.type}>{item.type}</Text>
        </View>
      )}

      {recieved ? (
        <View style={style.subcontainer}>
          <Text style={style.days}>5 days ago</Text>
          <View style={style.buttonContainer}>
            <View style={style.buttonViewApprove}>
              <Button title="Approve" style={style.buttonApprove} />
            </View>
            <View style={style.buttonViewDeny}>
              <Button title="Deny" style={style.buttonDeny} />
            </View>
          </View>
        </View>
      ) : (
        <State state={item.state} />
      )}
    </TouchableOpacity>
  );
};

export { Request };
