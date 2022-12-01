import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiONG } from "../../Services/apiONG";
import DetailCard from "../Card/DetailCard/DetailCard";
import { errorAlert } from "../Feedback/AlertService";
import { Spinner } from "../Feedback/Spinner/Spinner";

import Title from "../Title/Title";

const ActivitiesDetail = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    apiONG
      .get("/activities/" + id)
      .then((response) => {
        setActivity(response.data.data);
      })
      .catch((error) => {
        errorAlert();
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  return (
    <div>
      <Title title={activity.name} />
      {isLoading ? (
        <div className="container-fluid mt-5 d-flex justify-content-center align-items-center">
          <Spinner />
        </div>
      ) : (
        <DetailCard
          content={activity.description}
          date={activity.created_at}
          color="primary"
          buttonLabel="Volver a actividades"
          imageUrl={activity.image}
          imageAlt={activity.name}
          onClick={() => {
            navigate("/actividades");
          }}
        />
      )}
    </div>
  );
};

export default ActivitiesDetail;
