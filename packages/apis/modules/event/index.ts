import { request } from "../../request";
import { IResponse } from "../../type";

export const GetEventsPageList = (data = { ID: 0 }) => {
  return request<IResponse<any>>("/Event/GetEventsPageList", {
    method: "POST",
    data,
  });
};
export const AddEvent = (data: Record<string, any>) => {
  return request<IResponse<any>>("/Event/AddEvent", {
    method: "POST",
    data,
  });
};
