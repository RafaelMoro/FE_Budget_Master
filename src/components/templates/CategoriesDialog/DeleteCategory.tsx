import { useState } from 'react';
import { ERROR_MESSAGE_DELETE_CATEGORY, ERROR_MESSAGE_GENERAL, WARNING_MESSAGE_DELETE_CATEGORY } from '../../../constants';
import { useAppSelector } from '../../../redux/hooks';
import { useDeleteCategoryMutation } from '../../../redux/slices/Categories/categories.api';
import {
  AppColors, CancelButton, FlexContainer, SecondaryButton,
} from '../../../styles';
import { AlertMessageSection } from '../../UI';
import { AppIcon } from '../../UI/Icons';
import { LoadingSpinner } from '../../UI/LoadingSpinner';
import { DeleteCategoryBEValues, DeleteCategoryMutationProps, DeleteCategoryProps } from './CategoryDialog.interface';

const DeleteCategory = ({ categoryToDelete, goBackAction, updateError }: DeleteCategoryProps) => {
  const userReduxState = useAppSelector((state) => state.user);
  const bearerToken = userReduxState.userInfo?.bearerToken as string;
  const [editCategoryMutation, { isLoading, isSuccess }] = useDeleteCategoryMutation();
  const [closeAlert, setCloseAlert] = useState(true);

  const handleSubmit = async () => {
    try {
      const values: DeleteCategoryBEValues = { categoryId: categoryToDelete ?? '' };
      const valuesToSubmit: DeleteCategoryMutationProps = { values, bearerToken };
      await editCategoryMutation(valuesToSubmit).unwrap();
      setTimeout(() => {
        goBackAction();
      }, 2000);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('error while deleting category', err);
      updateError({ newTitle: ERROR_MESSAGE_DELETE_CATEGORY, newDescription: ERROR_MESSAGE_GENERAL });
      goBackAction();
    }
  };

  return (
    <>
      { closeAlert && (<AlertMessageSection state="warning" description={WARNING_MESSAGE_DELETE_CATEGORY} onClose={() => setCloseAlert(false)} />)}
      <FlexContainer justifyContent="space-between">
        <SecondaryButton onClick={goBackAction}>Cancelar</SecondaryButton>
        <CancelButton onClick={handleSubmit}>
          { (isLoading && !isSuccess) && (<LoadingSpinner />) }
          { (!isLoading && isSuccess) && (<AppIcon icon="TickMark" fillColor={AppColors.white} />) }
          { (!isLoading && !isSuccess) && 'Eliminar' }
        </CancelButton>
      </FlexContainer>
    </>
  );
};

export { DeleteCategory };
