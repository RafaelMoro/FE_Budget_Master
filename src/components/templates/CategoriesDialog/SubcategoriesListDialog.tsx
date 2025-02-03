import {
  Collapse, List, ListItemButton, ListItemText,
} from '@mui/material';

const SubcategoriesListDialog = ({ openList }: { openList: boolean }) => (
  <Collapse in={openList} timeout="auto" unmountOnExit>
    <List component="div" disablePadding>
      <ListItemButton sx={{ pl: 4 }}>
        <ListItemText primary="Subcategoria 1" />
      </ListItemButton>
    </List>
  </Collapse>
);

export { SubcategoriesListDialog };
