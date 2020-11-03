import React, { useState, useEffect, useContext, Fragment } from 'react';
import { Text, View, Platform, Keyboard, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../../reducer';
import {
  loginStyle as style,
  requestLeave as rstyle,
} from '../../../assets/styles';
import { GoogleConfig } from '../../utils';
import {
  signInApple,
  signInGoogle,
  getLogin,
  createUser,
} from '../../services';
import { buttonui as Logo } from '../../common/ui/buttonUi';
import LoginWrapper from './loginWrapper';
import { Formik } from 'formik';
import { button as Button, snackErrorTop } from '../../common';

let AuthModel = {
  EmailAddress: '',
  Password: '',
};

const Login = () => {
  const [showLoginForm, setLoginForm] = useState(
    Platform.OS === 'ios' ? true : false
  );
  const { dispatch } = useContext(AuthContext);
  const fetchLogin = async () => {
    const login = await getLogin();
    setLoginForm(login?.metadata?.show_login ?? false);
  };

  const submitLogin = (values: any) => {
    if (
      values.EmailAddress === 'dev@noveltytechnology.com' &&
      values.Password === 'testPassword'
    ) {
      console.log('authenticated');
      const user = {
        email: 'dev@noveltytechnology.com',
        image_url:
          'https://lh5.googleusercontent.com/-x6GB2ApSCXU/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnhtcm9X9UWnHBQpR4YP9h7d9uPfw/s120/photo.jpg',
        uuid: '113798347975576059462',
        idToken: 'alive',
      };
      createUser(dispatch, user, user.idToken);
    } else {
      Keyboard.dismiss();
      snackErrorTop({ message: 'Authentication Failed' });
    }
  };

  useEffect(() => {
    if (Platform.OS === 'ios') {
      fetchLogin();
    }
    GoogleConfig();
  }, []);

  return (
    <LoginWrapper>
      <View style={style.buttonView}>
        {showLoginForm && (
          <View style={style.formWrapper}>
            <Formik
              initialValues={AuthModel}
              onSubmit={(values) => {
                Keyboard.dismiss();
                submitLogin(values);
              }}
            >
              {({ handleChange, values, handleSubmit }) => (
                <Fragment>
                  <TextInput
                    style={style.textInput}
                    placeholder="Email"
                    value={values.EmailAddress}
                    secureTextEntry={false}
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    onChangeText={handleChange('EmailAddress')}
                    autoCapitalize="none"
                  />
                  <TextInput
                    style={style.textInput}
                    value={values.Password}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={handleChange('Password')}
                  />
                  <Button onPress={() => handleSubmit()}>
                    <View style={rstyle.buttonView}>
                      <Text
                        style={[rstyle.buttonText, { paddingVertical: 10 }]}
                      >
                        Login
                      </Text>
                    </View>
                  </Button>
                  <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
                    OR
                  </Text>
                </Fragment>
              )}
            </Formik>
          </View>
        )}
        <Text style={style.buttonText}>Continue with</Text>
        <View style={style.loginView}>
          <TouchableOpacity
            style={style.iconView}
            onPress={async () => await signInGoogle(dispatch)}
          >
            <Logo name="google" />
          </TouchableOpacity>

          {/* {Platform.OS === 'ios' && (
            <View style={style.iconView}>
              <TouchableOpacity
                onPress={async () => await signInApple(dispatch)}
              >
                <Logo name="apple" />
              </TouchableOpacity>
            </View>
          )} */}
        </View>
      </View>
    </LoginWrapper>
  );
};

export { Login };
