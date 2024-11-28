import axios from "axios";
import qs from "qs";
import Authentication from "../../../services/authentication";

let auth;

const buildHeaders = () => {
//   if (!auth) {
//     auth = new Authentication();
//   }

//   const authenticated = auth.isAuthenticated();
//   if (authenticated) {
//     const token = auth.getAccessToken();
//     return {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json;charset=UTF-8",
//     };
//   } else {
//     return {};
//   }
// };

const baseRequest = (url, options = {}) => {
  const { headers = {}, method = "get", ...opts } = options;

  return axios(url, {
    method: method,
    headers: { ...buildHeaders(), ...headers },
    ...opts,
    paramsSerializer: function (params) {
      return qs.stringify(params, { encode: false, arrayFormat: "indices" });
    },
  });
};

export const baseRequestWithFormData = (url, formData, options = {}) => {
  const { headers = {}, ...opts } = options;
  const method = options.method || "get";

  return axios[method](url, formData, {
    headers: { ...buildHeaders(), ...headers },
    ...opts,
  });
};

export default baseRequest;