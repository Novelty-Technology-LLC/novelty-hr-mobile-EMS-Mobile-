import React, { Fragment, useContext, useEffect, useState } from "react";
import { Text, View, Image, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import State from "../leave_screen/state";
import { getResponses } from "../../services";
import getDay, { responseDay, startDate } from "../../utils/getDay";
import getName, { leadname } from "../../utils/getName";
import { AuthContext } from "../../reducer";
import { ApproveDeny } from "../../components";
import { ResponsePlaceHolder } from "../loader/responsePlaceHolder";
import { getUser } from "../../utils";
import { SmallHeader } from "../../common";
import normalize from "react-native-normalize";
import Autolink from "react-native-autolink";
import { getLeaveOption } from "../../utils/getLeaveType";

let leave_quota: any = {
  total_pto: 0,
  total_float: 0,
  used_pto: 0,
  used_float: 0,
};

const Request = ({ data, style, title = null }: any) => {
  const { state } = useContext(AuthContext);
  const { dayRange } = getDay(data);
  const { name } = getName(data);
  const [responses, setresponses] = useState([]);
  const [approved, setapproved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setuser] = useState(null);

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

      getRequest(JSON.parse(user).id);
    });

    checkReplied();
  }, []);

  const getRequest = async (user_id) => {
    try {
      const res = await getResponses(data.id, data.device_tokens[0].user_id);

      setresponses(res);

      const pto_leaves = res[0]?.leaveQuota?.find(
        (item) => item.leave_type === "PAID TIME OFF"
      );
      const float_leaves = res[0]?.leaveQuota?.find(
        (item) => item.leave_type === "FLOATING DAY"
      );
      leave_quota = {
        total_pto: pto_leaves?.leave_total,
        total_float: float_leaves?.leave_total,
        used_pto: pto_leaves?.leave_used,
        used_float: float_leaves?.leave_used,
      };
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const leave_option = getLeaveOption(data?.leave_option);

  return (
    <>
      {data && (
        <View style={style.container}>
          <View style={style.requestView}>
            <View style={style.imageView}>
              <Image
                style={style.image}
                source={
                  data?.user?.image_url
                    ? { uri: data?.user?.image_url }
                    : require("../../../assets/images/person.jpeg")
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
                  <Text style={style.leaveType}>
                    <Text>{data?.type}</Text>
                    {leave_option !== "FULL DAY" && (
                      <Text
                        style={style.leaveType}
                      >{` (${leave_option})`}</Text>
                    )}
                  </Text>
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
            {responses?.length ? (
              <View style={style.cardFooterContainer}>
                <View style={style.cardFooter}>
                  <Text style={style.remainingLeave}>Remaining :</Text>
                  <Text>
                    <Text style={style.totalDays}>
                      {leave_quota.used_pto + "/" + leave_quota.total_pto}
                    </Text>
                    <Text style={style.leaveTypes}>{" PTO"}</Text>
                  </Text>
                  <Text>
                    <Text style={style.totalDays}>
                      {leave_quota.used_float + "/" + leave_quota.total_float}
                    </Text>
                    <Text style={style.leaveTypes}>{" Floating "}</Text>
                  </Text>
                </View>
              </View>
            ) : null}
          </View>
          <View style={style.responseView}>
            {loading && <ResponsePlaceHolder />}
            <ScrollView showsVerticalScrollIndicator={false}>
              {responses?.length > 0 &&
                JSON.parse(data.lead).length !==
                  responses[0].pendingResponses.length && (
                  <>
                    <SmallHeader text="Responses" />
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
                            <SmallHeader text="Pending Responses" />
                            {responses[0].pendingResponses.map((item, i) => (
                              <Fragment key={i}>
                                <View style={style.main} key={i.toString()}>
                                  <View style={style.imageView}>
                                    <Image
                                      style={style.image}
                                      source={
                                        item.image_url
                                          ? { uri: item.image_url }
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
          {title === "admin" && !approved && user !== data.user.uuid && (
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
