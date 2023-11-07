import { extend } from "umi-request";
import { notification } from "antd";

interface RCSResponse extends Omit<Response, "status"> {
  code: number;
}


export { notification }

//全局请求参数设置
export const request = extend({
  timeout: 10000,
  // 记得区分开发环境与生产环境
  prefix: "/api",
});

request.interceptors.request.use((url, options) => {
  const userInfo = localStorage.getItem("userInfo");
  const headers: any = options.headers;
  headers["Authorization"] = JSON.parse(userInfo || "{}").jwtToken;
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
  const data = await response.clone().json();

  notification.error({
    message: `Error ${status}`,
    description: data.title,
  });
  return response;
});
