import * as Yup from "yup";
import {
  imageValidation,
  imageValidationRequired,
  requiredMessage,
} from "../../../utils/validation/constants";

const validation = {
  name: Yup.string()
    .min(4, "El título debe tener al menos 4 caracteres")
    .required(requiredMessage + "el título"),
  content: Yup.string().required(requiredMessage + "el contenido"),
  category_id: Yup.string().required(requiredMessage + "la categoría"),
};

export const createValidationSchema = Yup.object().shape({
  ...validation,
  ...imageValidationRequired,
});

export const editValidationSchema = Yup.object().shape({
  ...validation,
  ...imageValidation,
});

export const initialValues = {
  name: "",
  category_id: "",
  content: "",
  image: "",
};
