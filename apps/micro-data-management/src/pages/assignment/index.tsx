import { useAsyncEffect, useRequest } from "ahooks";
import { postGTaskList } from "apis";
import type { FC, ReactNode } from "react";
import React, { memo, useState } from "react";

interface IProps {
  children?: ReactNode;
}

// 任务管理
const Assignment: FC<IProps> = () => {
  const { runAsync } = useRequest(postGTaskList, {
    manual: true,
  });

  // const [page, setPage] = useState({
  //   pageIndex: 1,
  //   pageSize: 10,
  // });
  const [, setTableData] = useState([]);

  useAsyncEffect(async () => {
    const res = await runAsync({
      pageNum: 1,
      pageSize: 10,
    });
    if (res) {
      setTableData(res.data.data);
    }
  }, []);

  return <div>Assignment</div>;
};

export default memo(Assignment);
