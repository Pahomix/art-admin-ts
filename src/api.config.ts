import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

const setAuthToken = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = token;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

const token = localStorage.getItem('token');
if (token) {
  setAuthToken(token);
}

// Экспортируем axiosInstance для использования в других частях приложения
export default axiosInstance;
