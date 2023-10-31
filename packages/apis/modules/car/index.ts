import { request } from "../../request";
import { IResponse } from "../../type";

/**
 * Fetches the layout from the server.
 *
 * @returns Promise of the layout object.
 */
export const postGetControlStates = (data: Record<string, any>) => {
  return request<IResponse<any>>("/Carrier/GetControlStates", {
    method: "GET",
    data,
  });
};

export const postGetControlOptions = (data: Record<string, any>) => {
  return request<IResponse<any>>("/Carrier/GetCarrierOptions", {
    method: "POST",
    data,
  });
};

export const getGetDictInfo = (data: string)=>{
  return request<IResponse<any>>(`/Dict/GetDictInfo?DictName=${data}`, {
    method: "GET",
  });
}

// 激活车辆的接口
export const getSimulationCarrierLogin = (key: string)=>{
  return request<IResponse<any>>(`/Simulation/SimulationCarrierLogin?key=${key}`, {
    method: "GET",
  });
}

export const postRemoveCarrier = (data: Record<string, any>) => {
  return request<IResponse<any>>("/Carrier/RemoveCarrier", {
    method: "POST",
    data,
  });
};

// 锁车 0锁车 1解锁
export const postUpdateCarrierState = (data: Record<string, any>) => {
  return request<IResponse<any>>("/Carrier/UpdateCarrierState", {
    method: "POST",
    data,
  });
};

// 急停 0急停 1解除
export const postSendRemoteStop = (data: Record<string, any>) => {
  return request<IResponse<any>>("/Carrier/SendRemoteStop", {
    method: "POST",
    data,
  });
};


// 创建车辆 /Carrier/CreateCarrier
export const postCreateCarrier = (data: Record<string, any>) => {
  return request<IResponse<any>>("/Carrier/CreateCarrier", {
    method: "POST",
    data,
  });
};

// 创建车辆 /Carrier/CreateCarrier
export const postGetCarrierInfo = (id: string) => {
  return request<IResponse<any>>(`/Carrier/GetCarrierInfo?id=${id}`, {
    method: "GET",
  });
};

export const postUpdateCarrier = (data: Record<string, any>) => {
  return request<IResponse<any>>("/Carrier/UpdateCarrier", {
    method: "POST",
    data,
  });
};


export const delCreateCarrier = (key: string) => {
  return request<IResponse<any>>(`/Carrier/DeleteCarrier?id=${key}`, {
    method: "DELETE",
  });
};






