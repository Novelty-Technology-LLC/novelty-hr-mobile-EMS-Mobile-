import React, { useContext } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { headerText } from '../../assets/styles';
import { profileStyle as style } from '../../assets/styles/tabs';
import { tabHeader as Header } from '../common';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../../assets/colors';
import { AuthContext } from '../reducer';

const Profile = () => {
  const { state } = useContext(AuthContext);

  const uploadImage = () => {
    console.log('pressed');
  };

  return (
    <View style={style.container}>
      <ScrollView
        contentContainerStyle={style.container}
        showsVerticalScrollIndicator={false}
      >
        <Header>
          <Text style={headerText}>Profile</Text>
        </Header>
        <View style={style.imageView}>
          <Image
            style={style.image}
            source={{
              uri: state.user.image_url,
            }}
          />

          <TouchableOpacity onPress={uploadImage}>
            <View style={style.label}>
              <Icon name="upload" color="white" size={20}></Icon>
              <Text style={style.labelText}>Upload pic</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={style.infoView}>
          <View style={style.body}>
            <Text style={style.heading}>Personal Info</Text>
            <View style={style.icon}>
              <Icon name="account-circle" color={colors.primary} size={30} />
              <Text style={style.text}>
                {state.user.first_name + ' ' + state.user.last_name}
              </Text>
            </View>
            <View style={style.icon}>
              <Icon name="account-circle" color={colors.primary} size={30} />
              <Text style={style.text}>{state.user.gender}</Text>
            </View>
            <View style={style.icon}>
              <Icon name="cake-variant" color={colors.primary} size={30} />
              <Text style={style.date}>Nov 10, 2020</Text>
            </View>
          </View>
        </View>
        <View style={style.infoView}>
          <View style={style.body}>
            <Text style={style.heading}>Contact Info</Text>
            <View style={style.icon}>
              <Icon name="email-newsletter" color={colors.primary} size={30} />
              <Text style={style.text}>{state.user.email}</Text>
            </View>
            <View style={style.icon}>
              <Icon name="cellphone-basic" color={colors.primary} size={30} />
              <Text style={style.text}>{state.user.phone}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export { Profile };
