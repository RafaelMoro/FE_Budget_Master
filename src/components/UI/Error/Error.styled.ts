import styled from '@emotion/styled';
import { MessageContainerProps } from './Error.interface';

export const MessageContainer = styled.div`
  display: flex;
  ${({ minHeight }: MessageContainerProps) => (minHeight && `min-height: ${minHeight};`)}
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;
