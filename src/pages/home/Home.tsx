import React from "react";
import Layout from "src/layouts";
import * as S from "./Home.style";
// import { AccessAlarm, ThreeDRotation } from '@material-ui/icons'
import FreeBreakfastIcon from "@material-ui/icons/FreeBreakfast";
// import Layout from '@layouts/'

function Home({ coffees }) {
  console.log("@@coffees", coffees);

  return (
    <Layout>
      <S.Container>
        <h1>Welcome Drink</h1>
      </S.Container>
    </Layout>
  );
}

export default Home;
