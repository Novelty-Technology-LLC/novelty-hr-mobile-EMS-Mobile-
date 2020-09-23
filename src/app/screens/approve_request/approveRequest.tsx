import React from 'react';
import { Text, View, Image } from 'react-native';
import { header as Header } from '../../common/header';
import { approveRequest as style } from '../../../assets/styles';
import { headerText } from '../../../assets/styles';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Button from '../../common/button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import State from '../../components/leave_screen/state';

const ApproveRequest = ({ route }) => {
  const { date, id, sender, state, type } = route.params;

  return (
    <>
      <Header>
        <Text style={headerText}>{sender},</Text>
        <Text style={style.headerDate}>{date}</Text>
      </Header>
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
            <View>
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
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </Text>
            </View>
            <View style={style.spacer} />
            <View>
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
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </Text>
            </View>
          </ScrollView>
        </View>
        <View style={style.buttonView}>
          <TouchableOpacity>
            <Button title="Approve" style={style.buttonApprove} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Button title="Deny" style={style.buttonDeny} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export { ApproveRequest };
