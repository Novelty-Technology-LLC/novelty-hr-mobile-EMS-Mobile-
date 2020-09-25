import React, { useEffect, useContext } from 'react';
import { Text, View, Image, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../../reducer';
import { loginStyle as style } from '../../../assets/styles';
import { GoogleConfig } from '../../utils';
import { signInApple, signInGoogle } from '../../services';
import Logo from '../../common/ui/buttonUi';

const Login = () => {
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    GoogleConfig();
  }, []);

  return (
    <View style={style.container}>
      <View style={style.imageView}>
        <Logo name="novelty" />
        <Text style={style.imageText}>Novelty EMS</Text>
      </View>
      <View style={style.buttonView}>
        <Text style={style.buttonText}>Continue with</Text>
        <View style={style.loginView}>
          <TouchableOpacity
            style={style.iconView}
            onPress={async () => await signInGoogle(dispatch)}
          >
            <Logo name="google" />
          </TouchableOpacity>

          {Platform.OS === 'ios' && (
            <View style={style.iconView}>
              <TouchableOpacity
                onPress={async () => await signInApple(dispatch)}
              >
                <Logo name="apple" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      <View style={style.footerView}>
        <Text style={style.footerText}>
          Copyright 2020. Powered by Novelty Technology.
        </Text>
      </View>
    </View>
  );
};

export { Login };
