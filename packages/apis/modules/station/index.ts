import { request } from "../../request";
import { IResponse } from "../../type";

/**
 * Fetches the layout from the server.
 *
 * @returns Promise of the layout object.
 */
export const getStationInfos = (data: Record<string, any>) => {
  return request<IResponse<any>>("/Map/GetStationInfos", {
    method: "GET",
    params: data,
  });
};

export const delStationInfos = (data: Record<string, any>) => {
  return request<IResponse<any>>("/Map/DelStationInfo", {
    method: "POST",
    params: data,
  });
};

export const CreateStationInfos = (data: Record<string, any>) => {
  return request<IResponse<any>>("/Map/CreateStation", {
    method: "POST",
    data,
  });
};

export const UpdateStationInfos = (data: Record<string, any>) => {
  return request<IResponse<any>>("/Map/ModifyStation", {
    method: "POST",
    data,
  });
};