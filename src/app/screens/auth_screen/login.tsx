import React, { useEffect, useContext } from 'react';
import { Text, View, Image, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../../reducer';
import { loginStyle as style } from '../../../assets/styles';
import { GoogleConfig } from '../../utils';
import { signInApple, signInGoogle } from '../../services';

const Login = () => {
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    GoogleConfig();
  }, []);

  const onPressGoogle = async () => {
    await signInGoogle(dispatch);
  };

  const onPressApple = async () => {
    await signInApple(dispatch);
  };

  return (
    <View style={style.container}>
      <View style={style.imageView}>
        <Image
          style={style.image}
          source={require('../../../assets/images/noveltylogo.png')}
        />
        <Text style={style.imageText}>Novelty EMS</Text>
      </View>
      <View style={style.buttonView}>
        <Text style={style.buttonText}>Continue with</Text>
        <View style={style.loginView}>
          <TouchableOpacity
            style={style.iconView}
            onPress={() => onPressGoogle()}
          >
            <Image
              style={style.icon}
              source={require('../../../assets/images/icons8-google-96.png')}
            />
          </TouchableOpacity>

          {Platform.OS === 'ios' && (
            <View style={style.iconView}>
              <TouchableOpacity onPress={() => onPressApple()}>
                <Image
                  style={style.icon}
                  source={require('../../../assets/images/icons8-apple-logo-100.png')}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      <View style={style.footerView}>
        <Text>Copyright 2020. Powered by Novelty Technology.</Text>
      </View>
    </View>
  );
};

export { Login };
