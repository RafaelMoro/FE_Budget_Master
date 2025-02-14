import { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Formik, Field,
} from 'formik';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

import { useNotification } from '../../../hooks/useNotification';
import { useForgotPasswordMutation } from '../../../redux/slices/User/actions/forgotPassword';
import { FORGOT_PASSWORD_COMPLETE_ROUTE, LOGIN_ROUTE } from '../../RoutesConstants';
import {
  ERROR_MESSAGE_GENERAL, ERROR_TITLE_GENERAL, USER_NOT_FOUND_CATCH_ERROR, SUCCESS_FORGOT_PASSWORD_DESC, SUCCESS_FORGOT_PASSWORD_TITLE,
  ERROR_MESSAGE_USER_NOT_FOUND,
  FORGOT_PASSWORD_META_TITLE,
  FORGOT_PASSWORD_META_DESCRIPTION,
} from '../../../constants';
import { GeneralError, MockedError } from '../../../globalInterface';
import { ForgotPasswordValues } from './interface';
import { SystemStateEnum } from '../../../enums';
import { ForgotPasswordSchema } from '../../../validationsSchemas/login.schema';
import { ActionButtonPanel } from '../../../components/templates';
import { Notification, ReactHelmet } from '../../../components/UI';
import {
  Main, MainContainer, FormContainer, FormTitle, FormDescription,
} from './ForgotPassword.styled';
import {
  InputForm, SecondaryButton,
} from '../../../styles';

const createAccountButton: EmotionJSX.Element = <SecondaryButton variant="contained" size="medium">Crear cuenta</SecondaryButton>;

const ForgotPassword = (): ReactElement => {
  const navigate = useNavigate();
  const {
    showNotification, hideNotification, notificationInfo,
    updateTitle, updateDescription, updateStatus, notification,
  } = useNotification({
    title: SUCCESS_FORGOT_PASSWORD_TITLE,
    description: SUCCESS_FORGOT_PASSWORD_DESC,
    status: SystemStateEnum.Success,
  });
  const [forgotPasswordMutation, { isLoading, isSuccess }] = useForgotPasswordMutation();
  const [userNotFound, setUserNotFound] = useState<boolean>(false);
  const toggleUserNotFound = () => setUserNotFound(!userNotFound);

  const handleSubmit = async (values: ForgotPasswordValues) => {
    try {
      await forgotPasswordMutation({ values }).unwrap();

      // Reset notification title, description and status.
      if (notificationInfo.current.title !== SUCCESS_FORGOT_PASSWORD_TITLE) {
        updateTitle(SUCCESS_FORGOT_PASSWORD_TITLE);
        updateDescription(SUCCESS_FORGOT_PASSWORD_DESC);
        updateStatus(SystemStateEnum.Success);
      }

      showNotification();
      setTimeout(() => {
        navigate(LOGIN_ROUTE);
      }, 5000);
    } catch (err) {
      const error = err as GeneralError;
      const message = error?.data?.error?.message;

      if (message === USER_NOT_FOUND_CATCH_ERROR) {
        toggleUserNotFound();
        updateTitle('Oops!');
        updateDescription(ERROR_MESSAGE_USER_NOT_FOUND);
        updateStatus(SystemStateEnum.Info);
        showNotification();
        return;
      }

      updateTitle(ERROR_TITLE_GENERAL);
      updateDescription(ERROR_MESSAGE_GENERAL);
      updateStatus(SystemStateEnum.Error);

      showNotification();
    }
  };

  return (
    <>
      <ReactHelmet
        metaTitle={FORGOT_PASSWORD_META_TITLE}
        metaDescription={FORGOT_PASSWORD_META_DESCRIPTION}
        completeURL={FORGOT_PASSWORD_COMPLETE_ROUTE}
      />
      {notification && (
      <Notification
        title={notificationInfo.current.title}
        description={notificationInfo.current.description}
        status={notificationInfo.current.status}
        close={hideNotification}
        UIElement={
          userNotFound
            ? createAccountButton
            : null
        }
      />
      )}
      <Main>
        <MainContainer>
          <FormTitle variant="h1">¿Olvidaste tu contraseña? Recuperémosla juntos</FormTitle>
          <FormDescription>
            Ingrese su correo electrónico y le enviaremos las instrucciones para recuperar su contraseña.
          </FormDescription>
          <Formik
            initialValues={{ email: '' }}
            validationSchema={ForgotPasswordSchema}
            onSubmit={(values) => handleSubmit(values)}
            validateOnMount
          >
            {({ submitForm }) => (
              <FormContainer>
                <Field
                  component={InputForm}
                  name="email"
                  type="email"
                  variant="standard"
                  label="Correo Electrónico"
                />
                <ActionButtonPanel
                  routeCancelButton={LOGIN_ROUTE}
                  minWidthNumber="11.5"
                  submitButtonText="Enviar"
                  actionDataTestId="forgot-password-button"
                  loading={isLoading}
                  success={isSuccess}
                  disableSubmitButton={(isLoading || isSuccess)}
                  submitForm={submitForm}
                />
              </FormContainer>
            )}
          </Formik>
        </MainContainer>
      </Main>
    </>
  );
};

export { ForgotPassword };
