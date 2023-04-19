import React, { Fragment, useEffect, useState } from "react";
import { Text, View, Image, ScrollView } from "react-native";
import { getResponses } from "../../services";
import { responseDay, startDate } from "../../utils/getDay";
import { leadname } from "../../utils/getName";
import { SmallHeader } from "../../common";
import State from "../../components/leave_screen/state";
import { ResponsePlaceHolder } from "../../components/loader/responsePlaceHolder";
import {
  headerTxtStyle,
  approveRequest as style,
} from "../../../assets/styles";
import Autolink from "react-native-autolink";
import CustomImage from "../../common/image";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { header as Header } from "../../common/header";
import colors from "../../../assets/colors";

let leave_quota: any = {
  total_pto: 0,
  total_float: 0,
  used_pto: 0,
  used_float: 0,
};

const LeaveDetail = ({
  title = null,
  screenName = "Leave",
  type,
  reloadRequest,
  route,
}: any) => {
  const data = route.params?.data;

  const [responses, setresponses] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getRequest();
  }, []);

  const getRequest = async () => {
    try {
      const res: any = await getResponses(
        route?.params?.data?.id,
        route?.params?.data?.user_id
      );

      setresponses(res);
      const pto_leaves = res[0]?.leaveQuota?.find(
        (item: any) => item.leave_type === "PAID TIME OFF"
      );
      const float_leaves = res[0]?.leaveQuota?.find(
        (item: any) => item.leave_type === "FLOATING DAY"
      );
      leave_quota = {
        total_pto: pto_leaves?.leave_total,
        total_float: float_leaves?.leave_total,
        used_pto: pto_leaves?.leave_remaining,
        used_float: float_leaves?.leave_remaining,
      };
      setLoading(false);
      return leave_quota;
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      <Header icon={true}>
        <View style={style.headContainer}>
          <View>
            <Text style={headerTxtStyle.headerText}>{data?.title}</Text>
          </View>
        </View>
      </Header>
      {!loading ? (
        <View style={style.container}>
          <View style={style.requestView}>
            <>
              <View style={style.imageView}>
                <CustomImage style={style.image} image={data?.image} />
                <View style={style.senderView}>
                  <View style={style.statusView}>
                    <Text style={style.sender}>{data?.title}</Text>
                    <View style={style.stateView}>
                      <State state={data.status} />
                    </View>
                  </View>
                  <View style={style.dateView}>
                    <Text style={style.leaveType}>{data.subTitle}</Text>
                  </View>
                </View>
              </View>
              <View style={[style.sectionView, { alignSelf: "flex-end" }]}>
                <View style={style.sectionHeader}>
                  <View style={style.sendView}>
                    <State state="Requested">
                      {startDate({ createdAt: data?.created_at })}
                    </State>
                  </View>
                </View>
              </View>
            </>
            {responses?.length ? (
              screenName === "Leave" ? (
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
              ) : (
                <View style={style.cardWFHFooter}>
                  <View style={style.cardFooter}>
                    <Text style={style.remainingLeave}>Remaining Quota :</Text>
                    {/* <Text></Text> */}
                    <Text>
                      <Text style={style.totalDays}>
                        {leave_quota.used_float + "/" + leave_quota.total_float}
                      </Text>
                      <Text style={style.leaveTypes}>{" WFH "}</Text>
                    </Text>
                  </View>
                </View>
              )
            ) : null}
          </View>
          <View style={style.responseView}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {responses?.length > 0 &&
                responses[0].pendingResponses?.length && (
                  <>
                    {responses[0]?.responses?.length !== 0 && (
                      <SmallHeader text="Responses" />
                    )}
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
              {data.status !== "Denied" && (
                <>
                  <View style={style.pendingresponseView}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                      {responses?.length > 0 &&
                        responses[0].pendingResponses.length > 0 && (
                          <>
                            <SmallHeader text="Pending Responses" />
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
        </View>
      ) : (
        <View
          style={{
            backgroundColor: colors.white,
            flex: 1,
            paddingHorizontal: 20,
          }}
        >
          <ResponsePlaceHolder />
        </View>
      )}
    </>
  );
};

export default LeaveDetail;
