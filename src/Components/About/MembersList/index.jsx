import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Card from "../Card";
import { Spinner } from "../../Feedback/Spinner/Spinner";
import { errorAlert } from "../../Feedback/AlertService";
import { apiMember } from "../../../Services/apiService";

import s from "./listado.module.css";

const MembersList = () => {
  const [members, setMembers] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
      apiMember
          .getAll()
          .then((response) => {
              setMembers(response);
          })
          .catch((error) => {
              errorAlert();
          })
          .finally(()=> setIsFetching(false));
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
