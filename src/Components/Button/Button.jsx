import './Button.css'

const Button = ({
                    variant = "", className = "", label = "", onClick = () => {
    }
                }) =>
    <button className={`button ${variant} ${className}`} onClick={onClick}>{label}</button>

export default Button;