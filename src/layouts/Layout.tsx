/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/dist/client/router";
import React from "react";
import * as S from "./Layout.style";

function Layout({ children }: { children: React.ReactChild }) {
  const router = useRouter();
  return (
    <S.Container>
      <S.NavBar>
        <img
          onClick={() => router.push("/")}
          src='/images/logo.png'
          alt='logo'
        />
      </S.NavBar>
      {children}
    </S.Container>
  );
}

export default Layout;
