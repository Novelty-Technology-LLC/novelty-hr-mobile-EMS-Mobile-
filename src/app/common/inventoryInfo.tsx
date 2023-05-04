import { RefreshControl, ScrollView, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SmallHeader } from "./smallHeader";
import { profileStyle } from "../../assets/styles/tabs/profile";
import { getRequest } from "../services";
import { AuthContext } from "../reducer";
import { profileStyles } from "../../assets/styles/profile";
import { CustomText } from "../components/text";

export const InventoryInfo = () => {
  const { state } = useContext(AuthContext);
  const [inv, setInv] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    fetchInventory();
    setRefreshing(false);
  };
  useEffect(() => {
    fetchInventory();
  }, []);
  const fetchInventory = async () => {
    try {
      var response: any = await getRequest(
        `/webportal/users/user-info/${state?.user?.id}`
      );

      setInv(response[0]?.assigned_devices);
    } catch (error) {}
  };

  return (
    <ScrollView
      contentContainerStyle={profileStyle.invinfoView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={profileStyle.body}>
        {inv.length > 0 && (
          <SmallHeader text="Assigned Inventory" showLine={false} />
        )}

        {inv.length > 0 ? (
          <View>
            {inv.map((item) => (
              <View style={profileStyles.invContainer}>
                <View style={profileStyles.invWrapper}>
                  <Text style={profileStyle.text}>{item?.category}</Text>
                </View>
                <View style={profileStyles.invWrapper}>
                  <Text
                    style={[
                      profileStyle.text,
                      { alignSelf: "flex-start", textAlign: "left" },
                    ]}
                  >
                    {item?.inventory_code}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={profileStyles.emptyInv}>
            <CustomText
              text="No inventory assigned"
              style={profileStyles.emptyText}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};
