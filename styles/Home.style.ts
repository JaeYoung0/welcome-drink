import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/react";

export const flicker = keyframes`
 0%, 18%, 22%, 25%, 53%, 57%, 100% {
    text-shadow:
      0 0 4px #fff,
      0 0 11px #fff,
      0 0 19px #fff,
      0 0 40px #e83e8c,
      0 0 80px #e83e8c,
      0 0 90px #e83e8c,
      0 0 100px #e83e8c,
      0 0 150px #e83e8c;
  }
  20%, 24%, 55% {       
    text-shadow: none;
  }
`;

export const fadeIn = keyframes`
 from {
    transform: translateY(10px);
    opacity: 0;

  }
  to {
    transform: translateY(0px);
    opacity: 1;
  }
`;

export const Title = styled.div`
  text-align: center;
  h1 {
    white-space: pre;
    font-size: 6rem;
    color: black;
  }

  strong {
    display: block;
    font-size: 1.25rem;
    animation: ${fadeIn} 1s ease-in-out;
  }

  h1 + strong {
    margin-top: 2rem;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100vh;
`;

export const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    color: whitesmoke;
    font-size: 2rem;
  }

  img:nth-of-type(1) {
    width: 60%;
    margin-top: 3rem;
  }

  img:nth-of-type(2) {
    width: 60%;
    transform: rotate(180deg);
    margin-bottom: 2rem;
  }

  @media (min-width: 1024px) {
    img {
      max-width: 360px;
    }
  }
`;

export const Menus = styled.ul`
  width: 90vw;
  border-radius: 25px;
  margin: 2rem 0;
  padding: 1.5rem;
  border: 1px solid black;

  > svg {
    width: 100%;
    text-align: center;
    border: 1px dashed gray;
  }
  li {
    opacity: 0;
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: ${fadeIn} 1s ease-in-out forwards;
    animation-delay: 1s;
  }

  li span {
    font-size: 1.5rem;
    font-weight: bold;
    &:hover {
      /* color: #c3817f; */
    }
  }

  li svg {
    font-size: 2rem;
    margin-left: 2rem;
  }

  @media (min-width: 1024px) {
    max-width: 700px;
  }
`;

export const BottomIcons = styled.div`
  svg {
    font-size: 3rem;
    margin: 0 10px;
  }
  padding: 3rem;
`;
