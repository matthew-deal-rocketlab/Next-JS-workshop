import React, { ReactNode, useState } from 'react';
import Button from './button';
import styled, { useTheme } from 'styled-components';
import { themeStatic } from '@/theme';
import { ColorType } from '@/types';
import { useIsFirstRender } from '@/hooks/isFirstRender';

interface Props {
  showModal: boolean;
  title?: string;
  description?: string;
  successText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmButtonColor?: ColorType;
  cancelButtonColor?: ColorType;
}
const Container = styled.div<{ $showModal: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  height: ${({ $showModal }) => (!$showModal ? 0 : '100vh')};
  width: 100vw;
  background-color: rgba(0, 0, 0, 50%);
  opacity: ${({ $showModal }) => (!$showModal ? 0 : 1)};
  transition: opacity 0.1s linear;
`;
const Dialog = styled.dialog<{ $showModal: boolean }>`
  margin-top: 30vh;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 5px;
  padding: 20px;
  width: 400px;
  justify-content: space-evenly;
  @media (max-width: ${themeStatic.breakpoints.mobile}) {
    width: 80%;
  }
  height: 200px;
  display: ${({ $showModal }) => (!$showModal ? 'hidden' : 'flex')};
  flex-direction: column;
  box-shadow: 5px 5px rgba(0, 0, 0, 0.05);
  border: none;
`;
const Title = styled.h1`
  font-size: ${themeStatic.fontSizes.large};
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
  text-align: center;
`;
const Description = styled.p`
  font-size: ${themeStatic.fontSizes.medium};
  color: ${({ theme }) => theme.colors.dark};
  margin: 0;
  text-align: center;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 40px;
`;
const Modal = ({
  showModal,
  onCancel,
  title,
  description,
  successText,
  cancelText,
  onConfirm,
  confirmButtonColor,
  cancelButtonColor,
}: Props) => {
  const isFirst = useIsFirstRender();

  const theme = useTheme();

  if (isFirst) {
    return null;
  }
  return (
    <Container $showModal={showModal}>
      <Dialog open={showModal} $showModal={showModal}>
        {title && <Title>{title}</Title>}
        {description && <Description>{description}</Description>}
        <ButtonContainer>
          <Button
            variant="medium"
            onClick={onConfirm}
            bgColor={confirmButtonColor || theme.colors.primary}>
            {successText ? successText : 'Confirm'}
          </Button>
          <Button
            variant="medium"
            onClick={onCancel}
            bgColor={cancelButtonColor || theme.colors.dark}>
            {cancelText ? cancelText : 'Cancel'}
          </Button>
        </ButtonContainer>
      </Dialog>
    </Container>
  );
};

export default Modal;
