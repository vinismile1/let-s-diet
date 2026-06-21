// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5000",
// });

// // Attach token automatically
// api.interceptors.request.use((config) => {
//   const userToken = localStorage.getItem("token");
//   const adminToken = localStorage.getItem("adminToken");

//   if (userToken) {
//     config.headers.Authorization = `Bearer ${userToken}`;
//   }

//   if (adminToken) {
//     config.headers.Authorization = `Bearer ${adminToken}`;
//   }

//   return config;
// });

// // Auto logout on token expiry
// api.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     if (err.response?.status === 401) {
//       localStorage.removeItem("token");
//       localStorage.removeItem("adminToken");
//       window.location.href = "/login";
//     }
//     return Promise.reject(err);
//   }
// );

// export default api;


import axios from "axios";

const api = axios.create({
  baseURL: "https://let-s-diet-production.up.railway.app",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;