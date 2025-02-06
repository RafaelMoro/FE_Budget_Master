import { CancelButton, FlexContainer, SecondaryButton } from '../../../styles';
import { DeleteCategoryProps } from './CategoryDialog.interface';

const DeleteCategory = ({ categoryToDelete, goBackAction }: DeleteCategoryProps) => {
  const handleSubmit = () => {};

  return (
    <FlexContainer justifyContent="space-between">
      <SecondaryButton onClick={goBackAction}>Cancelar</SecondaryButton>
      <CancelButton onClick={handleSubmit}>Eliminar</CancelButton>
    </FlexContainer>
  );
};

export { DeleteCategory };
