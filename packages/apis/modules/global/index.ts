import { request } from "../../request";
import { IResponse } from "../../type";
import { Login } from "./type";

interface LoginParams {
  userName: string;
  passWord: string;
  jwtToken?: string;
  refreshToken?: string;
  hash?: string;
  code?: string;
  uuid?: string;
}

/**
 * Fetches the layout from the server.
 *
 * @returns Promise of the layout object.
 */
export const postLogin = (data: LoginParams) => {
  return request<IResponse<Login>>("/api/User/Login", {
    method: "POST",
    data,
  });
};

export * from "./type.d";
// export type { Layout };
