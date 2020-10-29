import React, { useState } from 'react';
import { View, Text, Platform, ActivityIndicator } from 'react-native';
import { headerText, requestLeave } from '../../../assets/styles';
import { header as Header } from '../../common';
import { Description } from '../../components/request_screen';
import { Calendar, Task } from '../../components/time_log';
import Time from '../../components/time_log/time';
import { button as Button } from '../../common';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Projects from '../../components/time_log/projects';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { getUser } from '../../utils';
import { postTimeLog } from '../../services/timeLogService';
import { useNavigation } from '@react-navigation/native';
import colors from '../../../assets/colors';

const initialValues = {
  log_date: new Date().toJSON(),
  task: '',
  duration: '',
  project_id: 0,
  note: '',
};

const validationSchema = Yup.object().shape({
  log_date: Yup.date().nullable().required('Date is a required field'),
  task: Yup.string().required('Task is required').label('task'),
  duration: Yup.string().required('Time is required').label('duration'),
  project_id: Yup.number().required('Project is required').label('project_id'),
  note: Yup.string().required('Note is a required field').label('note'),
});

const LogTime = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (values) => {
    setIsLoading(true);
    const user = await getUser();
    values.user_id = JSON.parse(user).id;
    postTimeLog(values)
      .then((data) => {
        setIsLoading(false);
        navigation.navigate('timelog');
      })
      .catch((err) => console.log(err));
  };
  return (
    <KeyboardAwareScrollView
      style={requestLeave.container}
      scrollEnabled={true}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      extraScrollHeight={Platform.OS === 'ios' ? 100 : 70}
      extraHeight={Platform.OS === 'android' ? 140 : 50}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode={'none'}
    >
      <Header icon={true}>
        <Text style={headerText}> Log Time</Text>
      </Header>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={(values) => onSubmit(values)}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <>
            <Calendar handleChange={handleChange} />
            <Task
              handleChange={handleChange}
              error={errors}
              touched={touched}
            />
            <Time
              handleChange={handleChange}
              error={errors}
              touched={touched}
            />
            <Projects handleChange={handleChange} error={errors} />
            <Description
              handleChange={handleChange}
              // defaultValue={olddata && olddata.note}
              error={errors}
              touched={touched}
            />
            <Button onPress={() => handleSubmit()}>
              <View style={requestLeave.buttonView}>
                <Text style={requestLeave.buttonText}>Submit</Text>
                {isLoading && (
                  <ActivityIndicator size={30} color={colors.white} />
                )}
              </View>
            </Button>
          </>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  );
};

export { LogTime };
