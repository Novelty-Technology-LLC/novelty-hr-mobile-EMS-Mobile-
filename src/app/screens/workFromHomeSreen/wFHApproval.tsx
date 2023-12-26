import React, { useContext } from "react";
import { Text, View } from "react-native";
import Async from "@react-native-community/async-storage";
import { AuthContext } from "../../reducer";
import { headerTxtStyle } from "../../../assets/styles";
import { header as Header } from "../../common";

const WFHApproval = () => {
  const { dispatch }: any = useContext(AuthContext);
  return (
    <View>
      <Header icon={false}>
        <Text style={headerTxtStyle.headerText}>Hello</Text>
      </Header>
      <Text
        onPress={async () => {
          await Async.removeItem("token");
          dispatch({ type: "SIGN_OUT" });
        }}
      >
        Logout
      </Text>
    </View>
  );
};

export { WFHApproval };
