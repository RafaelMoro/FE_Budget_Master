import { ReactNode } from 'react';
import { Typography } from '@mui/material';

import { MessageContainer } from './Error.styled';
import { AppIcon } from '../Icons';

interface ErrorProps {
  title?: string;
  description: string;
  children?: ReactNode;
  hideIcon?: boolean;
  minHeight?: string;
}

const Error = ({
  title, description, children, minHeight, hideIcon = false,
}: ErrorProps) => (
  <MessageContainer minHeight={minHeight}>
    { !hideIcon && (<AppIcon icon="Error" size="4.5rem" />) }
    { title && (<Typography>{title}</Typography>) }
    <Typography>{description}</Typography>
    { children }
  </MessageContainer>
);

export { Error };
