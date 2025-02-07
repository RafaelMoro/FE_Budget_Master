import { ICONS_MATERIAL } from '../../UI/Icons/Icons.constants';
import { SelectIcon } from '../../UI/Icons/SelectIcon';

const SelectCategoryIcon = () => (
  <div>
    { Object.keys(ICONS_MATERIAL).map((iconName) => (
      <SelectIcon key={iconName} name={iconName} />
    )) }
  </div>
);

export { SelectCategoryIcon };
