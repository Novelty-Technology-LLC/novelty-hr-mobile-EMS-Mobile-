import { Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SmallHeader } from "./smallHeader";
import { profileStyle } from "../../assets/styles/tabs/profile";
import { getRequest } from "../services";
import { AuthContext } from "../reducer";

export const InventoryInfo = () => {
  const { state, dispatch } = useContext(AuthContext);
  const [inv, setInv] = useState([]);
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
    <View style={profileStyle.invinfoView}>
      <View style={profileStyle.body}>
        <SmallHeader text="Assigned Inventory" showLine={false} />

        <View>
          {inv.map((item) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingRight: 90,
              }}
            >
              <View
                style={{
                  flex: 0.5,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                }}
              >
                <Text style={profileStyle.text}>{item?.category}</Text>
              </View>
              <View
                style={{
                  flex: 0.5,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                }}
              >
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
      </View>
    </View>
  );
};
