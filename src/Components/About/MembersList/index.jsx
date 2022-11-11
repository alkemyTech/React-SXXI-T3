import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Card from "../Card";
import Loading from '../Loading';

import Swal from 'sweetalert2';

import { apiONG } from '../../../Services/apiONG';

import s from './listado.module.css';

const MembersList = () => {

    const [members, setMembers] = useState(null);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        apiONG
            .get(`/members`)
            .then(({ data: { data } }) => {
                setMembers(() => (data))
                setIsFetching(() => (false))
            })
            .catch((error) => {
                setIsFetching(() => (false))
                const errorMessage =
                    error?.response?.data?.message
                    || error.message;
                Swal.fire({
                    title: errorMessage,
                    icon: 'error',
                    timer: 5000
                })
            })
    }, [])

    return (
        <section>
            <div className={s.card_container}>
                {
                    isFetching
                        ? <Loading />
                        : members
                            ? members.map((member) => (
                                <Card key={uuidv4()} {...member} />
                            ))
                            : (
                                <h1 style={{ height: '400px' }}>
                                    La organización aún no tiene miembros
                                </h1>
                            )
                }
            </div>
        </section>
    )
};

export default MembersList;