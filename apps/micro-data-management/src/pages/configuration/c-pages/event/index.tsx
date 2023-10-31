import type { FC, ReactNode } from "react";
import React, { memo } from "react";
import { Button, FormikContext, MaterialForm } from "ui";

interface IProps {
  children?: ReactNode;
}

// 事件配置
const Event: FC<IProps> = () => {
  const formRef = React.useRef<FormikContext>(null);
  return (
    <div>
      <MaterialForm
        ref={formRef}
        schemaObject={[
          {
            name: "AreaName",
            label: "指定车辆",
            type: "select",
            multiple: true,
            items: [
              {
                value: "AreaName1",
                label: "任务点",
              },
              {
                value: "AreaName2",
                label: "任务点1",
              },
            ],
          },
          {
            name: "AreaName1",
            label: "任务点",
            type: "checkbox",
          },
          {
            name: "AreaName2",
            label: "动作类型",
            type: "text",
          },
          // {
          //   name: "AreaName3",
          //   label: "参数1",
          // },
          // {
          //   name: "AreaName4",
          //   label: "参数2",
          // },
          // {
          //   name: "AreaName5",
          //   label: "扩展参数",
          // },
          // {
          //   name: "AreaName6",
          //   label: "执行次数",
          // },
          // {
          //   name: "AreaName7",
          //   label: "自动结束",
          // },
        ]}
      ></MaterialForm>
      <Button onClick={() => formRef.current?.submitForm()}>提交</Button>
    </div>
  );
};

export default memo(Event);
