import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

import { PrimaryButton } from '../../../../../styles';
import { NotRecordsFoundPicture } from './NoRecordsFound.styled';
import noRecordsFoundImgWebp from '../../../../../assets/no_records_found_webp.webp';
import noRecordsFoundImgPng from '../../../../../assets/no_records_found_png.png';
import { CREATE_RECORD_ROUTE } from '../../../../../pages/RoutesConstants';
import { NoRecordsFoundContainer } from '../Features.styled';

const NoRecordsFound = () => {
  const navigate = useNavigate();
  const navigateToCreateRecord = () => navigate(CREATE_RECORD_ROUTE);
  return (
    <NoRecordsFoundContainer>
      <NotRecordsFoundPicture>
        <source srcSet={noRecordsFoundImgWebp} type="image/webp" />
        <img src={noRecordsFoundImgPng} alt="No Records Found" />
      </NotRecordsFoundPicture>
      <Typography align="center" variant="body2">
        No has creado transacciones para este mes.
      </Typography>
      <PrimaryButton onClick={navigateToCreateRecord}>Crear registro</PrimaryButton>
    </NoRecordsFoundContainer>
  );
};

export { NoRecordsFound };
