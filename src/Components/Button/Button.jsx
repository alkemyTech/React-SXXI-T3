import './Button.css'

const Button = ({
                    variant = "", className = "", label = "", type = "button", ...props
                }) =>
    <button className={`button ${variant} ${className}`} type={type} {...props}>{label}</button>

export default Button;