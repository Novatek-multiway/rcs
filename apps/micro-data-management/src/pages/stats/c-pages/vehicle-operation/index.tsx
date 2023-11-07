import type { FC, ReactNode } from "react";
import React, { memo } from "react";
import { BaseForm } from "ui";

interface IProps {
  children?: ReactNode;
}

const VehicleOperation: FC<IProps> = () => {
  return (
    <>
      <BaseForm
        schemaObject={[
          {
            name: "AreaName",
            label: "区域名称",
            helperText: "区域名称",
          },
          {
            name: "AreaName1",
            label: "区域名称",
            helperText: "区域名称",
          },
        ]}
      ></BaseForm>
    </>
  );
};

export default memo(VehicleOperation);
