import React from 'react';
import { Text, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import State from '../leave_screen/state';

const ar = [1, 2];

const Request = ({ data, style }: any) => {
  return (
    <>
      {data && (
        <View style={style.container}>
          <View style={style.requestView}>
            <View style={style.imageView}>
              <Image
                style={style.image}
                source={require('../../../assets/images/person.jpeg')}
              />

              <View style={style.senderView}>
                <Text style={style.sender}>
                  {data.user.first_name + data.user.last_name > 14
                    ? data.user.first_name +
                      ' ' +
                      data.user.last_name.substr(0, 14 - 2) +
                      '...'
                    : data.user.first_name + ' ' + data.user.last_name}
                </Text>
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
                  <State state="Requested">{data.leave_date.startDate}</State>
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
                          <Text style={style.sender}>
                            {data.user.first_name + data.user.last_name > 14
                              ? data.user.first_name +
                                '' +
                                data.user.last_name.substr(0, 14 - 2) +
                                '...'
                              : data.user.first_name +
                                ' ' +
                                data.user.last_name}
                          </Text>
                          <State state={data.status || data.state}>
                            {data.startDate}
                          </State>
                        </View>
                        <View style={style.teamLeadView}>
                          <Text style={style.teamLead}>Team Lead</Text>
                          <Text style={style.text}>
                            on {data.leave_date.startDate.substr(3, 8)}
                          </Text>
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
