import { ReactElement, useEffect, useState } from 'react';
import { useAppSelector } from '../../../redux/hooks';
import { useEditCategoryMutation } from '../../../redux/slices/Categories/categories.api';
import {
  CategoryTemplateProps,
  EditCategoryBEValues, EditCategoryTemplateProps, ManageCategoriesValues, ModifyCategoryMutationProps,
} from './CategoryDialog.interface';
import { ERROR_MESSAGE_EDIT_CATEGORY, ERROR_MESSAGE_GENERAL } from '../../../constants';

const withEditCategory = (CategoryTemplate: ({
  initialValues, subcategories, isLoading, isSuccess, goBackAction, updateCategories, updateCategoryName, handleSubmit,
}: CategoryTemplateProps) => ReactElement) => function EditCategoryTemplate({
  categoryToEdit, goBackAction, updateError,
}: EditCategoryTemplateProps) {
  const userReduxState = useAppSelector((state) => state.user);
  const bearerToken = userReduxState.userInfo?.bearerToken as string;
  const [editCategoryMutation, { isLoading, isSuccess }] = useEditCategoryMutation();

  const [categoryName, setCategoryName] = useState<string>(categoryToEdit?.category ?? '');
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const initialValues: ManageCategoriesValues = {
    categoryName,
    subcategories,
  };
  const updateCategoryName = (newCategoryName: string) => setCategoryName(newCategoryName);
  const updateCategories = (newCategories: string[]) => setSubcategories(newCategories);

  const handleSubmit = async (values: ManageCategoriesValues) => {
    try {
      const valuesToSubmit: EditCategoryBEValues = {
        categoryName: values.categoryName,
        subCategories: values.subcategories,
        categoryId: categoryToEdit?.categoryId ?? '',
      };
      const editCategoryMutationValues: ModifyCategoryMutationProps = { values: valuesToSubmit, bearerToken };
      await editCategoryMutation(editCategoryMutationValues).unwrap();
      setTimeout(() => {
        goBackAction();
      }, 2000);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('err', err);
      // show error notification
      updateError({ newTitle: ERROR_MESSAGE_EDIT_CATEGORY, newDescription: ERROR_MESSAGE_GENERAL });
      goBackAction();
    }
  };

  useEffect(() => {
    if (categoryToEdit && categoryToEdit.subcategories) {
      setSubcategories(categoryToEdit.subcategories);
    }
  }, [categoryToEdit]);

  return (
    <CategoryTemplate
      initialValues={initialValues}
      subcategories={subcategories}
      isLoading={isLoading}
      isSuccess={isSuccess}
      goBackAction={goBackAction}
      updateCategories={updateCategories}
      updateCategoryName={updateCategoryName}
      handleSubmit={handleSubmit}
    />
  );
};

export { withEditCategory };
