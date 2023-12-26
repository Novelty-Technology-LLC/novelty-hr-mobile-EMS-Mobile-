import * as yup from "yup";
export const announcementValidationSchema = yup.object().shape({
  description: yup.string().required("Description is required"),
  title: yup.string().required("Title is required"),
});
