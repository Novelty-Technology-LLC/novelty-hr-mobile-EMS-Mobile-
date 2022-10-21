import * as yup from 'yup';

export const createShoutSchema = yup.object({
    shoutout: yup.string().required('Please write a shoutout.'),
});