import {
  RadioGroup, Radio, FormControlLabel, FormControlLabelProps, useRadioGroup,
} from '@mui/material';
import { ICONS_MATERIAL } from '../../UI/Icons/Icons.constants';
import { SelectIcon } from '../../UI/Icons/SelectIcon';

function MyFormControlLabel(props: FormControlLabelProps) {
  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    // eslint-disable-next-line react/destructuring-assignment
    checked = radioGroup.value === props.value;
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <FormControlLabel checked={checked} {...props} />;
}

const SelectCategoryIcon = () => (
  <div>
    <RadioGroup name="use-radio-group" defaultValue="first">
      { Object.keys(ICONS_MATERIAL).map((iconName) => (
        <MyFormControlLabel
          key={iconName}
          value={iconName}
          label={<SelectIcon name={iconName} />}
          control={<Radio />}
        />
      )) }
    </RadioGroup>
  </div>
);

export { SelectCategoryIcon };
