import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Card from "../Card";

import { apiONG } from "../../../Services/apiONG";

import { Spinner } from "../../Feedback/Spinner/Spinner";
import s from "./listado.module.css";
import { errorAlert } from '../../Feedback/AlertService';



const MembersList = () => {
  const [members, setMembers] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    apiONG
      .get(`/members/`)
      .then(({ data: { data } }) => {
        setMembers(() => data);
        setIsFetching(() => false);
      })
      .catch((error) => {
        setIsFetching(() => false);
        errorAlert();
      });
  }, []);

  return (
    <section>
      <div className={s.card_container}>
        {isFetching ? (
          <Spinner />
        ) : members ? (
          members.map((member) => <Card key={uuidv4()} {...member} />)
        ) : (
          <h1 style={{ height: "400px" }}>
            La organización aún no tiene miembros
          </h1>
        )}
      </div>
    </section>
  );
};

export default MembersList;
