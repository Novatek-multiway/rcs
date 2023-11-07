import { request } from "../../request";
import { IResponse } from "../../type";

/**
 * Fetches the layout from the server.
 *
 * @returns Promise of the layout object.
 */
export const postGTaskList = (data: Record<string, any>) => {
  return request<IResponse<any>>("/Job/GetTaskGInfos", {
    method: "POST",
    data,
  });
};
