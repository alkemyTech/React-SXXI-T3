import styles from "./Field.module.css";
import {Field} from "./Field";
import {forwardRef} from "react";

export const InputField = forwardRef(
  (
    {
      value,
      label,
      name,
      onChange,
      onBlur,
      placeholder,
      errors,
      touched,
      type = "text",
      disabled = false,
      className = "",
      labelClassName = "",
      inputClassName = "",
      errorsClassName = "",
      ...props
    },
    ref
  ) => {
    return (
      <Field
        label={label}
        name={name}
        touched={touched}
        className={className}
        errorClassName={errorsClassName}
        labelClassName={labelClassName}
        errors={errors}
      >
        <input
          id={`input-${name}`}
          className={`${styles.input}  ${
            errors && touched ? styles.error : ""
          } ${inputClassName}`}
          type={type}
          name={name}
          value={value}
          onChange={(val) => onChange(val)}
          onBlur={(val) => onBlur(val)}
          placeholder={placeholder}
          disabled={disabled}
          ref={ref}
          {...props}
        />
      </Field>
    );
  }
);
