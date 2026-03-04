import axios from "axios";
import { toast } from "react-toastify";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
console.log("ENV BaseUrl", baseUrl);
const setupAxios = () => {
  const fallbackBaseUrl = "http://localhost:5001";
  axios.defaults.baseURL = baseUrl || fallbackBaseUrl;
  axios.defaults.headers.post["Content-Type"] = "application/json";
  axios.interceptors.request.use(
    (config) => {
      try {
        const userInfo = localStorage.getItem("userInfo");
        if (userInfo) {
          const { accessToken } = JSON.parse(userInfo);
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
      } catch (error) {
        console.error("Error to parse userInfo from localStorage", error);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
  axios.interceptors.response.use(
    ({ data }) => {
      return data;
    },
    (error) => {
      console.log("Axios config error", error);
      console.log("error.response", error.response);
      //   console.log("error.message", error.message);
      const message =
        error?.response?.data && error.response?.data?.message
          ? error?.response?.data?.message
          : error.message;
      console.log("message=>", message);
      const isLoginUrl =
        error.response?.config?.url?.includes("/api/v1/auth/login");
      console.log("isLoginUrl", isLoginUrl);
      if (error.response && error.response.status === 401 && !isLoginUrl) {
        toast.error("session expired or invalid. Please login again", {
          draggable: true,
          pauseOnHover: true,
        });
        localStorage.removeItem("userInfo");
        if (!window.location.pathname.includes("/login")) {
          setTimeout(() => {
            window.location.href = "/login";
          }, 3000); // Small delay to let toast show
        }
      } else if (error.response && error.response.status === 429) {
        toast.warning(message || "Too many requests. Please try again later", {
          draggable: true,
          pauseOnHover: true,
          duration: 5000,
        });
      } else {
        // alert(message);
        toast.error(message || "An error occurred");
      }
      return Promise.reject(error);
    },
  );
};

export default setupAxios;
