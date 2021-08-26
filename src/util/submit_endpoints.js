import axios from "axios";
import { enviroment } from "./enviroment";

const getSubmits = async () => {
  return await axios
    .get(enviroment() + "submits")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return { fail: true, error };
    });
};

export { getSubmits };
