import DeleteIcon from "@mui/icons-material/Delete";
import {
  bindMenu,
  bindTrigger,
  usePopupState,
} from "material-ui-popup-state/hooks";
import * as React from "react";
import { Box, Button, Menu } from "ui";
interface Props {
  delFn: () => void;
}
const DelButton = (props: Props) => {
  const { delFn } = props;
  const popupState = usePopupState({ variant: "popover", popupId: "demoMenu" });
  return (
    <div>
      <Button
        component="label"
        size="small"
        startIcon={<DeleteIcon />}
        {...bindTrigger(popupState)}
      >
        删除
      </Button>
      <Menu {...bindMenu(popupState)} id="demoMenu">
        <Box sx={{ display: "flex", px: 2, gridGap: 10 }}>
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={async () => {
              await delFn();
              popupState.close();
            }}
          >
            确定
          </Button>
          <Button size="small" variant="outlined" onClick={popupState.close}>
            取消
          </Button>
        </Box>
      </Menu>
    </div>
  );
};

export default DelButton;
