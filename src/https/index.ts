import axios, { AxiosRequestConfig } from "axios";
const http = axios.create({
  baseURL: `${process.env.VUE_APP_API_URL}`,
});

http.interceptors.request.use(async (config) => {
  const { useUserStore } = await import("@/stores/user");
  const auth = useUserStore();
  const token = auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use(
  (l) => l,
  async (error) => {
    if (error.response && error.response.status === 401) {
      const { useUserStore } = await import("@/stores/user");
      const auth = useUserStore();
      auth.logout();
      const { useRouter } = await import("vue-router");
      const router = useRouter();
      router.push("/login");
    }
    return Promise.reject(error);
  }
);

const http2 = axios.create({
  baseURL: `${process.env.VUE_APP_API_URL_BAUTH}auth/`,
});
class AxiosCall {
  async axiosCall(config: AxiosRequestConfig) {
    const { data } = await http2.request(config);
    return data;
  }
  async axiosCall2(config: AxiosRequestConfig) {
    const { data } = await http.request(config);
    return data;
  }
}
export { AxiosCall };
