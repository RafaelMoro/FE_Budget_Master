import {
  Collapse, List, ListItemButton, ListItemText,
} from '@mui/material';

interface SubcategoriesListDialogProps {
  openList: boolean;
  subCategories: string[];
}

const SubcategoriesListDialog = ({ openList, subCategories }: SubcategoriesListDialogProps) => (
  <Collapse in={openList} timeout="auto" unmountOnExit>
    <List component="div" disablePadding>
      { subCategories.map((subcategory) => (
        <ListItemButton key={subcategory} sx={{ pl: 4 }}>
          <ListItemText primary={subcategory} />
        </ListItemButton>
      ))}
    </List>
  </Collapse>
);

export { SubcategoriesListDialog };
