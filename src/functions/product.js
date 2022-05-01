import axios from "axios";

export const getProducts = async () =>
  await axios.get(`${process.env.REACT_APP_API}/amiibo/`);

  export const getProductsById = async (id) =>
  await axios.get(`${process.env.REACT_APP_API}/amiibo/?id=${id}`);
