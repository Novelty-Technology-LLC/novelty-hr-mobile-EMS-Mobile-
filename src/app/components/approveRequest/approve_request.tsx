import React, { useEffect, useState } from 'react';
import { Text, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import State from '../leave_screen/state';
import { getResponses } from '../../services';
import getDay, { responseDay } from './getDay';
import getName, { leadname } from './getName';
import { getUser } from '../../utils';

const Request = ({ data, style, setapproved }: any) => {
  const { startDate } = getDay(data);
  const { name } = getName(data);
  const [responses, setresponses] = useState([]);
  useEffect(() => {
    const getRequest = async () => {
      const res = await getResponses(data.id);
      const id = JSON.parse(await getUser()).uuid;
      setapproved(
        res
          .map((item) => {
            return {
              leave_id: item.leave_id,
              userId: item.user.uuid,
            };
          })
          .filter((item) => item.userId === id)
      );
      setresponses(res);
    };
    getRequest();
  }, []);

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
              {responses.length > 0 &&
                responses.map((item) => (
                  <>
                    <View style={style.main}>
                      <View style={style.imageView}>
                        <Image
                          style={style.image}
                          source={
                            item.user.image_url
                              ? { uri: item.user.image_url }
                              : require('../../../assets/images/person.jpeg')
                          }
                        />
                        <View style={style.senderView}>
                          <View style={style.teamWrapper}>
                            <Text style={style.sender}>{leadname(item)}</Text>
                            <State state={item.action} />
                          </View>
                          <View style={style.teamLeadView}>
                            <Text style={style.teamLead}>Team Lead</Text>
                            <Text style={style.text}>
                              on {responseDay(item)}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <Text style={style.leadText}>{item.note}</Text>
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
