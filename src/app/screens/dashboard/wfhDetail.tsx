import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Text, View, Image, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { approveRequest as style } from "../../../assets/styles";
import {
  checkWFHRequest,
  getQuota,
  getWFHResponses,
  updateWFHRequests,
} from "../../services";
import { header as Header } from "../../common";
import getDay, { responseDay, startDate } from "../../utils/getDay";
import getName, { leadname } from "../../utils/getName";
import { AuthContext } from "../../reducer";
import { ApproveDeny } from "../../components";
import { getUser } from "../../utils";
import { showToast, SmallHeader } from "../../common";
import Autolink from "react-native-autolink";
import CustomImage from "../../common/image";
import { goBack } from "../../utils/navigation";
import State from "../../components/leave_screen/state";
import WfhAlert from "../../components/leave_screen/alert/wfhAlert";
import { ResponsePlaceHolder } from "../../components/loader/responsePlaceHolder";
import colors from "../../../assets/colors";
import { headerTxtStyle } from "../../../assets/styles";

let home_quota: any = {
  total: 0,
  remaining: 0,
};

const WfhDetail = ({ route, screenName = "" }: any) => {
  const data = route.params?.data;
  const [responses, setresponses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getRequest();
  }, []);

  const getRequest = async () => {
    try {
      const res: any = await getWFHResponses(data.id, data.user_id);

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
                  <Text style={style.leaveType}>{data?.date}</Text>
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
              <Text style={{ marginBottom: 5 }}>{data?.note || ""}</Text>
            </>
            <WfhAlert responses={home_quota} />
          </View>
          <View style={style.responseView}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {responses?.length > 0 && (
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
                        {item?.note ? (
                          <Text style={style.leadText}>{item?.note}</Text>
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

export default WfhDetail;
