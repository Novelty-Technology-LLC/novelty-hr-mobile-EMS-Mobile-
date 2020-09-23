import React from 'react';
import { Text, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import State from '../leave_screen/state';

const ar = [1, 2];

const Request = ({ data, style }) => {
  const { date, id, sender, state, type } = data;

  return (
    <>
      <View style={style.container}>
        <View style={style.requestView}>
          <View style={style.imageView}>
            <Image
              style={style.image}
              source={require('../../../assets/images/person.jpeg')}
            />
            <View style={style.senderView}>
              <Text style={style.sender}>{sender}</Text>
              <View style={style.dateView}>
                <Text style={style.leaveType}>Paid time off</Text>
                <Text style={style.date}>Requested on {date}</Text>
              </View>
            </View>
          </View>
          <View style={style.sectionView}>
            <View style={style.sectionHeader}>
              <View style={style.sectionDateView}>
                <Icon style={style.calander} name="calendar" size={20} />
                <Text style={style.sectionDate}>{date}</Text>
              </View>
              <View>
                <State state={state}></State>
              </View>
            </View>
          </View>
          <View style={style.sectionBody}>
            <Text style={style.note}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </Text>
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
                      <Text style={style.sender}>{sender}</Text>
                      <View style={style.teamLeadView}>
                        <Text style={style.teamLead}>Team Lead</Text>
                        <State state={state}></State>
                      </View>
                    </View>
                  </View>
                  <Text style={style.leadText}>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </Text>
                </View>
                <View style={style.spacer} />
              </>
            ))}
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default Request;
