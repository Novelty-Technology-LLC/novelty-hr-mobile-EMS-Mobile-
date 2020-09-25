import React, { useEffect, useContext } from "react";
import { Text, View, Image, Platform } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AuthContext } from "../../reducer";
import { loginStyle as style } from "../../../assets/styles";
import { GoogleConfig } from "../../utils";
import { signInApple, signInGoogle } from "../../services";
import Svg, { Path } from "react-native-svg";

const Login = () => {
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    GoogleConfig();
  }, []);

  return (
    <View style={style.container}>
      <View style={style.imageView}>
        <Svg width={97.951} height={83.239} viewBox="0 0 97.951 83.239">
          <Path
            d="M60.009 20.371v15.831l11.066-5.78.013 23.741-22.013 11.806v-39.8L0 0v57.073l14.919 7.964.1-40.05 19.02 10.232-.1 40.05 15.013 7.906v.063l.056-.033.06.033v-.063L86.34 63.364l-.016-39.887 11.627-6.057V0z"
            fill="#bf8b59"
          />
        </Svg>
        <Text style={style.imageText}>Novelty EMS</Text>
      </View>
      <View style={style.buttonView}>
        <Text style={style.buttonText}>Continue with</Text>
        <View style={style.loginView}>
          <TouchableOpacity
            style={style.iconView}
            onPress={async () => await signInGoogle(dispatch)}
          >
            <Svg width={35.491} height={35.491} viewBox="0 0 35.491 35.491">
              <Path
                d="M7.866 21.448L6.63 26.06l-4.515.1a17.777 17.777 0 01-.131-16.571l4.02.737 1.761 4a10.591 10.591 0 00.1 7.13z"
                fill="#fbbb00"
              />
              <Path
                d="M35.181 14.431a17.739 17.739 0 01-6.326 17.154l-5.063-.258-.717-4.474a10.576 10.576 0 004.551-5.4h-9.489v-7.02h17.046z"
                fill="#518ef8"
              />
              <Path
                d="M28.854 31.583a17.751 17.751 0 01-26.74-5.429l5.751-4.707a10.554 10.554 0 0015.209 5.4z"
                fill="#28b446"
              />
              <Path
                d="M29.073 4.085l-5.749 4.707a10.553 10.553 0 00-15.558 5.526L1.985 9.585a17.749 17.749 0 0127.089-5.5z"
                fill="#f14336"
              />
            </Svg>
          </TouchableOpacity>

          {Platform.OS === "ios" && (
            <View style={style.iconView}>
              <TouchableOpacity
                onPress={async () => await signInApple(dispatch)}
              >
                <Svg width={32.21} height={37.71} viewBox="0 0 32.21 37.71">
                  <Path
                    d="M21.35 6.121A8.3 8.3 0 0023.174 0a8.849 8.849 0 00-5.729 3.1 7.686 7.686 0 00-1.876 5.972 7.469 7.469 0 005.781-2.951z"
                    fill="#131313"
                  />
                  <Path
                    d="M31.119 12.651a9.546 9.546 0 00-7.2-3.825c-3.382 0-4.813 1.619-7.162 1.619-2.423 0-4.264-1.614-7.188-1.614a9.781 9.781 0 00-7.872 4.758c-2.727 4.228-2.26 12.178 2.159 18.949 1.581 2.423 3.693 5.147 6.455 5.171 2.458.024 3.151-1.577 6.481-1.593s3.962 1.614 6.415 1.589c2.765-.021 4.992-3.04 6.573-5.463a27.17 27.17 0 002.435-4.572 8.314 8.314 0 01-1.096-15.019z"
                    fill="#131313"
                  />
                </Svg>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      <View style={style.footerView}>
        <Text style={style.footeText}>
          Copyright 2020. Powered by Novelty Technology.
        </Text>
      </View>
    </View>
  );
};

export { Login };
