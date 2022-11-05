import './styles.css';

const Thanks = ({message="Muchas gracias! 💓"}) => {
    return(
        <div className='overlay'>
            <div className='text'>{message}</div>
        </div>
    );
}

export default Thanks;