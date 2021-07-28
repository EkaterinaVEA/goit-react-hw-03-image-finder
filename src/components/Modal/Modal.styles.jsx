import styled from '@emotion/styled/macro';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`;
export const ModalStyled = styled.div`
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);
`;

export const Image = styled.img`
  object-fit: cover;
`;

export const CloseBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 10px;
  border: none;
  cursor: pointer;
  color: #fff;
  background-color: transparent;
  transition: transform 250ms ease-out, color 250ms ease-in-out;
  &:hover {
    transform: scale(1.2);
  }
`;
