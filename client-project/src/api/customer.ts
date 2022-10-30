import axios from "./request";

import CryptoJS from "crypto-js";

const queryCustomer = ({
  page = 0,
  size = 10,
  customerAccount = "",
  customerGender = "",
  isValid = "",
}) => {
  return axios.get("/users", {
    params: {
      page,
      size,
      customerAccount,
      customerGender,
      isValid,
    },
  });
};

const addCustomer = ({
  customerAccount,
  customerName,
  customerGender,
  customerPwd,
}: any) => {
  // Encrypt 加密
  customerPwd = CryptoJS.AES.encrypt(customerPwd, "secret key 666").toString();

  return axios.post("/customer", {
    customerAccount,
    customerName,
    customerGender,
    customerPwd,
  });
};

const validCustomer = ({ customerId, isValid }: any) => {
  return axios.post(`/customer/${customerId}`, {
    isValid,
  });
};

const queryCustomerById = (customerId: any) => {
  return axios.get(`/customer/${customerId}`);
};

const updateCustomer = ({
  customerId,
  customerAccount,
  customerName,
  customerGender,
}: any) => {
  return axios.put(`/customer/${customerId}`, {
    customerAccount,
    customerName,
    customerGender,
  });
};

export {
  queryCustomer,
  addCustomer,
  validCustomer,
  queryCustomerById,
  updateCustomer,
};
