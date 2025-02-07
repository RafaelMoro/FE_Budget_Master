import { Typography } from '@mui/material';
import { AppColors } from '../../../styles';
import { DEFAULT_SIZE, ICONS_MATERIAL } from './Icons.constants';
import { SelectIconProps } from './Icons.interface';

const SelectIcon = ({ name, size = DEFAULT_SIZE, fillColor = AppColors.bgColorDark }: SelectIconProps) => {
  const IconComponent = ICONS_MATERIAL[name];

  if (!IconComponent) {
    return <Typography>Icon not found</Typography>;
  }

  return <IconComponent sx={{ fontSize: size, fill: fillColor }} />;
};

export { SelectIcon };
