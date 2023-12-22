import { useRequest } from "ahooks";
import { GetDxfMapNameList, GetSvgMapNameList } from "apis";
import { dictsTransform } from "utils";

const useMapHooks = () => {
  const { data: dxfList } = useRequest(GetDxfMapNameList);
  const { data: svgList } = useRequest(GetSvgMapNameList);
  return {
    dxfList: dictsTransform(dxfList?.data, "label", "id"),
    svgList: dictsTransform(svgList?.data, "label", "id"),
  };
};

export default useMapHooks;
