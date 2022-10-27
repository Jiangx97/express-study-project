import axios from "./request";
import CryptoJS from "crypto-js";

const login = ({ account = "", pwd = "", role = "" }) => {
  console.log(account, pwd, role);
  // Encrypt 加密
  pwd = CryptoJS.AES.encrypt(pwd, "secret key 666").toString();
  return axios.post("/login", { account, pwd, role });
};

export { login };
