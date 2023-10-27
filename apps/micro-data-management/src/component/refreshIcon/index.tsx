import { StyledComponent } from "@emotion/styled";
import RefreshIcon from "@mui/icons-material/Refresh";
import { FC } from "react";
import { Box, BoxProps, ButtonBaseProps, styled } from "ui";
interface RefreshProps extends ButtonBaseProps {
  loading?: boolean;
}

const IconRefresh: StyledComponent<BoxProps & { loading?: boolean }> = styled(
  (props: BoxProps & { loading?: boolean }) => <Box {...props} />
)(({ loading }) => ({
  display: "flex",
  animation: loading ? "rotate 1s linear infinite" : "none",
  "@keyframes rotate": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
}));

const Refresh: FC<RefreshProps> = (props) => {
  const { loading } = props;
  return (
    <IconRefresh loading={loading}>
      <RefreshIcon />
    </IconRefresh>
  );
};

export default Refresh;
