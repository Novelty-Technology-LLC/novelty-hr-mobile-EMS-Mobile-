import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { teamStyle as style } from '../../../assets/styles';
import json from '../../../../fake.json';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../../assets/colors';

const Teams = ({ handleChange }) => {
  const [state, setstate] = useState('');
  return (
    <View style={style.container}>
      <Text style={style.text}>Team Lead</Text>
      <ScrollView
        style={style.scrollView}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <View style={style.wrapper}>
          {json.map((val, i) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  handleChange('lead')(val.name), setstate(val.name);
                }}
              >
                <View style={style.main} key={i}>
                  <Image
                    style={style.image}
                    source={require('../../../assets/images/person.jpeg')}
                  />
                  <View style={style.spacing}></View>
                  <View style={style.nameView}>
                    <Text style={style.name}>
                      {val.name.length > 14
                        ? val.name.substring(0, 14 - 2) + '...'
                        : val.name}
                      {state == val.name && (
                        <Icon
                          name="check-circle"
                          size={15}
                          color={colors.green}
                        ></Icon>
                      )}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export { Teams };
