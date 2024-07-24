import { ReactNode } from 'react';
import { AnimateBox } from '../../../animations';

interface ResultFormAnimatedProps {
  direction: number;
  counterView: number;
  // It's the order of the view to be displayed
  order: number;
  isError: boolean;
  onError: () => ReactNode;
  onSuccess: () => ReactNode;
}

const ResultFormAnimated = ({
  direction, counterView, order, isError, onError, onSuccess,
}: ResultFormAnimatedProps) => {
  if (counterView !== order) return null;
  return (
    <AnimateBox direction={direction}>
      {isError && onError()}
      {!isError && onSuccess()}
    </AnimateBox>
  );
};

export { ResultFormAnimated };
