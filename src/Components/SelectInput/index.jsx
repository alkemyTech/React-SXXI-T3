import { useSelectInput } from './Hook';
import s from './selectInput.module.css';

const SelectInput = ({ source, handleSelectChange }) => {

    const { options } = useSelectInput(source);

    return (
        <select
            className={s["search-options"]}
            onChange={handleSelectChange}
        >
            {
                options
                    ? options.map((option) => (
                        <option
                            key={option.role || option.id}
                            value={option.role || option.name}
                        >{option.name}</option>
                    ))
                    : null
            }
        </select>
    )
}

export default SelectInput;