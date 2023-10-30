import styled from '@emotion/styled';

export const NotRecordsFoundPicture = styled.picture`
  display: flex;
  justify-content: center;

  img {
    width: 30.9rem;
    height: 20.6rem;
    object-fit: contain;

    @media(min-width: 1024px) {
      width: 45.7rem;
      height: 30.7rem;
    }
  }
`;
