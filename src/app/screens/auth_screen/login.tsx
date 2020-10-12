import React, { useEffect, useContext } from 'react';
import { Text, View, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../../reducer';
import { loginStyle as style } from '../../../assets/styles';
import { GoogleConfig } from '../../utils';
import { signInApple, signInGoogle } from '../../services';
import { buttonui as Logo } from '../../common/ui/buttonUi';
import LoginWrapper from './loginWrapper';

const Login = () => {
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    GoogleConfig();
  }, []);

  return (
    <LoginWrapper>
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
    </LoginWrapper>
  );
};

export { Login };
