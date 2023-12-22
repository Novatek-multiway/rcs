import { SnackbarProvider, useSnackbar } from "notistack";
import SnackBarContext from "./SnackBarContext";
const AlertProvider = ({ children }: any) => {
  return (
    <SnackBarContext.Provider
      value={{
        useSnackbar,
      }}
    >
      <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>
    </SnackBarContext.Provider>
  );
};
export default AlertProvider;
