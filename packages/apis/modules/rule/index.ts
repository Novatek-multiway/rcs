import { request } from "../../request";
import { IResponse } from "../../type";

/**
 * Fetches the layout from the server.
 *
 * @returns Promise of the layout object.
 */
export const GetRules = (data: Record<string, any>) => {
  return request<IResponse<any>>("/Rule/GetRules", {
    method: "GET",
    params: data,
  });
};

export const DelRule = (data: Record<string, any>) => {
  return request<IResponse<any>>("/Rule/DelRule", {
    method: "DELETE",
    params: data,
  });
};

export const AddRule = (data: Record<string, any>) => {
  return request<IResponse<any>>("/Rule/AddRule", {
    method: "POST",
    data,
  });
};

export const UpdateRule = (data: Record<string, any>) => {
  return request<IResponse<any>>("/Rule/UpdateRule", {
    method: "POST",
    data,
  });
};

export const GetRuleChassisInfos = (data: Record<string, any>) => {
  return request<IResponse<any>>("/Carrier/GetChassisInfos", {
    method: "GET",
    params: data,
  });
};

export const GetRuleControlStates = (data: Record<string, any> = { ID: 0 }) => {
  return request<IResponse<any>>("/Carrier/GetControlStates", {
    method: "GET",
    params: data,
  });
};

export const GetRuleChargingPiles = (data?: Record<string, any>) => {
  return request<IResponse<any>>("/Rule/GetChargingPile", {
    method: "GET",
    params: data,
  });
};
