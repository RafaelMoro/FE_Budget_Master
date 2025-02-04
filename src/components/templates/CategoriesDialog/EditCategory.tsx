import { useEffect, useState } from 'react';
import { Formik, Field } from 'formik';
import { Typography } from '@mui/material';
import { EditCategoryProps } from './CategoryDialog.interface';
import { LoadingSpinner } from '../../UI/LoadingSpinner';
import {
  CancelButton, Chip, FlexContainer, InputForm, PrimaryButton,
} from '../../../styles';

const EditCategory = ({ categoryToEdit }: EditCategoryProps) => {
  const initialValues = {
    categoryName: categoryToEdit?.category ?? '',
    subcategories: categoryToEdit?.subcategories ?? [],
  };
  const [subcategories, setSubcategories] = useState<string[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars, @typescript-eslint/no-explicit-any
  const handleSubmit = (values: any) => {};
  const loading = false;
  const disableSubmitButton = false;

  const handleDeleteSubcategory = (subcategoryToDelete: string) => {
    const filteredSubcategories = subcategories.filter((subcategory) => subcategory !== subcategoryToDelete);
    setSubcategories(filteredSubcategories);
  };

  useEffect(() => {
    if (categoryToEdit && categoryToEdit.subcategories) {
      setSubcategories(categoryToEdit.subcategories);
    }
  }, [categoryToEdit]);

  return (
    <Formik
      initialValues={initialValues}
  // validationSchema={CreateAccountSchema}
      onSubmit={(values) => handleSubmit(values)}
      validateOnMount
    >
      {({ submitForm }) => (
        <FlexContainer gap={3} flexDirection="column" alignItems="center">
          <Field
            component={InputForm}
            name="categoryName"
            type="text"
            variant="standard"
            label="Título de la categoría"
          />
          <Typography>Subcategorías:</Typography>
          {
            subcategories.length > 0 && subcategories.map((subcategory) => (
              <div key={subcategory}>
                <Chip label={subcategory} variant="outlined" color="primary" onDelete={() => handleDeleteSubcategory('ejemplo')} />
              </div>
            ))
          }
          <CancelButton>
            Cancelar
          </CancelButton>
          <PrimaryButton disabled={disableSubmitButton} variant="contained" onClick={submitForm} size="medium">
            { loading ? (<LoadingSpinner />) : 'Editar' }
          </PrimaryButton>
        </FlexContainer>
      )}
    </Formik>
  );
};

export { EditCategory };
