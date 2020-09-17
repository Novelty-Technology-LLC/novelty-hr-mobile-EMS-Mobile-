import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { loginStyle as style } from '../../../assets/styles';

import appleAuth, {
  AppleButton,
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
  AppleAuthCredentialState,
} from '@invertase/react-native-apple-authentication';

const Login = () => {
  const navigation = useNavigation();

  const signInApple = async () => {
    return appleAuth
      .performRequest({
        requestedOperation: AppleAuthRequestOperation.LOGIN,
        requestedScopes: [
          AppleAuthRequestScope.EMAIL,
          AppleAuthRequestScope.FULL_NAME,
        ],
      })
      .then((res) => {
        let { identiyToken, email } = res;
        console.log('res -> ', res);
      });
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
          <View style={style.iconView}>
            <Image
              style={style.icon}
              source={require('../../../assets/images/icons8-google-96.png')}
            />
          </View>

          <View style={style.iconView}>
            <TouchableOpacity onPress={() => signInApple()}>
              <Image
                style={style.icon}
                source={require('../../../assets/images/icons8-apple-logo-100.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={style.footerView}>
        <Text>Copyright 2020. Powered by Novelty Technology.</Text>
      </View>
    </View>
  );
};

export { Login };
