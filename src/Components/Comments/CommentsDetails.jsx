import { useEffect, useState } from "react";
import { getComments } from "../../../src/Services/commentServices/commentService";
import ComponenteSkeleton from "../Comments/ComponenteSkeleton";
import { imgRegExp } from "../../utils/validation/constants";
import imgNotFound from "../../assets/images/backoffice-logos/users.jpg";
import "../Comments/Comments.css";
const CommentsDetails = ({ idNews }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);
  const [comment, setComment] = useState([]);
  useEffect(() => {
    getComments().then((comments) => {
      setComment(comments);
    });
  }, []);
  const commentsAux = [];
  comment.forEach((comment, index) => {
    if (comment.new_id === Number(idNews) && comment !== undefined) {
      commentsAux.push(comment);
    }
  });
  return (
    <>
      <div className="contenedorList">
        <div className="contenedor">
          <ul className="nav">
            <li className="active">
              <h4 className="reviews text-capitalize ">
                <strong className="m-1">
                  {" "}
                  Comentarios {commentsAux.length}
                </strong>
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
      {loading
        ? commentsAux.map((comments, index) => {
            return <ComponenteSkeleton key={index} />;
          })
        : commentsAux.map((comentario, index) => {
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
};

export default CommentsDetails;
