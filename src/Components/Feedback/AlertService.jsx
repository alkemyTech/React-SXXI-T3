import Swal from "sweetalert2";

const capitalize = (string) => {
  return string?.charAt(0).toUpperCase() + string?.slice(1);
};

export const infoAlert = (title = 'OK', description = '', timer, bar) => {

  title = capitalize(title.trim());
  description = capitalize(description.trim());

  Swal.fire({
    title: title,
    html: description,
    icon: "success",
    timer,
    timerProgressBar: bar || false,
  });
};

export const errorAlert = (title = "Ocurrió un error", description = "Por favor, intenta más tarde...", timer, bar) => {

  title = capitalize(title?.trim());
  description = capitalize(description?.trim());

  Swal.fire({
    title: title,
    html: description,
    icon: "error",
    timer,
    timerProgressBar: bar || false,
  });
};

export const confirmAlert = (question, description, action, cancelled) => {

  question = capitalize(question.trim());
  description = capitalize(description.trim());

  Swal.fire({
    icon: "warning",
    title: question,
    text: description,
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: "Confirmar",
    denyButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      action();
    } else if (result.isDenied) {
      cancelled();
    }
  });
};
