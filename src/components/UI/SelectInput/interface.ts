import { ReactNode } from 'react';
import { TextColors, BackgroundColors } from '../../../styles/interface';

export interface SelectAccount {
  _id: string;
  title: string;
}

export interface SelectInputProps {
  labelId: string;
  labelName: string | ReactNode;
  fieldName: string;
  stringOptions: string[];
  dataTestId: string;
  colorOptions?: TextColors[] | BackgroundColors[];
  selectInputColors?: boolean;
  disabled?: boolean;
  onClickCb?: () => void;
}

export interface SelectInputDynamicProps {
  backgroundColor: string;
}
