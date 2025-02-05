import { useEffect, useState } from 'react';
import { Formik, Field } from 'formik';

import {
  EditCategoryBEValues, EditCategoryProps, EditCategoryValues, ModifyCategoryMutationProps,
} from './CategoryDialog.interface';
import { EditCategorySchema } from '../../../validationsSchemas/categories.schema';
import { useEditCategoryMutation } from '../../../redux/slices/Categories/categories.api';
import { LoadingSpinner } from '../../UI/LoadingSpinner';
import { AddSubcategory } from './AddSubcategory';
import {
  AppColors,
  CancelButton, ErrorParagraphValidation, InputForm, LongChip, PrimaryButton,
} from '../../../styles';
import {
  EditCategoryButtonContainer, EditCategoryContainer, SubcategoriesContainerChips, SubcategoryTitle,
} from './CategoriesDialog.styled';
import { AppIcon } from '../../UI/Icons';
import { useAppSelector } from '../../../redux/hooks';
import { ERROR_MESSAGE_EDIT_CATEGORY, ERROR_MESSAGE_GENERAL } from '../../../constants';

const EditCategory = ({
  categoryToEdit, goBackAction, updateError,
}: EditCategoryProps) => {
  const userReduxState = useAppSelector((state) => state.user);
  const bearerToken = userReduxState.userInfo?.bearerToken as string;
  const [editCategoryMutation, { isLoading, isSuccess }] = useEditCategoryMutation();
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const initialValues: EditCategoryValues = {
    categoryName: categoryToEdit?.category ?? '',
    subcategories,
  };

  const handleSubmit = async (values: EditCategoryValues) => {
    try {
      const valuesToSubmit: EditCategoryBEValues = { ...values, categoryId: categoryToEdit?.categoryId ?? '' };
      const editCategoryMutationValues: ModifyCategoryMutationProps = { values: valuesToSubmit, bearerToken };
      await editCategoryMutation(editCategoryMutationValues).unwrap();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('err', err);
      // show error notification
      updateError({ newTitle: ERROR_MESSAGE_EDIT_CATEGORY, newDescription: ERROR_MESSAGE_GENERAL });
      goBackAction();
    }
  };
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
      validationSchema={EditCategorySchema}
      onSubmit={(values) => handleSubmit(values)}
      enableReinitialize
      validateOnMount
    >
      {({ submitForm, errors, touched }) => (
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
          { (touched.subcategories && errors.subcategories) && (
            <ErrorParagraphValidation variant="subText">{errors.subcategories}</ErrorParagraphValidation>
          ) }
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
              { (isLoading && !isSuccess) && (<LoadingSpinner />) }
              { (!isLoading && isSuccess) && (<AppIcon icon="TickMark" fillColor={AppColors.white} />) }
              { (!isLoading && !isSuccess) && 'Editar' }
            </PrimaryButton>
          </EditCategoryButtonContainer>
        </EditCategoryContainer>
      )}
    </Formik>
  );
};

export { EditCategory };
