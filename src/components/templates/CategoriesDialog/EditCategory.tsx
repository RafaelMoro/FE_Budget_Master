import { Formik, Field } from 'formik';
import { EditCategoryProps } from './CategoryDialog.interface';
import { LoadingSpinner } from '../../UI/LoadingSpinner';
import {
  CancelButton, FlexContainer, InputForm, PrimaryButton,
} from '../../../styles';

const EditCategory = ({ categoryToEdit }: EditCategoryProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars, @typescript-eslint/no-explicit-any
  const handleSubmit = (values: any) => {};
  const loading = false;
  const disableSubmitButton = false;

  return (
    <Formik
      initialValues={{ something: '' }}
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
