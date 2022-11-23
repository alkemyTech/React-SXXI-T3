import s from './searchInput.module.css';

const SearchInput = ({ handleChange, handleSubmit }) => {
    return (
        <div className={s['search-input-container']}>
            <form onSubmit={handleSubmit}>
                <input
                    type={'text'}
                    onChange={handleChange}
                    className={s['search-input']}
                />
                <input
                    type="submit"
                    value={'🔍'}
                    className={s['search-submit-btn']}
                />
            </form>
        </div>
    )
}

export default SearchInput;