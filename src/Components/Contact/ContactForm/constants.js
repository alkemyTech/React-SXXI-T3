import * as Yup from "yup";
import {numRegExp, requiredMessage,} from "../../../utils/validation/constants";

export const validationSchema = () =>
  Yup.object().shape({
    name: Yup.string().required(requiredMessage + "su nombre"),
    email: Yup.string()
      .email(`Formato de email inválido`)
      .required(requiredMessage + "su email"),
    phone: Yup.string()
      .matches(numRegExp, {
        message: `El teléfono debe contener unicamente números`,
        excludeEmptyString: false,
      })
      .min(8, "El teléfono debe tener al menos 8 números")
      .required(requiredMessage + "su teléfono"),
    message: Yup.string().required(requiredMessage + "su mensaje"),
  });

export const initialValues = {
  name: "",
  email: "",
  phone: "",
  message: "",
};
