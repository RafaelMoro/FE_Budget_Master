import { ReactElement } from 'react';
import { Formik, Field } from 'formik';

import { IResetPasswordValues } from './interface';
import {
  Main, MainContainer, FormTitle, FormDescription, FormContainer,
} from '../../styles/LoginModule.styled';
import { ResetPasswordSchema } from '../../validationsSchemas/login.schema';
import { PrimaryButton, InputForm } from '../../styles';

const ResetPassword = (): ReactElement => {
  const handleSubmit = (values: IResetPasswordValues) => {
    // eslint-disable-next-line no-console
    console.log(values);
  };
  return (
    <Main>
      <MainContainer>
        <FormTitle>Reset Password</FormTitle>
        <FormDescription>
          Enter your new password in the fields below:
        </FormDescription>
        <Formik
          initialValues={{ password: '', confirmPassword: '' }}
          validationSchema={ResetPasswordSchema}
          onSubmit={(values) => handleSubmit(values)}
          validateOnMount
        >
          {({ submitForm }) => (
            <FormContainer>
              <Field
                component={InputForm}
                name="password"
                type="password"
                variant="standard"
                label="New Password"
              />
              <Field
                component={InputForm}
                name="confirmPassword"
                type="password"
                variant="standard"
                label="Confirm Password"
              />
              <PrimaryButton variant="contained" onClick={submitForm} size="medium">Reset Password</PrimaryButton>
            </FormContainer>
          )}
        </Formik>
      </MainContainer>
    </Main>
  );
};

export { ResetPassword };
