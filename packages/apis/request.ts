import { extend } from "umi-request";
import { useGlobalStore } from "store";

interface RCSResponse extends Omit<Response, "status"> {
  code: number;
}

//全局请求参数设置
export const request = extend({
  timeout: 10000,
  baseURL: "http://192.168.1.240:5202",
});

request.interceptors.request.use((url, options) => {
  const headers: any = options.headers;
  headers["Authorization"] = useGlobalStore.getState().userInfo.jwtToken;
  return {
    url,
    options: {
      ...options,
      headers,
    },
  };
});

request.interceptors.response.use(async (response) => {
  const { status } = response;
  if (status === 200) {
    const data = await response.clone().json();
    return data;
  }
  return response;
});
