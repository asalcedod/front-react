import axios from "axios";
import { enviroment } from "./enviroment";

const getProducts = async () => {
  return await axios
    .get(enviroment() + "products")
    .then((response) => {
      return response;
    })
    .catch((error) => {
        return {fail: true, error};
    });
};

export { getProducts };
