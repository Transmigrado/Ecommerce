import axios from "axios";

let REACT_APP_API='https://www.amiiboapi.com/api/'

export const getProducts = async () =>
  await axios.get(`${REACT_APP_API}/amiibo/`);

  export const getProductsById = async (id) =>
  await axios.get(`${REACT_APP_API}/amiibo/?id=${id}`);
