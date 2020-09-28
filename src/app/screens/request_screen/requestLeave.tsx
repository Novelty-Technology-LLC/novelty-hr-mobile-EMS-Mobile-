import React from 'react';
import { Text, View } from 'react-native';
import { header as Header } from '../../common';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { default as theme } from '../../../assets/styles/leave_screen/custom-theme.json';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { requestLeave as style } from '../../../assets/styles';
import { headerText } from '../../../assets/styles';
import {
  Calander,
  Teams,
  Leavetype,
  Description,
} from '../../components/request_screen';
import { button as Button } from '../../common';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { postRequest } from '../../services';

const validationSchema = Yup.object().shape({
  date: Yup.object().required().label('date'),
  leaveType: Yup.string().required().label('leaveType'),
  description: Yup.string().required().label('description'),
});

const initialValues = {
  date: '',
  leaveType: 'Paid time off',
  description: '',
};

const submitRequest = (data) => {
  postRequest(data)
    .then((data) => console.log('data posted'))
    .catch((err) => console.log(err));
};

const RequestLeave = () => {
  const onSubmit = (values: Object) => {
    const startDate = new Date(JSON.parse(values.date).startDate)
      .toString()
      .slice(0, 10);
    const endDate = new Date(JSON.parse(values.date).endDate)
      .toString()
      .slice(0, 10);

    values.type = values.leaveType;
    values.requestor_id = 5;
    values.status = 'In Progress';
    values.leave_date = {
      startDate,
      endDate,
    };
    delete values.date;
    delete values.leaveType;
    console.log('values -> ', values);
    submitRequest(values);
  };

  return (
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <SafeAreaView style={style.container}>
        <ScrollView
          style={style.container}
          showsVerticalScrollIndicator={false}
        >
          <Header>
            <Text style={headerText}>Request Leave</Text>
          </Header>
          <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={(values) => onSubmit(values)}
          >
            {({ handleChange, handleSubmit, values }) => (
              <>
                <Calander style={style.calendar} handleChange={handleChange} />
                <Teams />
                <Leavetype handleChange={handleChange} />
                <Description handleChange={handleChange} />
                <View style={style.buttonView}>
                  <Button
                    style={style.buttonText}
                    title={'Submit Request'}
                    onPress={() => handleSubmit()}
                  />
                </View>
              </>
            )}
          </Formik>
        </ScrollView>
      </SafeAreaView>
    </ApplicationProvider>
  );
};

export { RequestLeave };
