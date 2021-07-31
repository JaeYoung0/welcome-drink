import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const Container = styled.main`
  width: 100vw;
  height: 100%;
  overflow-x: hidden;
  background-color: #ddb7b6;
`;

const navHeight = "10";

export const NavBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 12rem;

  img {
    width: 10rem;
  }
`;
