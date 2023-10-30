import { request } from "../../request";
import { IResponse } from "../../type";

/**
 * Fetches the layout from the server.
 *
 * @returns Promise of the layout object.
 */
export const getChassisInfos = (data: Record<string, any>) => {
  return request<IResponse<any>>("/Carrier/GetChassisInfos", {
    method: "GET",
    params: data,
  });
};
