import styles from "./Field.module.css";
import {Field} from "./Field";
import React from "react";

export const SelectField = (
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
            optionsList = [],
            ...props
        }
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
                <select
                    id={`input-${name}`}
                    className={`${styles.input}  ${errors && touched ? styles.error : ""} ${inputClassName}`}
                    name={name}
                    value={value}
                    onChange={(val) => onChange(val)}
                    onBlur={(val) => onBlur(val)}
                    placeholder={placeholder}
                    disabled={disabled}
                    {...props}
                >
                    <option value="">Seleccione una opción</option>
                    {optionsList.map((x) => {
                        return (
                            <option value={x.value} key={x.value}>
                                {x.label}
                            </option>
                        )
                    })}
                </select>
            </Field>
        );
    }
);