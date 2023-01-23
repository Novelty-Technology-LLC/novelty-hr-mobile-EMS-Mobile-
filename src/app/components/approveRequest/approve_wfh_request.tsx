import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Text, View, Image, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import State from "../leave_screen/state";
import {
  checkWFHRequest,
  getQuota,
  getWFHResponses,
  updateWFHRequests,
} from "../../services";
import getDay, { responseDay, startDate } from "../../utils/getDay";
import getName, { leadname } from "../../utils/getName";
import { AuthContext } from "../../reducer";
import { ApproveDeny } from "../../components";
import { ResponsePlaceHolder } from "../loader/responsePlaceHolder";
import { getUser } from "../../utils";
import { showToast, SmallHeader } from "../../common";
import Autolink from "react-native-autolink";
import CustomImage from "../../common/image";
import WfhAlert from "../leave_screen/alert/wfhAlert";
import { goBack, navigationRef } from "../../utils/navigation";

let home_quota: any = {
  total: 0,
  remaining: 0,
};

const WfhRequestApproval = ({ data, style, title = null, type }: any) => {
  const { state } = useContext(AuthContext);
  const { dayRange } = getDay(data);
  const { name } = getName(data);
  const [responses, setresponses] = useState([]);
  const [approved, setapproved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setuser] = useState(null);
  const alertRef = useRef<any>(null);
  const actionRef = useRef<any>(null);

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
    getUser().then((user) => {
      setuser(JSON.parse(user).uuid);
      getRequest();
    });

    checkReplied();
  }, []);

  const getRequest = async () => {
    try {
      const res = await getWFHResponses(data.id, data.user.id);

      setresponses(res);
      home_quota = {
        remaining: res[0]?.homeQuota[0]?.remaining,
        total: res[0]?.homeQuota[0]?.total,
      };
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const onPressAlert = (action: string) => {
    actionRef.current?.showLoading();
    actionRef.current?.show();

    checkWFHRequest(data?.id)
      .then((res) => {
        if (res === "Pending" || res === "In Progress") {
          setTimeout(async () => {
            if (alertRef.current) {
              alertRef.current.setActionHandle(action);
              alertRef.current.setResponse(await getWfhRequest(data.user_id));
            }
          }, 500);
        }
        actionRef.current?.hideLoading();
      })
      .catch((err) => {
        actionRef.current?.hideLoading();
      });
  };

  const getWfhRequest = async (id: number) => {
    const res: any = await getQuota(id);

    return res[0];
  };

  const onPressSubmit = ({
    action,
    note,
    quotaId,
  }: {
    action: string;
    note: string;
    quotaId: string;
  }) => {
    alertRef.current?.showSubmitLoading();
    action === "Approve" && (action = "Approved");
    action === "Deny" && (action = "Denied");

    const newData: any = {
      wfh_id: data.id,
      requested_to: state.user.id,
      action,
      note,
      notification_token: data.device_tokens?.map(
        (item: any) => item.notification_token
      ),
      lead_name: state.user.first_name,
      user_name: data.user.first_name,
      quotaId,
    };

    updateWFHRequests(data.id, newData)
      .then(() => {
        actionRef.current?.hideLoading();
        actionRef.current?.hide();
        alertRef.current?.hideSubmitLoading();
        showToast("Request replied");
        goBack({ reload: true });
      })
      .catch((err) => {
        alertRef.current?.hideSubmitLoading();
        showToast("Something went wrong", false);
      });
  };
  return (
    <>
      {data && (
        <View style={style.container}>
          <View style={style.requestView}>
            <View style={style.imageView}>
              <CustomImage style={style.image} image={data?.user?.image_url} />
              <View style={style.senderView}>
                <View style={style.statusView}>
                  <Text style={style.sender}>{name}</Text>
                  <View style={style.stateView}>
                    <State state={data.state} />
                  </View>
                </View>
                <View style={style.dateView}>
                  <Text style={style.leaveType}>
                    <Text>{type}</Text>
                  </Text>
                </View>
              </View>
            </View>
            <View style={style.sectionView}>
              <View style={style.sectionHeader}>
                <View style={style.sectionDateView}>
                  <Icon style={style.calander} name='calendar' size={20} />
                  <Text style={style.sectionDate}>{dayRange}</Text>
                </View>
                <View style={style.sendView}>
                  <State state='Requested'>{startDate(data)}</State>
                </View>
              </View>
            </View>
            <View style={style.sectionBody}>
              <Autolink
                // Required: the text to parse for links
                text={data.note}
                textProps={{ style: style.note }}
                // Optional: enable email linking
                email
                // Optional: enable URL linking
                url
                // Optional: custom linking matchers
              />
              {/* <Text style={style.note}>{data.note}</Text> */}
            </View>
            {true && <WfhAlert responses={home_quota} />}
          </View>
          <View style={style.responseView}>
            {loading && <ResponsePlaceHolder />}
            <ScrollView showsVerticalScrollIndicator={false}>
              {responses?.length > 0 &&
                JSON.parse(data.lead).length !==
                  responses[0].pendingResponses.length && (
                  <>
                    <SmallHeader text='Responses' />
                    {responses[0].responses.map((item: any, i: number) => (
                      <Fragment key={i}>
                        <View style={style.main} key={i.toString()}>
                          <View style={style.imageView}>
                            <Image
                              style={style.image}
                              source={
                                item.user?.image_url
                                  ? { uri: item.user.image_url }
                                  : require("../../../assets/images/person.jpeg")
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
                          {item.note ? (
                            <Text style={style.leadText}>{item.note}</Text>
                          ) : (
                            <></>
                          )}
                        </View>
                        <View style={style.spacer} />
                      </Fragment>
                    ))}
                  </>
                )}
              {data.state !== "Denied" && (
                <>
                  <View style={style.pendingresponseView}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                      {responses?.length > 0 &&
                        responses[0].pendingResponses.length > 0 && (
                          <>
                            <SmallHeader text='Pending Responses' />
                            {responses[0].pendingResponses.map((item, i) => (
                              <Fragment key={i}>
                                <View style={style.main} key={i?.toString()}>
                                  <View style={style.imageView}>
                                    <Image
                                      style={style.image}
                                      source={
                                        item?.image_url
                                          ? { uri: item?.image_url }
                                          : require("../../../assets/images/person.jpeg")
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
                              </Fragment>
                            ))}
                          </>
                        )}
                    </ScrollView>
                  </View>
                </>
              )}
            </ScrollView>
          </View>
          {title === "admin" && !approved && user !== data?.user?.uuid && (
            <View style={style.buttonView}>
              <ApproveDeny
                ref={{ alertRef, actionRef }}
                onPressSubmit={onPressSubmit}
                title='Approve'
                screenName='WFH'
                style={style}
                item={data}
                fromStack={false}
                onPress={onPressAlert}
              />
              <ApproveDeny
                ref={{ alertRef, actionRef }}
                onPressSubmit={onPressSubmit}
                title='Deny'
                screenName='WFH'
                style={style}
                item={data}
                fromStack={false}
                onPress={onPressAlert}
              />
            </View>
          )}
        </View>
      )}
    </>
  );
};

export default WfhRequestApproval;
