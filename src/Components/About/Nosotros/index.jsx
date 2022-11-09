import Title from "../../Title/Title"
import Styles from './nosotros.module.css'

const Nosotros = () => {

    const textoParaMostrar = 'Sobre Nosotros';

    return (
        <>
            <Title title="Nostros" />
            <p className={Styles.sobre_nosotros}>{textoParaMostrar}</p>
        </>
    )

}

export default Nosotros;