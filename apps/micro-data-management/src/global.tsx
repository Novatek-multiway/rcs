import { useRequest } from "ahooks";
import { getDicts } from "apis";
import { useDictStore } from "store";

const GlobalContext = () => {
  const { setDicts } = useDictStore();
  useRequest(() => getDicts({ DictName: "CarrierType" }), {
    onSuccess: (res) => {
      if (res.data) {
        setDicts(res.data);
      }
    },
  });
  return null;
};

export default GlobalContext;
