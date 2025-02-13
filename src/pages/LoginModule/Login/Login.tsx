import { CardContent } from '@mui/material';
import {
  Formik, Form, Field,
} from 'formik';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useGuestUser, useSyncLoginInfo, useLogin } from '../../../hooks';
import { LoginSchema } from '../../../validationsSchemas';
import { Notification, ReactHelmet } from '../../../components/UI';
import { TogglePasswordAdornment } from '../../../components/UI/TogglePasswordAdornment';
import { BrandLogoName, LoginButtons } from '../../../components/templates';
import {
  Main, LoginCard, LogoContainer,
  FormLoginTitle, FormInstructions, LoginInput, ForgotPasswordLink,
} from './Login.styled';
import { LOGIN_APP_ROUTE } from '../../RoutesConstants';
import { LOGIN_META_DESCRIPTION, LOGIN_META_TITLE } from '../../../constants';

const Login = () => {
  const location = useLocation();
  const { navigateToDashboard, verifyGuestUser } = useSyncLoginInfo();
  const { isGuestUser, userLoggedOn } = useGuestUser();
  const {
    handleSubmit, handleShowNotification, notificationInfo, notification, submitOnPressEnter, loginSuccess, loginLoading,
  } = useLogin();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const locationState = { prevPath: location.pathname };

  useEffect(() => {
    verifyGuestUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userLoggedOn === true || isGuestUser === true) {
      navigateToDashboard();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLoggedOn, isGuestUser]);

  return (
    <>
      <ReactHelmet metaTitle={LOGIN_META_TITLE} metaDescription={LOGIN_META_DESCRIPTION} completeURL={LOGIN_APP_ROUTE} />
      {notification && (
        <Notification
          title={notificationInfo.current.title}
          description={notificationInfo.current.description}
          status={notificationInfo.current.status}
          close={handleShowNotification}
        />
      )}
      <Main>
        <LogoContainer>
          <BrandLogoName isLoginPage />
        </LogoContainer>
        <LoginCard>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={(values) => handleSubmit(values)}
            validateOnMount
          >
            {({ submitForm }) => (
              <Form
                onKeyDown={(event) => {
                  submitOnPressEnter(event, submitForm);
                }}
              >
                <CardContent>
                  <FormLoginTitle variant="h2">Bienvenido de vuelta</FormLoginTitle>
                  <FormInstructions>Ingrese sus credenciales para entrar a su cuenta.</FormInstructions>
                  <Field
                    component={LoginInput}
                    name="email"
                    type="email"
                    variant="standard"
                    fullWidth
                    label="Correo electrónico"
                  />
                  <Field
                    component={LoginInput}
                    name="password"
                    type={(showPassword) ? 'text' : 'password'}
                    variant="standard"
                    fullWidth
                    label="Contraseña"
                    InputProps={{
                      endAdornment: <TogglePasswordAdornment showPassword={showPassword} toggleShowPassword={toggleShowPassword} />,
                    }}
                  />
                  <ForgotPasswordLink
                    title="¿Olvidaste tu contraseña? Iniciar proceso de recuperar contraseña"
                    to="/forgot-password"
                  >
                    ¿Olvidaste tu contraseña?
                  </ForgotPasswordLink>
                </CardContent>
                <LoginButtons
                  submitForm={submitForm}
                  cancelStateLink={locationState}
                  success={loginSuccess}
                  loading={loginLoading}
                />
              </Form>
            )}
          </Formik>
        </LoginCard>
      </Main>
    </>
  );
};

export { Login };
