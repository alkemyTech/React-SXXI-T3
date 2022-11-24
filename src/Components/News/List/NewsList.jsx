import { useEffect, useState } from "react";
import debounce from 'lodash.debounce';

import Title from "../../Title/Title";
import { ListCard } from "../../Card/ListCard/ListCard";
import { getNews } from "../../../Services/newsService/newsService";

import "../../CardListStyles.css";
import SearchInput from "../../SearchInput";

const NewsList = () => {
    const [news, setNews] = useState([]);
    const [search, setSearch] = useState('');
    useEffect(() => {
        getNews()
            .then((response) => {
                setNews(response);
            });
    }, []);

    const handleChange = debounce((event) => {
        const { value } = event.target;
        const cleanValue = value.trim()
        setSearch(() => (value))
        if (cleanValue.length >= 3) {
            getNews(cleanValue)
                .then(response => {
                    setNews(() => (response))
                })
        }
    }, 1000)

    const handleSubmit = (event) => {
        event.preventDefault();
        getNews(search)
            .then(response => {
                setNews(response)
            })
    }

    return (
        <div className="container">
            <div className="row">
                <Title title="Novedades" />
            </div>

            <SearchInput
                placeholder={'Buscar por título'}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />

            <div className="list-container mt-3 row ">
                {news.length > 0 ? (
                    news.map((element) => {
                        return (
                            <ListCard
                                variant='tertiary'
                                id={element.id}
                                name={element.name}
                                content={element.content}
                                image={element.image}
                                buttonLabel="Ver novedad"
                                key={element.id}
                            />
                        );
                    })
                ) : (
                    <div className="container m-5">
                        <p className="text-center fs-3">No hay novedades para mostrar...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewsList;

