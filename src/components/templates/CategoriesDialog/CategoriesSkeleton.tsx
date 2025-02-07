import { ExpandMore } from '@mui/icons-material';
import { ListItemButton } from '@mui/material';

import { CategoriesSkeletonContainer, ContentPlaceholder } from './CategoriesDialog.styled';
import { ICON_SIZE } from '../../../constants';

const CategoriesSkeleton = () => (
  <CategoriesSkeletonContainer data-testid="show-categories-loading-skeleton" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <ListItemButton disabled>
      <ContentPlaceholder />
      <ExpandMore sx={ICON_SIZE} />
    </ListItemButton>
  </CategoriesSkeletonContainer>
);

export { CategoriesSkeleton };
