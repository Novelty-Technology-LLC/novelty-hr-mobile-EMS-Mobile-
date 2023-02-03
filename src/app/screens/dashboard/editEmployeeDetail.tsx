import { Calendar, ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { Formik } from "formik";
import React, { useEffect, useMemo, useState, useRef } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import normalize from "react-native-normalize";
import {
  headerTxtStyle,
  listingStyle,
  timeLogStyle,
} from "../../../assets/styles";
import { editEmployeeStyles } from "../../../assets/styles/dashboard/editEmployee.styles";
import { DialogContainer, header as Header, showToast } from "../../common";
import { CustomButton } from "../../common/customButton";
import { CustomTextInput } from "../../common/customTextInput";
import { DropDownInput } from "../../common/dropDownInput";
import { Space } from "../../common/space";
import { navigate } from "../../utils/navigation";
import { default as theme } from "../../../assets/styles/leave_screen/custom-theme.json";
import moment from "moment";
import { editEmployeeSchema } from "../../../validation/editEmployeeSchema";
import {
  bloodGroups as bloodGroupsFromConstants,
  genders as gendersFromConstants,
} from "../../utils";
import { DropDownItem } from "../../interface/dropDownItem";
import { lookupServices } from "../../services/lookupService";
import { updateEmployeeDetail } from "../../services";

const genders = gendersFromConstants;
const bloodGroups = bloodGroupsFromConstants;

const getInitialForm = (data: any): { [key: string]: string } => {
  return {
    first_name: data.first_name,
    last_name: data.last_name,
    designation: data.designation,
    email: data.email,
    phone: data.phone,
    gender: data.gender,
    birth_date: moment(data.birth_date).format("ll"),
    blood_group: data.blood_group,
    employee_id: data.employee_id,
    join_date: data.join_date,
    work_shift: data.work_shift,
  };
};

export const EditEmployeeDetail = ({ route, navigation }: any) => {
  const [isFetching, setIsFetching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const data = route.params;
  const [birthDate, setBirthDate] = useState(new Date(data.birth_date));
  const [joinDate, setJoinDate] = useState(new Date(data.join_date));
  const [workShifts, setWorkShifts] = useState<DropDownItem[]>([]);
  const [designations, setDesignations] = useState<DropDownItem[]>([]);
  const fiscalYear = useRef<string>("");

  const [isBDCVisible, setBDCVisible] = useState(false);
  const [isJDCVisible, setJDCVisible] = useState(false);

  const getInitial = (values: DropDownItem[], value: any) => {
    const match = values.find((item) => item.value === value);
    if (match) return match;
    return { label: value, value };
  };

  const initialGender = getInitial(genders, data.gender);
  const initialWorkShif = getInitial(workShifts, data.work_shift);
  const initialBloodGroup = getInitial(bloodGroups, data.blood_group);
  const initialDesignation = getInitial(designations, data.designation);

  const handleSubmit = (values: any) => {
    setIsSubmitting(true);
    updateEmployeeDetail(data.id, values, fiscalYear.current)
      .then(() => {
        setIsSubmitting(false);
        showToast("Employee detail successfully updated ");
        navigate("employeeDetail", {
          updated: true,
          data: { ...data, ...values },
        });
      })
      .catch((err) => {
        showToast(`${err.message} `, false);
        setIsSubmitting(false);
      });
  };

  const transformDesignations = (
    designationsFromAPi: any[]
  ): DropDownItem[] => {
    let transformed: DropDownItem[] = [];
    designationsFromAPi.map((value) => {
      transformed.push({ label: value, value });
    });
    return transformed;
  };

  const getDropdownValues = () => {
    lookupServices
      .lookup()
      .then((data: any[]) => {
        const workShiftsFromAPI = data.find(
          (item) => item.field === "work_shift"
        ).value.work_shift;
        const designationsFromAPI = data.find(
          (item) => item.field === "designation"
        ).value.designation;
        setWorkShifts(workShiftsFromAPI);
        setDesignations(transformDesignations(designationsFromAPI));
        fiscalYear.current =
          data
            .find((item) => item.field === "fiscal_year")
            .value.fiscal_year.find((item: any) => item.active).label ?? "";
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getDropdownValues();
  }, []);

  return (
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <View style={listingStyle.mainContainer}>
        <Header icon={true}>
          <Text style={headerTxtStyle.headerText}>Edit Employee</Text>
        </Header>
        <ScrollView
          contentContainerStyle={editEmployeeStyles.body}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps='handled'
        >
          <Formik
            initialValues={getInitialForm(data)}
            onSubmit={handleSubmit}
            validationSchema={editEmployeeSchema}
          >
            {(props) => {
              return (
                <View style={{}}>
                  {/* First name and last name */}
                  <View style={editEmployeeStyles.horizontalView}>
                    <CustomTextInput
                      error={props.errors.first_name}
                      touched={props.touched.first_name}
                      icon='account'
                      style={editEmployeeStyles.horizontalViewItem}
                      textInputProps={{
                        placeholder: "First Name",
                        value: props.values.first_name,
                      }}
                      onChange={props.handleChange("first_name")}
                    />
                    <Space width={normalize(20)} />
                    <CustomTextInput
                      error={props.errors.last_name}
                      touched={props.touched.last_name}
                      icon='account'
                      style={editEmployeeStyles.horizontalViewItem}
                      textInputProps={{
                        placeholder: "Last Name",
                        value: props.values.last_name,
                      }}
                      onChange={props.handleChange("last_name")}
                    />
                  </View>

                  {/* Designation */}
                  <DropDownInput
                    error={props.errors.designation}
                    touched={props.touched.designation}
                    icon='account-tie'
                    dropDownProps={{
                      placeholder: initialDesignation?.label,
                      items: designations,
                      onChangeItem: (item) => {
                        props.handleChange("designation")(item.value);
                      },
                      disabled: isFetching,
                    }}
                  />

                  {/* Email */}
                  <CustomTextInput
                    error={props.errors.email}
                    touched={props.touched.email}
                    icon='email-newsletter'
                    textInputProps={{
                      placeholder: "Email",
                      value: props.values.email,
                    }}
                    onChange={props.handleChange("email")}
                  />

                  {/* Gender and Phone Number */}
                  <View style={editEmployeeStyles.horizontalView}>
                    <View style={[editEmployeeStyles.horizontalViewItem]}>
                      <DropDownInput
                        error={props.errors.gender}
                        touched={props.touched.gender}
                        icon='human-male-female'
                        dropDownProps={{
                          placeholder: initialGender?.label,
                          items: genders,
                          onChangeItem: (item) => {
                            props.handleChange("gender")(item.value);
                          },
                        }}
                      />
                    </View>
                    <Space width={normalize(20)} />
                    <CustomTextInput
                      error={props.errors.phone}
                      touched={props.touched.phone}
                      icon='phone'
                      style={editEmployeeStyles.horizontalViewItem}
                      textInputProps={{
                        placeholder: "Phone number",
                        value: props.values.phone,
                        keyboardType: "number-pad",
                      }}
                      onChange={props.handleChange("phone")}
                    />
                  </View>

                  {/* Birth Date and Blood group*/}
                  <View style={editEmployeeStyles.horizontalView}>
                    <>
                      <DialogContainer
                        visible={isBDCVisible}
                        setVisible={setBDCVisible}
                      >
                        <>
                          <Text style={listingStyle.title}>Birth Date</Text>
                          <Calendar
                            style={timeLogStyle.modalCalender}
                            date={birthDate}
                            min={new Date(1970)}
                            max={new Date()}
                            onSelect={(date) => {
                              setBirthDate(date);
                              props.handleChange("birth_date")(
                                moment(date).format("ll")
                              );
                              setBDCVisible(false);
                            }}
                          />
                        </>
                      </DialogContainer>
                      <Pressable
                        onPress={() => setBDCVisible(true)}
                        style={editEmployeeStyles.horizontalViewItem}
                      >
                        <CustomTextInput
                          error={props.errors.birth_date}
                          touched={props.touched.birth_date}
                          icon='cake-variant'
                          textInputProps={{
                            placeholder: "Birth Date",
                            value: props.values.birth_date,
                            editable: false,
                          }}
                        />
                      </Pressable>
                    </>
                    <Space width={normalize(20)} />

                    <View style={editEmployeeStyles.horizontalViewItem}>
                      <DropDownInput
                        error={props.errors.blood_group}
                        touched={props.touched.blood_group}
                        icon='water'
                        dropDownProps={{
                          placeholder: initialBloodGroup?.label,
                          items: bloodGroups,
                          onChangeItem: (item) => {
                            props.handleChange("blood_group")(item.value);
                          },
                        }}
                      />
                    </View>
                  </View>

                  {/* Employee ID */}
                  <CustomTextInput
                    icon='card-account-details'
                    textInputProps={{
                      placeholder: "Employee ID",
                      value: props.values.employee_id,
                      editable: false,
                    }}
                    onChange={props.handleChange("employee_id")}
                  />

                  {/* Join Date */}
                  <>
                    <DialogContainer
                      visible={isJDCVisible}
                      setVisible={setJDCVisible}
                    >
                      <>
                        <Text style={listingStyle.title}>Join Date</Text>
                        <Calendar
                          style={timeLogStyle.modalCalender}
                          date={joinDate}
                          min={new Date(2011)}
                          max={new Date()}
                          onSelect={(date) => {
                            setJoinDate(date);
                            props.handleChange("join_date")(
                              moment(date).format().slice(0, 10)
                            );
                            setJDCVisible(false);
                          }}
                        />
                      </>
                    </DialogContainer>
                    <Pressable onPress={() => setJDCVisible(true)}>
                      <CustomTextInput
                        error={props.errors.join_date}
                        touched={props.touched.join_date}
                        icon='location-enter'
                        textInputProps={{
                          placeholder: "Join Date",
                          value: props.values.join_date,
                          editable: false,
                        }}
                      />
                    </Pressable>
                  </>

                  {/* Work Shift */}
                  <DropDownInput
                    error={props.errors.work_shift}
                    touched={props.touched.work_shift}
                    icon='timetable'
                    dropDownProps={{
                      placeholder: initialWorkShif?.label,
                      items: workShifts,
                      onChangeItem: (item) => {
                        props.handleChange("work_shift")(item.value);
                      },
                      disabled: isFetching,
                    }}
                  />

                  <CustomButton
                    isLoading={isSubmitting}
                    label='Update'
                    onPress={props.handleSubmit}
                    disabled={false}
                  />
                </View>
              );
            }}
          </Formik>
        </ScrollView>
      </View>
    </ApplicationProvider>
  );
};
