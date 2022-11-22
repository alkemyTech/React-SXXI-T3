import * as Yup from "yup";
import {
  imgRegExp,
  invalidImageFormatMessage,
  requiredMessage,
} from "../../../utils/validation/constants";

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, "El nombre debe tener al menos 4 caracteres")
    .required(requiredMessage + "el nombre"),
  email: Yup.string()
    .email("Ingrese un email válido")
    .required(requiredMessage + "el email"),
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 4 caracteres")
    .required(requiredMessage + "la contraseña"),
  role: Yup.string().required(requiredMessage + "el rol"),
  image: Yup.string()
    .matches(imgRegExp, {
      message: invalidImageFormatMessage,
      excludeEmptyString: true,
    })
    .required(requiredMessage + "la imagen"),
});

export const initialValues = {
  name: "",
  email: "",
  password: "",
  image: "",
  role: "",
};
