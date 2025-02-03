import { useState, useEffect } from 'react';
import {
  Typography, List,
} from '@mui/material';
import { CategoryUI } from '../../../globalInterface';
import { useCategories } from '../../../hooks';
import { CategoriesListDialog } from './CategoriesListDialog';

const ShowCategories = () => {
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
    <List
      sx={{
        width: '100%', maxWidth: 360, bgcolor: 'background.paper', justifySelf: 'center',
      }}
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
  );
};

export { ShowCategories };
