import { Field, Formik } from 'formik';
import { InputForm, SecondaryButton } from '../../../styles';
import { AddSubcategorySchema } from '../../../validationsSchemas/categories.schema';
import { AddSubcategoryProps, AddSubcategoryValues } from './CategoryDialog.interface';

const AddSubcategory = ({ addSubcategory }: AddSubcategoryProps) => {
  const initialValues: AddSubcategoryValues = {
    subcategory: '',
  };

  const handleSubmit = (values: AddSubcategoryValues) => {
    const { subcategory } = values;
    addSubcategory(subcategory);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        handleSubmit(values);
        actions.setFieldValue('subcategory', '');
        actions.setFieldTouched('subcategory', false);
        actions.setSubmitting(false);
      }}
      validationSchema={AddSubcategorySchema}
      validateOnMount
    >
      {({ submitForm }) => (
        <>
          <Field
            component={InputForm}
            fullWidth
            name="subcategory"
            type="text"
            variant="standard"
            label="Subcategoría"
          />
          <SecondaryButton variant="contained" onClick={submitForm} size="medium">
            Agregar subcategoría
          </SecondaryButton>
        </>
      )}
    </Formik>
  );
};

export { AddSubcategory };
