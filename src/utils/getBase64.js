export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    let baseURL = "";
    let reader = new FileReader();
    reader.onload = () => {
      baseURL = reader.result;
      resolve(baseURL);
    };
    reader.onerror = () => {
      reject({
        message: "Ocurrió un error mientras se procesaba la imagen",
      });
    };
    reader.readAsDataURL(file);
  });
