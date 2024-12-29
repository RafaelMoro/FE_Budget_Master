import { useState } from 'react';
import {
  Dialog,
  Typography,
} from '@mui/material';
import { useLocation } from 'react-router-dom';

import { useLogin } from '../../../../../hooks';
import { BUDGET_MASTER_LANDING } from '../../../../../constants';
import { LOGIN_ROUTE, REGISTER_ROUTE } from '../../../../../pages/RoutesConstants';
import { AppIcon } from '../../../../UI/Icons';
import {
  AnchorButton, CancelButton, FlexContainer, PrimaryButton, SecondaryButton,
} from '../../../../../styles';
import { CloseModalBox, GuestUserModalBox, GuestUserModalTitle } from '../../Header.styled';

interface GuestUserModalProps {
  open: boolean;
  onClose: () => void;
}

const GuestUserModal = ({ open, onClose }: GuestUserModalProps) => {
  const location = useLocation();
  const { resetUserGuestLocalStorage } = useLogin();
  const [showEraseData, setShowEraseData] = useState<boolean>(false);

  const toggleShowEraseData = () => setShowEraseData((prevState) => !prevState);
  const handleConfirmEraseData = () => {
    resetUserGuestLocalStorage();
    window.location.replace(BUDGET_MASTER_LANDING);
  };

  // Save current pathname in state. When navigates to register, cancel will return into dashboard or home
  const locationState = { prevPath: location.pathname };

  return (
    <Dialog onClose={onClose} open={open}>
      {
        (!showEraseData) && (
          <GuestUserModalBox>
            <GuestUserModalTitle variant="h3">Secure your data</GuestUserModalTitle>
            <CloseModalBox onClick={onClose}>
              <AppIcon icon="Close" />
            </CloseModalBox>
            <Typography>Save your progress by creating an account or continue your journey by signing in</Typography>
            <FlexContainer gap={3} justifyContent="space-between">
              <CancelButton onClick={toggleShowEraseData}>
                Erase data
              </CancelButton>
              <FlexContainer gap={3}>
                <AnchorButton to={LOGIN_ROUTE}>
                  <SecondaryButton variant="contained" size="medium">Log in</SecondaryButton>
                </AnchorButton>
                <AnchorButton to={REGISTER_ROUTE} state={locationState}>
                  <PrimaryButton variant="contained" size="medium">Register</PrimaryButton>
                </AnchorButton>
              </FlexContainer>
            </FlexContainer>
          </GuestUserModalBox>
        )
      }
      {
        (showEraseData) && (
          <GuestUserModalBox>
            <GuestUserModalTitle variant="h3">Are you sure to erase your data?</GuestUserModalTitle>
            <CloseModalBox onClick={onClose}>
              <AppIcon icon="Close" />
            </CloseModalBox>
            <Typography>There&apos;s no way to recover your data if you erase it. Are you sure you want to erase your data?</Typography>
            <FlexContainer gap={3} justifyContent="space-between">
              <SecondaryButton onClick={toggleShowEraseData}>
                Cancel
              </SecondaryButton>
              <CancelButton onClick={handleConfirmEraseData}>
                Confirm erasing data
              </CancelButton>
            </FlexContainer>
          </GuestUserModalBox>
        )
      }
    </Dialog>
  );
};

export { GuestUserModal };
