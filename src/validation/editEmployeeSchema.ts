import * as yup from 'yup';

export const editEmployeeSchema = yup.object({
    first_name: yup.string().required('First name is required.'),
    last_name: yup.string().required('Last name is required.'),
    designation: yup.string().required('Designation is required.'),
    email: yup.string().required('Email is required.').email('Enter a valid email.'),
    phone: yup.number()
        .required('Phone number is required.')
        .test('len', 'Enter a valid number.', val => val?.toString().length === 10),
    gender: yup.string().required('Gender is required.'),
    birth_date: yup.string().required('DOB is required.'),
    blood_group: yup.string().required('Blood Group is required.'),
    join_date: yup.string().required('Join Date is required.'),
    work_shift: yup.string().required('Work Shift is required.'),
});