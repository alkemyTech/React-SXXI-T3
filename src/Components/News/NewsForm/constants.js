import * as Yup from "yup";
import {
  imgRegExp,
  invalidImageFormatMessage,
  requiredMessage,
} from "../../../utils/validation/constants";

export const validationSchemaCreate = Yup.object().shape({
  name: Yup.string()
    .min(4, "El título debe tener al menos 4 caracteres")
    .required(requiredMessage + "el título"),
  image: Yup.string()
    .matches(imgRegExp, {
      message: invalidImageFormatMessage,
      excludeEmptyString: true,
    })
    .required(requiredMessage + "la imagen"),
  content: Yup.string().required(requiredMessage + "el contenido"),
  category_id: Yup.string().required(requiredMessage + "la categoría"),
});
export const validationSchemaEdit = Yup.object().shape({
  name: Yup.string()
    .min(4, "El título debe tener al menos 4 caracteres")
    .required(requiredMessage + "el título"),
  image: Yup.string()
    .matches(imgRegExp, {
      message: invalidImageFormatMessage,
      excludeEmptyString: true,
    }),
  content: Yup.string().required(requiredMessage + "el contenido"),
  category_id: Yup.string().required(requiredMessage + "la categoría"),
});

export const initialValues = {
  name: "",
  category_id: "",
  content: "",
  image: "",
};
