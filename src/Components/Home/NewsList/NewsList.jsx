import styles from './NewsList.module.css';
import {Link} from "react-router-dom";
import {ListCard} from "../../Card/ListCard/ListCard";

const NewsList = ({newsList}) => {
    return (
        <>
            <div className={styles.newsHeader}>
                <h3 className="">Últimas novedades</h3>
                <Link to="/novedades"><small>ver mas...</small></Link>
            </div>
            <div className={styles.newsContainer}>
                {newsList.map((news) => {
                        return (
                            <ListCard buttonLabel="Ver novedad" variant='tertiary' id={news.id} name={news.name}
                                      image={news.image} content={news.content} key={news.id}
                                      linkTo={`/novedades/${news.id}`}/>)
                    }
                )}
            </div>
        </>
    )
}

export default NewsList;
