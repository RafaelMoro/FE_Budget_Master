import { ReactElement, useState } from 'react';
import { useAppSelector } from '../../../redux/hooks';
import { useCreateCategoryMutation } from '../../../redux/slices/Categories/categories.api';
import {
  CategoryTemplateProps,
  CreateCategoryBEValues, CreateCategoryMutationProps, CreateCategoryTemplateProps, ManageCategoriesValues,
} from './CategoryDialog.interface';
import { ERROR_MESSAGE_CREATE_CATEGORY_TITLE, ERROR_MESSAGE_GENERAL } from '../../../constants';

const withCreateCategory = (CategoryTemplate: ({
  initialValues, subcategories, isLoading, isSuccess, goBackAction, updateCategories, updateCategoryName, handleSubmit,
}: CategoryTemplateProps) => ReactElement) => function CreateCategoryTemplate({
  goBackAction, updateError,
}: CreateCategoryTemplateProps) {
  const userReduxState = useAppSelector((state) => state.user);
  const bearerToken = userReduxState.userInfo?.bearerToken as string;
  const [createCategoryMutation, { isLoading, isSuccess }] = useCreateCategoryMutation();

  const [categoryName, setCategoryName] = useState<string>('');
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const initialValues: ManageCategoriesValues = {
    categoryName,
    subcategories,
  };

  const updateCategoryName = (newCategoryName: string) => setCategoryName(newCategoryName);
  const updateCategories = (newCategories: string[]) => setSubcategories(newCategories);

  const handleSubmit = async (values: ManageCategoriesValues) => {
    try {
      const valuesToSubmit: CreateCategoryBEValues = {
        categoryName: values.categoryName,
        subCategories: values.subcategories,
      };
      const createCategoryMutationValues: CreateCategoryMutationProps = { values: valuesToSubmit, bearerToken };
      await createCategoryMutation(createCategoryMutationValues).unwrap();
      setTimeout(() => {
        goBackAction();
      }, 2000);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('err', err);
      // show error notification
      updateError({ newTitle: ERROR_MESSAGE_CREATE_CATEGORY_TITLE, newDescription: ERROR_MESSAGE_GENERAL });
      goBackAction();
    }
  };

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

export { withCreateCategory };
