import React from 'react';
import { Text, View } from 'react-native';
import { header as Header } from '../../common/header';
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
import Button from '../../common/button';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  date: Yup.object().required().label('date'),
  leaveType: Yup.string().required().label('leaveType'),
  description: Yup.string().required().label('description'),
});

const initialValues = {
  date: '',
  leaveType: 'paid time of',
  description: '',
};

const RequestLeave = () => {
  const onSubmit = (values: Object) => {
    const startDate = new Date(JSON.parse(values.date).startDate)
      .toString()
      .slice(0, 10);
    const endDate = new Date(JSON.parse(values.date).endDate)
      .toString()
      .slice(0, 10);

    delete values.date;

    values.startDate = startDate;
    values.endDate = endDate;
    console.log('values -> ', values);
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
                <Button
                  style={style}
                  title={'Submit Request'}
                  onPress={() => console.log('button pressed')}
                />
              </>
            )}
          </Formik>
        </ScrollView>
      </SafeAreaView>
    </ApplicationProvider>
  );
};

export { RequestLeave };
