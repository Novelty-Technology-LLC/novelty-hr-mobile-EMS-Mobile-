import React, { useContext, useEffect, useState } from 'react';
import { Text, View, Image, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import State from '../leave_screen/state';
import { getResponses } from '../../services';
import getDay from '../../utils/getDay';
import getName from '../../utils/getName';
import { AuthContext } from '../../reducer';
import { ApproveDeny } from '../../components';
import { ResponsePlaceHolder } from '../loader/responsePlaceHolder';
import Response from './response';

const Request = ({ data, style, title = null }: any) => {
  const { state } = useContext(AuthContext);
  const { startDate } = getDay(data);
  const { name } = getName(data);
  const [responses, setresponses] = useState([]);
  const [approved, setapproved] = useState(false);
  const [loading, setLoading] = useState(false);

  const checkReplied = () => {
    data.leave_approvals &&
      data.leave_approvals.map((item) => {
        if (item.requested_to === state.user.id) {
          setapproved(true);
        }
      });
  };

  useEffect(() => {
    setLoading(true);
    const getRequest = async () => {
      const res = await getResponses(data.id);
      setresponses(res);
      setLoading(false);
    };
    getRequest();
    checkReplied();
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
              {loading && <ResponsePlaceHolder />}
              <FlatList
                data={responses}
                keyExtractor={(item) => item.index}
                renderItem={(item) => (
                  <Response responses={item.item} style={style} data={data} />
                )}
              />
            </ScrollView>
          </View>
          {title === 'admin' && !approved && (
            <View style={style.buttonView}>
              <ApproveDeny title="Approve" style={style} item={data} />
              <ApproveDeny title="Deny" style={style} item={data} />
            </View>
          )}
        </View>
      )}
    </>
  );
};

export default Request;
