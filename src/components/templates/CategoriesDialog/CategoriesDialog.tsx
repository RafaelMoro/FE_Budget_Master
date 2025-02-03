import { useState, useEffect } from 'react';
import {
  Dialog, IconButton, Typography, List,
} from '@mui/material';

import { useCategories } from '../../../hooks';
import { CategoryUI } from '../../../globalInterface';
import { AppIcon } from '../../UI/Icons';
import { CategoriesListDialog } from './CategoriesListDialog';

interface CategoriesModalProps {
  open: boolean
  onClose: () => void
}

const CategoriesDialog = ({ open, onClose }: CategoriesModalProps) => {
  const {
    currentData, isError, isFetching, isSuccess,
  } = useCategories();
  const [categories, setCategories] = useState<CategoryUI[]>([]);

  useEffect(() => {
    if (isSuccess && currentData) {
      const newCategories: CategoryUI[] = currentData?.map((category) => ({
        category: category.categoryName,
        categoryId: category._id,
        subcategories: category.subCategories,
      }));
      setCategories(newCategories);
    }
  }, [currentData, isSuccess]);

  return (
    <Dialog onClose={onClose} open={open}>
      <IconButton onClick={onClose}>
        <AppIcon icon="Close" />
      </IconButton>
      <Typography>Categorías</Typography>
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-categories"
      >
        {
          (categories.length === 0 && isFetching) && (
            <Typography>Cargando categorías</Typography>
          )
        }
        {
          (categories.length === 0 && isError) && (
            <Typography>Error al cargar categorías</Typography>
          )
        }
        {
          (categories.length > 0) && categories.map(({ category, subcategories, categoryId }) => (
            <CategoriesListDialog key={categoryId} subCategories={subcategories} categoryName={category} />
          ))
        }
      </List>
    </Dialog>
  );
};

export { CategoriesDialog };
