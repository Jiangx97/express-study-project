import axios from "./request";

const home = () => {
  return axios.get("/home-info");
};

export { home };
