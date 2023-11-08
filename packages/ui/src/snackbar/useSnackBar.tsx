import { VariantType, useSnackbar } from "notistack";

interface IAlert {
  variant: VariantType;
  message: string;
}

export const useAlert = () => {
  const { enqueueSnackbar } = useSnackbar();
  const Alert = ({ variant, message }: IAlert) => {
    enqueueSnackbar(message, { variant });
  };

  return Alert;
};
