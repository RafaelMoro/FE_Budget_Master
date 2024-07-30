import { Typography } from '@mui/material';
import { AnimateBox } from '../../../animations';
import { FlexContainer } from '../../../styles';
import { HorizontalLoader } from '../../UI/HorizontalLoader';

interface LoadingFormAnimatedProps {
  counterView: number;
  // It's the order of the view to be displayed
  order: number;
  direction: number;
  text: string;
}

// This component is used when we use AnimateBox and direction in a form and we want to display loading state
const LoadingFormAnimated = ({
  counterView, direction, text, order,
}: LoadingFormAnimatedProps) => {
  // If the counterView is different from the order, we don't show the component
  if (counterView !== order) return null;
  return (
    <AnimateBox direction={direction}>
      <FlexContainer flexDirection="column" alignItems="center" gap={3}>
        <HorizontalLoader />
        <Typography>{text}</Typography>
      </FlexContainer>
    </AnimateBox>
  );
};

export { LoadingFormAnimated };
