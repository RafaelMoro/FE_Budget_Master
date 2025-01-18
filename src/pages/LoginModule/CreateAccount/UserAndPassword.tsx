import { useState } from 'react';
import { Field, Formik } from 'formik';

import { AnimateBox } from '../../../animations/AnimateBox';
import { UserAndPasswordProps } from './interface';
import { UserAndPasswordSchema } from '../../../validationsSchemas/login.schema';
import { TogglePasswordAdornment } from '../../../components/UI/TogglePasswordAdornment';
import { InputForm, PrimaryButton, CancelButton } from '../../../styles';
import { FormContainer, FormActionButtons } from '../../../styles/LoginModule.styled';

const initialValuesUserAndPassword = {
  email: '',
  password: '',
  confirmPassword: '',
};

const UserAndPassword = ({
  goBack, goNext, counterView, direction,
}: UserAndPasswordProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  if (counterView !== 1) return null;
  return (
    <Formik
      initialValues={initialValuesUserAndPassword}
      validationSchema={UserAndPasswordSchema}
      onSubmit={(values) => goNext({ data: values, skipUpdateData: false, shouldSubmitForm: true })}
      validateOnMount
    >
      {({ submitForm }) => (
        <AnimateBox direction={direction}>
          <FormContainer>
            <Field
              component={InputForm}
              name="email"
              type="email"
              variant="standard"
              label="Correo Electrónico"
            />
            <Field
              component={InputForm}
              data-testid="password-input"
              name="password"
              type={(showPassword) ? 'text' : 'password'}
              variant="standard"
              label="Contraseña"
              InputProps={{
                endAdornment: <TogglePasswordAdornment showPassword={showPassword} toggleShowPassword={toggleShowPassword} />,
              }}
            />
            <Field
              component={InputForm}
              name="confirmPassword"
              data-testid="confirm-password-input"
              type={(showPassword) ? 'text' : 'password'}
              variant="standard"
              label="Confirmar Contraseña"
              InputProps={{
                endAdornment: <TogglePasswordAdornment showPassword={showPassword} toggleShowPassword={toggleShowPassword} />,
              }}
            />
            <FormActionButtons>
              <CancelButton variant="contained" onClick={goBack} size="medium">Regresar</CancelButton>
              <PrimaryButton variant="contained" onClick={submitForm} size="medium">Crear Cuenta</PrimaryButton>
            </FormActionButtons>
          </FormContainer>
        </AnimateBox>
      )}
    </Formik>
  );
};

export { UserAndPassword };
