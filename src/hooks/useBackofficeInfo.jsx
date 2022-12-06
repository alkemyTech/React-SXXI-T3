import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { apiONG } from "../Services/apiONG";

export const useBackofficeInfo = (path) => {
  const [refresh, setRefresh] = useState(false);
  const [route, setRoute] = useState(path);
  const [info, setInfo] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    apiONG
      .get(`/${route}`)
      .then(({ data: { data } }) => {
        setIsFetching(() => false);
        setInfo(() => data);
      })
      .catch((error) => {
        const errorMessage = error?.response?.data?.message || error.message;
        setIsFetching(() => false);
        Swal.fire({
          title: errorMessage,
          icon: "error",
          timer: 5000,
        });
      });
  }, [route]);

  useEffect(() => {
    refresh && apiONG
      .get(`/${route}`)
      .then(({ data: { data } }) => {
        setIsFetching(() => false);
        setInfo(() => data);
      })
      .catch((error) => {
        const errorMessage = error?.response?.data?.message || error.message;
        setIsFetching(() => false);
        Swal.fire({
          title: errorMessage,
          icon: "error",
          timer: 5000,
        });
      })
      .finally(() => setRefresh(() => (false)))
  });

  return [info, isFetching, setRoute, setRefresh];
};
