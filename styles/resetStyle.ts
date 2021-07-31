import { css } from "@emotion/react";

const isSmallMobile = `min-width: 320px`;
const isMobile = `min-width: 375px`;
const isTablet = `min-width: 800px`;
const isDesktop = `min-width: 1024px`;

// 눈누에서 가져온 font-face
export const resetStyle = css`
  @font-face {
    font-family: "Cafe24SsurroundAir";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2105_2@1.0/Cafe24SsurroundAir.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: "NanumBarunGothic";
    font-style: normal;
    font-weight: 400;
    src: url("//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.eot");
    src: url("//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.eot?#iefix")
        format("embedded-opentype"),
      url("//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.woff")
        format("woff"),
      url("//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.ttf")
        format("truetype");
  }

  @font-face {
    font-family: "SlowSlow";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_10@1.0/SlowSlow.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }

  * {
    box-sizing: border-box;
  }

  /* TODO. reset css 검색해서 괜찮은거 붙이자! */
  html {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    font-size: 10px;
    font-family: Helvetica, sans-serif, NanumBarunGothic;

    @media (${isSmallMobile}) {
      font-size: 8px;
    }

    @media (${isMobile}) {
      font-size: 10px;
    }

    @media (${isTablet}) {
      font-size: 12px;
    }

    @media (${isDesktop}) {
      font-size: 14px;
    }
  }
  body,
  strong,
  span,
  h1,
  h2,
  h3,
  h4,
  b {
    padding: 0;
    margin: 0;
    /* font-family: SF Pro Display, NotoSansCJKkr; */
  }

  button {
    border: none;
    outline: none;
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }
`;
