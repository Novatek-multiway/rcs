import { StyledContentWrapper } from './StyledContentWrapper'

interface ILayoutContentProps {
  children: React.ReactNode
}

export const ContentWrapper: React.FC<ILayoutContentProps> = ({ children }) => {
  return <StyledContentWrapper>{children}</StyledContentWrapper>
}
