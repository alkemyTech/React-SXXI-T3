import { useEffect, useState } from "react";
import { getComments } from "../../../src/Services/commentServices/commentService";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import "../Comments/Comments.css";
import { apiONG } from "../../Services/apiONG/index";
import { imgRegExp } from "../../utils/validation/constants";
import imgNotFound from "../../assets/images/backoffice-logos/users.jpg";
const CommentsDetails = ({ idNews }) => {
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState([]);
  const [userPatch, setUserPatch] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  useEffect(() => {
    getComments().then((comments) => {
      setComment(comments);
    });
  }, []);
  useEffect(() => {
    apiONG
      .get(`/users`)
      .then((response) => {
        const user = response.data.data;
        setUserPatch(user);
      })
      .catch((error) => {});
  }, []);
  const commentsAux = [];
  const userId = [];
  for (let i = 0; i < comment.length; i++) {
    if (comment[i].new_id === Number(idNews)) {
      commentsAux.push(comment[i]);
      if (userId.includes(Number(comment[i].user_id))) {
      } else {
        let id_user = comment[i].user_id;
        let userAux = userPatch.find((user_id) => user_id.id === id_user);
        userId.push(userAux);
      }
    }
  }
  if (loading) {
    return (
      <>
        <div className="contenedorList">
          <div className="contenedor">
            <ul className="nav">
              <li className="">
                <h4 className="reviews">
                  <strong>Comentarios {commentsAux.length}</strong>
                </h4>
              </li>
              <li>
                <a href="#add-comment" role="tab" data-toggle="tab">
                  <h4 className="reviews">
                    <strong>Agregar comentario</strong>
                  </h4>
                </a>
              </li>
            </ul>
          </div>
        </div>
        {commentsAux.length > 0 &&
          commentsAux.map((comentario, index) => {
            return (
              <Stack spacing={1} key={index}>
                <div className="container w-100 pb-5">
                  <div className="row mt-5 p-3">
                    <div className="col-sm-12">
                      <div className="h-75" id="card">
                        <Skeleton variant="circular" width={200} height={200} />
                        <div
                          className=" p-3 card m-2 bg-light"
                          id="contenidoBody"
                        >
                          <div className="  contenidoNombreFecha">
                            <h5 className="h5 g-color-gray-dark-v1 mb-0">
                              <strong>
                                <Skeleton
                                  variant="text"
                                  sx={{ fontSize: "1rem" }}
                                  width={200}
                                  height={60}
                                />
                              </strong>
                            </h5>
                            <span className="text-muted ">
                              <Skeleton
                                variant="text"
                                sx={{ fontSize: "1rem" }}
                                width={100}
                                height={60}
                              />
                            </span>
                          </div>
                          <div className="contenidoComentario">
                            <p className="">
                              <Skeleton
                                variant="text"
                                sx={{ fontSize: "1rem" }}
                                width={200}
                                height={60}
                              />
                            </p>
                            <button type="button" className="btn btn-primary">
                              Responder
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Stack>
            );
          })}
      </>
    );
  } else {
    return (
      <>
        <div className="contenedorList">
          <div className="contenedor">
            <ul className="nav">
              <li className="active">
                <h4 className="reviews text-capitalize">
                  <strong>Comentarios {commentsAux.length}</strong>
                </h4>
              </li>
              <li>
                <a href="#add-comment" role="tab" data-toggle="tab">
                  <h4 className="reviews text-capitalize">
                    <strong>Agregar comentario</strong>
                  </h4>
                </a>
              </li>
            </ul>
          </div>
        </div>
        {commentsAux.length > 0 &&
          commentsAux.map((comentario, index) => {
            return (
              <div className="container w-100 pb-5" key={index}>
                <div className="row mt-5 p-3">
                  <div className="col-sm-12">
                    <div className="" id="card">
                      <img
                        id="img"
                        className="rounded-circle d-flex rounded-circle"
                        src={
                          imgRegExp.exec(comentario.image) === null
                            ? imgNotFound
                            : comentario.image
                        }
                        alt=""
                      />
                      <div className=" p-3 card m-2  " id="contenidoBody">
                        <div className="contenidoNombreFecha">
                          <h5 className="h5 g-color-gray-dark-v1 mb-0">
                            {userId.map((user, index) => {
                              return (
                                  <strong key={index}>
                                    {comentario.user_id===user.id
                                    ? user.name :
                                    ""
                                    }
                                  </strong>
                              );
                            })}
                          </h5>
                          <span className="text-muted ">
                            {comentario.updated_at.slice(0, 10)}
                          </span>
                        </div>
                        <div className="contenidoComentario">
                          <p className="">{comentario.text}</p>
                          <button type="button" className="btn btn-primary">
                            Responder
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </>
    );
  }
};

export default CommentsDetails;
