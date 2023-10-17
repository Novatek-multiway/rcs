import LoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton'
import { styled } from '@mui/material'

const StyledLoadingButton = styled(LoadingButton)<LoadingButtonProps>(({ theme }) => ({}))

const LoadingButtonComponent = (props: LoadingButtonProps) => {
  return <StyledLoadingButton {...props} />
}

export default LoadingButtonComponent
