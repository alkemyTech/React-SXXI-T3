import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
function ComponenteSkeleton() {
  return (
    <Stack spacing={1}>
      <div className="container w-100 pb-5">
        <div className="row mt-5 p-3">
          <div className="col-sm-12">
            <div className="h-75" id="card">
              <Skeleton variant="circular" width={200} height={200} />
              <div className=" p-3 card m-2 bg-light" id="contenidoBody">
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
}
export default ComponenteSkeleton;
