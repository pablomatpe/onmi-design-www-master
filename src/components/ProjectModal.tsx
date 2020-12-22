import { useState, useEffect, useCallback } from "react";
import styled, { createGlobalStyle, css } from "styled-components";

import { motion, AnimatePresence } from "framer-motion";

import { CloseIcon } from "@/components/CloseIcon";
import { media } from "@/theme";

interface Props {
  isVisible: boolean;
  onCloseClick: () => void;
  src: string;
  title: string;
}

const GlobalStyles = createGlobalStyle`
  html, body {
    overflow: hidden;
  }
`;

const ModalWrap = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  padding: 50px 82px 20px;
  z-index: 3;
  overflow: scroll;
  -webkit-overflow-scrolling: smooth;

  ${media.tablet`
    padding: 40px 42px 16px;
  `}

  ${media.mobile`
    padding: 40px 0 0;
  `}
`;

const Modal = styled(motion.div)<{ isLoading: boolean }>`
  width: 1400px;
  max-width: 100%;
  height: 100%;
  background: white;
  margin: 0 auto;
  position: relative;

  &::after {
    content: "Cargando...";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.colors.light};
    color: ${({ theme }) => theme.colors.dark};
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s ease, visibility 0.2s ease;
    will-change: opacity, visibility;
    z-index: 1;
  }

  ${({ isLoading }) =>
    isLoading &&
    css`
      &::after {
        opacity: 1;
        visibility: visible;
      }
    `}
`;

const Iframe = styled.iframe`
  border: 0;
`;

const CloseButton = styled.button`
  background: transparent;
  appearance: none;
  border: 0;
  position: fixed;
  right: 28px;
  top: 28px;
  padding: 8px;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s ease;
  will-change: opacity;

  &:hover {
    opacity: 1;
  }

  ${media.tablet`
    top: 12px;
    right: 12px;
  `}

  ${media.mobile`
    top: 6px;
    right: 6px;
  `}
`;

const modalWrapVariants = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

const modalBodyVariants = {
  initial: { y: "40px" },
  enter: { y: "0", transition: { duration: 0.35 } },
  exit: { y: "20px", transition: { duration: 0.35 } }
};

export const ProjectModal: React.FC<Props> = ({
  isVisible,
  onCloseClick,
  src,
  title
}) => {
  const [isIframeLoading, setIsIframeLoading] = useState(true);

  const onIframeLoad = useCallback((): void => {
    setIsIframeLoading(false);
  }, []);

  useEffect(() => {
    setIsIframeLoading(!!src);
  }, [src]);

  return (
    <>
      {isVisible && <GlobalStyles />}

      <AnimatePresence>
        {isVisible && (
          <ModalWrap
            variants={modalWrapVariants}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            <CloseButton onClick={onCloseClick}>
              <CloseIcon />
            </CloseButton>

            <Modal variants={modalBodyVariants} isLoading={isIframeLoading}>
              <Iframe
                title={title}
                src={src}
                width="100%"
                height="100%"
                onLoad={onIframeLoad}
              />
            </Modal>
          </ModalWrap>
        )}
      </AnimatePresence>
    </>
  );
};
