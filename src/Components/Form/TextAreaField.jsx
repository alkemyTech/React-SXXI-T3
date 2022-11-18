import {Field} from "./Field";
import styles from "./Field.module.css";

export const TextAreaField = ({
                                  value,
                                  label,
                                  name,
                                  onChange,
                                  onBlur,
                                  placeholder,
                                  errors,
                                  touched,
                                  disabled = false,
                                  className = "",
                                  labelClassName = "",
                                  inputClassName = "",
                                  errorsClassName = "",
                                  ...props
                              }) => {
    return (
        <Field label={label} name={name} touched={touched} className={className} errorClassName={errorsClassName}
               labelClassName={labelClassName} errors={errors}>
        <textarea
            id={`input-${name}`}
            className={`${styles.input}  ${(errors && touched) ? styles.error : ''} ${inputClassName}`}
            name="name"
            value={value}
            onChange={(val) => onChange(val)}
            onBlur={(val) => onBlur(val)}
            placeholder={placeholder}
            disabled={disabled}
            {...props}
        />
        </Field>
    )

}