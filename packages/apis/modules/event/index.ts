import { request } from "../../request";
import { IResponse } from "../../type";

export const GetEventsPageList = (data = { ID: 0 }) => {
  return request<IResponse<any>>("/Event/GetEventsPageList", {
    method: "POST",
    data,
  });
};
