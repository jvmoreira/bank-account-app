import axios, { AxiosResponse, AxiosStatic } from 'axios';

declare global {
  interface Window {
    axios: AxiosStatic;
  }
}

export function setupAxios(): void {
  window.axios = axios;

  window.axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;
  // window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
  window.axios.defaults.headers.common['Accept'] = 'application/json';
  window.axios.defaults.headers.common['Content-Type'] = 'application/json';
  window.axios.interceptors.response.use(
    (response: AxiosResponse) => { return response },
    (error) => { return Promise.reject(error) }
  );

  const Authorization = localStorage.getItem("Authorization");

  if(Authorization)
    axios.defaults.headers.common['Authorization'] = `Bearer ${Authorization}`;
}
