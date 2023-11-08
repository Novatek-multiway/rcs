import { request } from "../../request";
import { IResponse } from "../../type";

export const GetMapOptionPageList = (data = { id: 0 }) => {
  return request<IResponse<any>>("/Map/GetMapOptionPageList", {
    method: "POST",
    data,
  });
};

export const DeleteRouteFileInfo = (data: Record<string, any>) => {
  return request<IResponse<any>>("/Map/DeleteRouteFileInfo", {
    method: "POST",
    data,
  });
};

export const ChangeActive = (data: Record<string, any>) => {
  return request<IResponse<any>>("/Map/ChangeActive", {
    method: "POST",
    data,
  });
};

export const GetRouteFileInfo = (data: Record<string, any>) => {
  return request<IResponse<any>>("/Map/GetRouteFileInfo", {
    method: "POST",
    data,
  });
};

export const WriteRouteFileInfo = (data: Record<string, any>) => {
  return request<IResponse<any>>("/Map/WriteRouteFileInfo", {
    method: "POST",
    data,
  });
};

export const UpdateRouteFileInfo = (data: Record<string, any>) => {
  return request<IResponse<any>>("/Map/UpdateRouteFileInfo", {
    method: "POST",
    data,
  });
};

export const GetSvgMapNameList = () => {
  return request<IResponse<any>>("/Map/GetSvgMapNameList", {
    method: "get",
  });
};

export const GetDxfMapNameList = () =>
  request<IResponse<any>>("/Map/GetDxfMapNameList", {
    method: "get",
  });
