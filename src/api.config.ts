import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
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
