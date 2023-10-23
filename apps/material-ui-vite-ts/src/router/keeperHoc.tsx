import { Suspense, ReactNode } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Backdrop, useTheme } from "ui";
/**
 * 预留组件，为后续统一处理路由模块准备
 *
 * @param {string} name - The name of the keeper.
 * @param {ReactNode} children - The children elements to render.
 * @returns {ReactNode} - The rendered children elements.
 */
function Keeper({ name, children }: { name: string; children: ReactNode }) {
  const theme = useTheme();
  return (
    <Suspense
      fallback={
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      }
    >
      {children}
    </Suspense>
  );
}

export default function KeeperHoc(
  name: string,
  Component: ReactNode
): ReactNode {
  return (
    <Keeper key={name} name={name}>
      {Component}
    </Keeper>
  );
}
