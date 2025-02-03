import {
  Collapse, List, ListItemButton, ListItemText, IconButton,
} from '@mui/material';
import { AppIcon } from '../../UI/Icons';
import { AppColors, FlexContainer } from '../../../styles';

interface SubcategoriesListDialogProps {
  openList: boolean;
  categoryName: string;
  subCategories: string[];
}

const SubcategoriesListDialog = ({ openList, subCategories, categoryName }: SubcategoriesListDialogProps) => {
  const handleEdit = () => {};
  const handleDelete = () => {};

  return (
    <Collapse in={openList} timeout="auto" unmountOnExit>
      <FlexContainer gap={2} justifyContent="center">
        <IconButton aria-label={`boton-editar-categoria-${categoryName}`} onClick={handleEdit}>
          <AppIcon icon="Edit" fillColor={AppColors.primary} />
        </IconButton>
        <IconButton aria-label={`boton-eliminar-categoria-${categoryName}`} onClick={handleDelete}>
          <AppIcon icon="Delete" fillColor={AppColors.negative} />
        </IconButton>
      </FlexContainer>
      <List component="div" disablePadding>
        { subCategories.map((subcategory) => (
          <ListItemButton key={subcategory} sx={{ pl: 4 }}>
            <ListItemText primary={subcategory} />
          </ListItemButton>
        ))}
      </List>
    </Collapse>
  );
};

export { SubcategoriesListDialog };
