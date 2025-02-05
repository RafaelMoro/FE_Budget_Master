import { useEffect, useState } from 'react';
import { Formik, Field } from 'formik';
import { EditCategoryProps, EditCategoryValues } from './CategoryDialog.interface';
import { LoadingSpinner } from '../../UI/LoadingSpinner';
import {
  CancelButton, InputForm, LongChip, PrimaryButton,
} from '../../../styles';
import {
  EditCategoryButtonContainer, EditCategoryContainer, SubcategoriesContainerChips, SubcategoryTitle,
} from './CategoriesDialog.styled';
import { AddSubcategory } from './AddSubcategory';

const EditCategory = ({ categoryToEdit, goBackAction }: EditCategoryProps) => {
  const initialValues: EditCategoryValues = {
    categoryName: categoryToEdit?.category ?? '',
    subcategories: categoryToEdit?.subcategories ?? [],
  };
  const [subcategories, setSubcategories] = useState<string[]>([]);

  const handleSubmit = (values: EditCategoryValues) => {};
  const loading = false;
  const disableSubmitButton = false;

  const handleDeleteSubcategory = (subcategoryToDelete: string) => {
    const filteredSubcategories = subcategories.filter((subcategory) => subcategory !== subcategoryToDelete);
    setSubcategories(filteredSubcategories);
  };
  const addSubcategory = (subcategory: string) => {
    const newSubcategories = [...subcategories, subcategory];
    setSubcategories(newSubcategories);
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
        <EditCategoryContainer>
          <Field
            component={InputForm}
            fullWidth
            name="categoryName"
            type="text"
            variant="standard"
            label="Título de la categoría"
          />
          <AddSubcategory addSubcategory={addSubcategory} />
          <SubcategoryTitle>Subcategorías:</SubcategoryTitle>
          {
            subcategories.length > 0 && (
              <SubcategoriesContainerChips>
                { subcategories.map((subcategory) => (
                  <LongChip
                    key={subcategory}
                    label={subcategory}
                    variant="outlined"
                    color="primary"
                    onDelete={() => handleDeleteSubcategory(subcategory)}
                  />
                ))}
              </SubcategoriesContainerChips>
            )
          }
          <EditCategoryButtonContainer>
            <CancelButton onClick={goBackAction}>
              Cancelar
            </CancelButton>
            <PrimaryButton disabled={disableSubmitButton} variant="contained" onClick={submitForm} size="medium">
              { loading ? (<LoadingSpinner />) : 'Editar' }
            </PrimaryButton>
          </EditCategoryButtonContainer>
        </EditCategoryContainer>
      )}
    </Formik>
  );
};

export { EditCategory };
