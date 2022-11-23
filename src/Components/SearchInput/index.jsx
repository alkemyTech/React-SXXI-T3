import SelectInput from '../SelectInput';

import s from './searchInput.module.css';

const SearchInput = (props) => {
    const {
        handleChange,
        handleSubmit,
        hasOptions,
        handleSelectChange,
        placeholder,
        source,
    } = props;

    return (
        <div className={s['search-input-container']}>
            <form className={s['search-form']} onSubmit={handleSubmit}>
                <div className={s['search-submit-container']}>
                    <input
                        type={'text'}
                        placeholder={placeholder}
                        onChange={handleChange}
                        className={s['search-input']}
                    />
                    <input
                        type="submit"
                        value={'🔍'}
                        className={s['search-submit-btn']}
                    />
                </div>
                {
                    hasOptions
                        ? <SelectInput
                            source={source}
                            handleSelectChange={handleSelectChange}
                        />
                        : null
                }
            </form>
        </div>
    )
}

export default SearchInput;