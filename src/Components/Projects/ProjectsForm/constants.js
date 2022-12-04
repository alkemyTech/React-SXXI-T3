import * as Yup from "yup";
import {
  imageValidation,
  imageValidationRequired,
  requiredMessage,
} from "../../../utils/validation/constants";

const validations = {
  title: Yup.string().required(requiredMessage + "el título"),
  description: Yup.string().required(requiredMessage + "la descripción"),
  due_date: Yup.string(),
};

export const createValidationSchema = Yup.object().shape({
  ...validations,
  imageValidationRequired,
});
export const editValidationSchema = Yup.object().shape({
  ...validations,
  imageValidation,
});

export const initialValues = {
  title: "",
  description: "",
  image: "",
  due_date: "",
};
