import React, { useContext, useEffect, useState } from 'react';
import { Text, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import State from '../leave_screen/state';
import { getResponses } from '../../services';
import getDay, { responseDay, startDate } from '../../utils/getDay';
import getName, { leadname } from '../../utils/getName';
import { AuthContext } from '../../reducer';
import { ApproveDeny } from '../../components';
import { ResponsePlaceHolder } from '../loader/responsePlaceHolder';

const Request = ({ data, style, title = null }: any) => {
  const { state } = useContext(AuthContext);
  const { dayRange } = getDay(data);
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
      console.log('adata.id -> ', data.id);

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
                <View style={style.statusView}>
                  <Text style={style.sender}>{name}</Text>
                  <View style={style.stateView}>
                    <State state={data.state} />
                  </View>
                </View>
                <View style={style.dateView}>
                  <Text style={style.leaveType}>{data.type}</Text>
                </View>
              </View>
            </View>
            <View style={style.sectionView}>
              <View style={style.sectionHeader}>
                <View style={style.sectionDateView}>
                  <Icon style={style.calander} name="calendar" size={20} />
                  <Text style={style.sectionDate}>{dayRange}</Text>
                </View>
                <View style={style.sendView}>
                  <State state="Requested">{startDate(data)}</State>
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
              {responses.length > 0 &&
                JSON.parse(data.lead).length !==
                  responses[0].pendingResponses.length && (
                  <>
                    <Text style={style.response}>Responses</Text>
                    {responses[0].responses.map((item, i) => (
                      <>
                        <View style={style.main} key={i.toString()}>
                          <View style={style.imageView}>
                            <Image
                              style={style.image}
                              source={
                                item.user.image_url !== undefined
                                  ? { uri: item.user.image_url }
                                  : require('../../../assets/images/person.jpeg')
                              }
                            />
                            <View style={style.senderView}>
                              <View style={style.teamWrapper}>
                                <Text style={style.sender}>
                                  {leadname(item.user)}
                                </Text>
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
                  </>
                )}
              {data.state !== 'Denied' && (
                <>
                  <View style={style.pendingresponseView}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                      {responses.length > 0 &&
                        responses[0].pendingResponses.length > 0 && (
                          <>
                            <Text style={style.response}>
                              Pending Responses
                            </Text>
                            {responses[0].pendingResponses.map((item, i) => (
                              <>
                                <View style={style.main} key={i.toString()}>
                                  <View style={style.imageView}>
                                    <Image
                                      style={style.image}
                                      source={
                                        item.image_url
                                          ? { uri: item.image_url }
                                          : require('../../../assets/images/person.jpeg')
                                      }
                                    />
                                    <View style={style.senderView}>
                                      <View style={style.teamWrapper}>
                                        <Text style={style.sender}>
                                          {leadname(item)}
                                        </Text>
                                        <State state={item.action} />
                                      </View>
                                      <View style={style.teamLeadView}>
                                        <Text style={style.teamLead}>
                                          Team Lead
                                        </Text>
                                      </View>
                                    </View>
                                  </View>
                                </View>
                                <View style={style.spacer} />
                              </>
                            ))}
                          </>
                        )}
                    </ScrollView>
                  </View>
                </>
              )}
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
