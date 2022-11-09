import * as Yup from 'yup';


const requiredMessage = `es un campo requerido`;
const numRegExp = new RegExp(/^[0-9]/, 'i');

export const validationSchema = () => (
    Yup.object().shape({
        name: Yup
            .string()
            .required(`El nombre ${requiredMessage}`),
        email: Yup
            .string()
            .email(`Formato inválido`)
            .required(`El email ${requiredMessage}`),
        phone: Yup
            .string()
            .matches(numRegExp, {
                message: `El número de teléfono debe contener unicamente números`,
                excludeEmptyString: false
            })
            .min(8, 'El teléfono debe tener 8 números como mínimo')
            .required(`El teléfono ${requiredMessage}`),
        message: Yup
            .string()
            .required(`El mensaje ${requiredMessage}`)
        })
)