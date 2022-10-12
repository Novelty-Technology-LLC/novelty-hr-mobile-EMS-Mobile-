import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import normalize from 'react-native-normalize';
import { headerTxtStyle, listingStyle } from '../../../assets/styles';
import { editEmployeeStyles } from '../../../assets/styles/dashboard/editEmployee.styles';
import { DropDown, header as Header } from "../../common";
import { CustomButton } from '../../common/customButton';
import { CustomTextInput } from '../../common/customTextInput';
import { Space } from '../../common/space';
import { navigate } from '../../utils/navigation';

export const EditEmployeeDetail = ({ route }: any) => {

    const data = route.params;

    const initialValues = {
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        phone: data.phone,
        gender: data.gender,
        birthDate: data.birth_date,
        bloodGroup: data.blood_group,
        employeeId: data.employee_id,
        joinDate: data.join_date,
        workShift: data.work_shift,
    }

    return (
        <View style={listingStyle.mainContainer}>
            <Header icon={true}>
                <Text style={headerTxtStyle.headerText}>Edit Employee</Text>
            </Header>
            <ScrollView contentContainerStyle={editEmployeeStyles.body}>
                <Formik
                    initialValues={initialValues}
                    onSubmit={(values) => {
                        console.log(values);
                        data.first_name = 'Hello';
                        navigate('employeeDetail', { updated: true, data })
                    }}
                >
                    {(props) => {
                        return <View style={{}}>
                            <View style={editEmployeeStyles.nameContainer}>
                                <CustomTextInput
                                    textInputProps={{
                                        placeholder: 'First Name',
                                        value: props.values.firstName,
                                        blurOnSubmit: false,
                                    }}
                                    onChange={props.handleChange('firstName')}
                                />
                                <Space width={normalize(20)} />
                                <CustomTextInput
                                    textInputProps={{
                                        placeholder: 'Last Name',
                                        value: props.values.lastName,
                                        blurOnSubmit: false,
                                    }}
                                    onChange={props.handleChange('lastName')}
                                />
                            </View>
                            <CustomTextInput
                                textInputProps={{
                                    placeholder: 'Email',
                                    value: props.values.email,
                                    blurOnSubmit: false,
                                }}
                                onChange={props.handleChange('email')}
                            />
                            <CustomTextInput
                                textInputProps={{
                                    placeholder: 'Phone number',
                                    value: props.values.phone,
                                    blurOnSubmit: false,

                                }}
                                onChange={props.handleChange('phone')}
                            />
                            {/* <CustomTextInput
                                textInputProps={{
                                    placeholder: 'Gender',
                                    value: props.values.gender,
                                    blurOnSubmit: false,

                                }}
                                onChange={props.handleChange('gender')}
                            /> */}
                            <DropDown

                            />
                            <CustomTextInput
                                textInputProps={{
                                    placeholder: 'Birth Date',
                                    value: props.values.birthDate,
                                    blurOnSubmit: false,

                                }}
                                onChange={props.handleChange('birthDate')}
                            />
                            <CustomTextInput
                                textInputProps={{
                                    placeholder: 'Blood Group',
                                    value: props.values.bloodGroup,
                                    blurOnSubmit: false,

                                }}
                                onChange={props.handleChange('bloodGroup')}
                            />

                            <CustomTextInput
                                textInputProps={{
                                    placeholder: 'Employee ID',
                                    value: props.values.employeeId,
                                    blurOnSubmit: false,

                                }}
                                onChange={props.handleChange('employeeId')}
                            />
                            <CustomTextInput
                                textInputProps={{
                                    placeholder: 'Join Date',
                                    value: props.values.joinDate,
                                    blurOnSubmit: false,

                                }}
                                onChange={props.handleChange('joinDate')}
                            />
                            <CustomTextInput
                                textInputProps={{
                                    placeholder: 'Work Shift',
                                    value: props.values.workShift,
                                    blurOnSubmit: false,

                                }}
                                onChange={props.handleChange('workShift')}
                            />


                            <CustomButton
                                label='Update'
                                onPress={props.handleSubmit}
                            />
                        </View>
                    }}
                </Formik>


            </ScrollView >
        </View>
    );
}
