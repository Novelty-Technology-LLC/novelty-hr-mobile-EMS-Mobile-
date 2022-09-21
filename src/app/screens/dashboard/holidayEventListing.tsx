import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import normalize from "react-native-normalize";
import colors from "../../../assets/colors";
import {
  cardStyle,
  headerTxtStyle,
  listingStyle,
  timeLogStyle,
} from "../../../assets/styles";
import { header as Header } from "../../common";
import { ListPlaceholder } from "../../components/loader/listPlaceHolder";
import { getList } from "../../services";
import { getColor, transformList } from "../../utils/listtranform";

const HolidayEventListing = (props: any) => {
  const [list, setList] = useState<any>(null);
  const [loading, setLoading] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    const getData = async (route: string) => {
      const data = await getList(route);

      setLoading(false);
      setList(data);
    };
    getData(props?.route?.params?.route);
  }, []);

  return (
    <View style={listingStyle.mainContainer}>
      <Header icon={true}>
        <Text style={headerTxtStyle.headerText}>HOLIDAYS & EVENTS</Text>
      </Header>
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading ? (
          <ListPlaceholder />
        ) : list?.length > 0 ? (
          transformList(list, "Holiday&Events", false, false, true).map(
            (item, index) => {
              return (
                <View
                  key={index}
                  style={[
                    listingStyle.container,
                    {
                      borderBottomWidth: list.length - 1 === index ? 0 : 1,
                      paddingVertical: normalize(15),
                    },
                  ]}
                >
                  <View>
                    <Text style={cardStyle.titleText}>{item?.title}</Text>
                    <Text style={cardStyle.subTitleText}>{item?.subTitle}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <View
                      style={[
                        timeLogStyle.indicator,
                        cardStyle.detailIndicator,
                        {
                          backgroundColor: getColor(item?.type, colors.white),
                        },
                      ]}
                    />
                    <Text style={cardStyle.subTitleText}>
                      {item?.type === "event"
                        ? "Event"
                        : item?.type === "holiday"
                        ? "Holiday"
                        : ""}
                    </Text>
                  </View>
                </View>
              );
            }
          )
        ) : (
          <></>
        )}
      </ScrollView>
    </View>
  );
};

export { HolidayEventListing };
