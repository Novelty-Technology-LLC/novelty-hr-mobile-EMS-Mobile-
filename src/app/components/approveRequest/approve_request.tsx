import React from 'react';
import { Text, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import State from '../leave_screen/state';
import getDay from './getDay';
import getName from './getName';

const ar = [1, 2];

const Request = ({ data, style }: any) => {
  const { startDate } = getDay(data);
  const { name } = getName(data);
  return (
    <>
      {data && (
        <View style={style.container}>
          <View style={style.requestView}>
            <View style={style.imageView}>
              <Image
                style={style.image}
                source={
                  data.user.image_url
                    ? { uri: data.user.image_url }
                    : require('../../../assets/images/person.jpeg')
                }
              />
              <View style={style.senderView}>
                <Text style={style.sender}>{name}</Text>
                <View style={style.dateView}>
                  <Text style={style.leaveType}>{data.type}</Text>
                </View>
              </View>
            </View>
            <View style={style.sectionView}>
              <View style={style.sectionHeader}>
                <View style={style.sectionDateView}>
                  <Icon style={style.calander} name="calendar" size={20} />
                  <Text style={style.sectionDate}>
                    {data.leave_date.startDate}
                  </Text>
                </View>
                <View style={style.sendView}>
                  <State state="Requested">{startDate}</State>
                </View>
              </View>
            </View>
            <View style={style.sectionBody}>
              <Text style={style.note}>{data.note}</Text>
            </View>
          </View>
          <View style={style.responseView}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={style.response}>Responses</Text>
              {ar.map(() => (
                <>
                  <View style={style.main}>
                    <View style={style.imageView}>
                      <Image
                        style={style.image}
                        source={require('../../../assets/images/person.jpeg')}
                      />
                      <View style={style.senderView}>
                        <View style={style.teamWrapper}>
                          <Text style={style.sender}>{name}</Text>
                          <State state={data.status || data.state}>
                            {data.startDate}
                          </State>
                        </View>
                        <View style={style.teamLeadView}>
                          <Text style={style.teamLead}>Team Lead</Text>
                          <Text style={style.text}>on {startDate}</Text>
                        </View>
                      </View>
                    </View>
                    <Text style={style.leadText}>{data.note}</Text>
                  </View>
                  <View style={style.spacer} />
                </>
              ))}
            </ScrollView>
          </View>
        </View>
      )}
    </>
  );
};

export default Request;
