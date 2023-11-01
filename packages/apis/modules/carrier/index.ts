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

export const delChassisInfos = (data: Record<string, any>) => {
  return request<IResponse<any>>("/Carrier/DelChassisInfo", {
    method: "POST",
    params: data,
  });
};

export const CreateChassisInfos = (data: Record<string, any>) => {
  return request<IResponse<any>>("/Carrier/CreateChassis", {
    method: "POST",
    data,
  });
};

export const UpdateChassisInfos = (data: Record<string, any>) => {
  return request<IResponse<any>>("/Carrier/ModifyChassis", {
    method: "POST",
    data,
  });
};
