import { Field, Formik } from 'formik';
import { InputForm, SecondaryButton } from '../../../styles';
import { AddSubcategorySchema } from '../../../validationsSchemas/categories.schema';

const AddSubcategory = () => {
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  const handleSubmit = (values: any) => {};
  return (
    <Formik
      initialValues={{ subcategories: '' }}
      onSubmit={(values) => handleSubmit(values)}
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
            label="Agregar subcategoría"
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
