import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import {
  cardStyle,
  headerTxtStyle,
  listingStyle,
} from "../../../assets/styles";
import { shoutoutDetailStyles as sds } from "../../../assets/styles/common/shoutoutDetail.style";
import { header as Header, showToast } from "../../common";
import { formatFullName } from "../../utils/constants";
import { getFormatedDate, getShortDate } from "../../utils/dateMapper";
import ShoutoutSVG from "../../../assets/images/shoutout.svg";
import { getShoutoutByID } from "../../services";
import { DetailPlaceHolder } from "../../components/loader/detailPlaceHolder";

const ShoutoutDetails = (props: any) => {
  const [shoutoutDetail, setShoutoutDetail] = useState(
    props?.route?.params.detail
  );
  const receiverData: any = shoutoutDetail?.receiver;
  const senderData: any = shoutoutDetail?.shoutout_from;

  const getShoutoutDetail = () => {
    const shoutoutID = props?.route?.params.id;
    if (shoutoutID && !shoutoutDetail) {
      getShoutoutByID(shoutoutID)
        .then((detail) => {
          setShoutoutDetail(detail);
        })
        .catch(() => {
          showToast("An error occured. ❌", false);
        });
    }
  };
  useEffect(() => {
    getShoutoutDetail();
  }, []);

  return (
    <View style={listingStyle.mainContainer}>
      <Header icon={true}>
        <Text style={headerTxtStyle.headerText}>Shoutout </Text>
      </Header>
      {!shoutoutDetail ? (
        <DetailPlaceHolder />
      ) : (
        <>
          <View style={sds.container}>
            <View style={sds.headerContainer}>
              <ShoutoutSVG style={sds.image} />
              <View style={sds.title}>
                <Text style={[cardStyle.subTitleText, sds.name]}>
                  {receiverData.map((item: any, index: any) => {
                    const plus =
                      receiverData.length - 1 === index ? " " : " , ";

                    return (
                      formatFullName(item.first_name, item.last_name) + plus
                    );
                  })}
                </Text>
                <Text style={[cardStyle.subTitleText]}>
                  {"received shoutout from" + " "}
                </Text>
                <Text style={[cardStyle.subTitleText]}>
                  {senderData.map((item: any) => {
                    return formatFullName(item.first_name, item.last_name);
                  })}
                </Text>
              </View>
            </View>
            <Text style={sds.shoutout}>{shoutoutDetail.shoutout}</Text>
            <Text style={sds.date}>{getFormatedDate(shoutoutDetail.date)}</Text>
          </View>
        </>
      )}
    </View>
  );
};
export { ShoutoutDetails };
