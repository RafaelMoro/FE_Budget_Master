import { Progress, ProgressLabel, ProgressLabelContainer } from '../../Budget.styled';

const ProgressBudget = ({ progress, currentAmountFormatted }: { progress: number, currentAmountFormatted: string }) => {
  const hasProgressMedium = progress > 40;
  const hasProgressHigh = progress > 85;

  return (
    <>
      <Progress hasProgressHigh={hasProgressHigh} hasProgressMedium={hasProgressMedium} variant="determinate" value={progress} />
      <ProgressLabelContainer>
        <ProgressLabel hasProgressHigh={hasProgressHigh} hasProgressMedium={hasProgressMedium}>{currentAmountFormatted}</ProgressLabel>
        <ProgressLabel hasProgressHigh={hasProgressHigh} hasProgressMedium={hasProgressMedium}>
          {progress}
          %
        </ProgressLabel>
      </ProgressLabelContainer>
    </>
  );
};

export { ProgressBudget };
