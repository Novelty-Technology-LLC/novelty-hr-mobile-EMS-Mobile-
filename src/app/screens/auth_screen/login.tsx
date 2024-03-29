import React, {useState, useEffect, useContext, Fragment} from 'react';
import {
  Text,
  View,
  Platform,
  Keyboard,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AuthContext} from '../../reducer';
import {
  loginStyle as style,
  requestLeave as rstyle,
} from '../../../assets/styles';
import {GoogleConfig} from '../../utils';
import {
  signInApple,
  signInGoogle,
  getLogin,
  appLogin,
  signOutGoogle,
} from '../../services';
import {buttonui as Logo} from '../../common/ui/buttonUi';
import LoginWrapper from './loginWrapper';
import {Formik} from 'formik';
import {button as Button, showToast} from '../../common';
import {useNavigation} from '@react-navigation/native';

let AuthModel = {
  EmailAddress: '',
  Password: '',
};

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [showLoginForm, setLoginForm] = useState(
    Platform.OS === 'ios' ? true : false,
  );
  const {state, dispatch} = useContext<any>(AuthContext);

  const fetchLogin = async () => {
    const login = await getLogin();
    setLoginForm(login?.metadata?.show_login ?? false);
  };

  const submitLogin = (values: any) => {
    if (
      values.EmailAddress === 'dev@noveltytechnology.com' &&
      values.Password === 'testPassword'
    ) {
      setLoading(true);
      const user = {
        email: 'dev@noveltytechnology.com',
        image_url:
          'https://lh5.googleusercontent.com/-x6GB2ApSCXU/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnhtcm9X9UWnHBQpR4YP9h7d9uPfw/s120/photo.jpg',
        uuid: '113798347975576059462',
        idToken: 'alive',
        bypass: true,
        userId: 1062,
        password: 'testPassword',
      };
      appLogin(dispatch, user, loadFalse);
    } else {
      Keyboard.dismiss();
      showToast('Authentication Failed ', false);
    }
  };

  const loadFalse = () => {
    setLoading(false);
  };

  const navigate = () => {
    if (state?.isLoading) {
      return navigation.navigate('loading');
    } else {
      if (state?.user !== null) {
        return navigation.navigate('BottomTabs', {screen: 'Dashboard'});
      } else if (state?.isInvalid) {
        signOutGoogle();
        return navigation.navigate('invalid');
      } else if (state?.user === null) {
        return navigation.navigate('login');
      }
    }
  };

  useEffect(() => {
    if (Platform.OS === 'ios') {
      fetchLogin();
    }
    GoogleConfig();
  }, []);

  useEffect(() => {
    navigate();
  }, [state]);

  return (
    <LoginWrapper>
      <View style={style.buttonView}>
        {showLoginForm && (
          <View style={style.formWrapper}>
            <Formik
              initialValues={AuthModel}
              onSubmit={values => {
                Keyboard.dismiss();
                submitLogin(values);
              }}>
              {({handleChange, values, handleSubmit}) => (
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
                      <Text style={[rstyle.buttonText, {paddingVertical: 10}]}>
                        Login
                      </Text>
                      {loading && (
                        <ActivityIndicator
                          style={{marginLeft: 10}}
                          color="white"
                        />
                      )}
                    </View>
                  </Button>
                  <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
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
            onPress={async () => await signInGoogle(dispatch)}>
            <Logo name="google" />
          </TouchableOpacity>

          {Platform.OS === 'ios' && (
            <View style={style.iconView}>
              <TouchableOpacity
                onPress={async () => await signInApple(dispatch)}>
                <Logo name="apple" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </LoginWrapper>
  );
};

export {Login};
