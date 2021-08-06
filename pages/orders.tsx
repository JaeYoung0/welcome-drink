import axios from "axios";

import { useEffect, useState, ChangeEvent } from "react";
import { connectToDatabase } from "../lib/mongodb";
import Layout from "src/layouts";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Loading from "@svgs/Loading";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DoneAllIcon from "@material-ui/icons/DoneAll";

import { useRouter } from "next/router";
import { useRef } from "react";
import useModal from "@hooks/useModal";

const BottomIcons = styled.div`
  svg {
    font-size: 3rem;
    margin: 0 10px;
  }
  padding: 3rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100vh;

  h1 {
    text-align: center;
    font-size: 6rem;
  }
`;

const OrderLists = styled.ol`
  width: 90vw;
  border-radius: 25px;
  margin: 2rem 0;
  padding: 3rem 1.5rem 1.5rem 1.5rem;
  border: 1px solid black;

  input[type="checkbox"] {
    display: none;
  }

  div {
    /* margin-bottom: 20px; */
  }

  > svg {
    width: 100%;
    text-align: center;
    border: 1px dashed gray;
  }
  li {
    padding: 15px 15px 8px 15px;
    display: flex;
    align-items: center;
  }

  li span {
    font-size: 1.5rem;
    font-weight: bold;
  }

  li svg {
    font-size: 2rem;
    margin-left: 2rem;
  }

  span {
    padding: 0px 15px 15px 15px;
  }
`;

interface Props {
  orders: {
    _id: number | string;
    name: string;
    date: string;
    device_model?: string;
  }[];
}

export default function Orders({ orders }: Props) {
  const [menu, setMenu] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [checkedItem, setcheckedItem] = useState<any[]>([]);

  const { openCustomModal } = useModal();

  useEffect(() => {
    if (!menu) return;
    setIsLoading(false);
    // openCustomModal("삭제를 완료했습니다.");
    router.reload();
    setcheckedItem([]);
    setMenu("");
  }, [menu]);

  useEffect(() => {
    console.log("@@!!checkedItem", checkedItem);
  }, [checkedItem]);

  return (
    <Layout>
      <Container>
        {isLoading && <Loading />}
        <h1>Order List</h1>
        <OrderLists style={{ maxWidth: "700px" }}>
          {orders.length === 0 && (
            <h2
              style={{
                textAlign: "center",
                paddingBottom: "15px",
                opacity: 0.7,
              }}
            >
              주문 내역이 없습니다.
            </h2>
          )}
          {orders.map((coffee, idx) => (
            <div key={coffee._id}>
              <FormControlLabel
                value='start'
                control={
                  <Checkbox
                    checked={checkedItem.includes(coffee.name)}
                    style={{
                      color: "#e83e8c",
                      marginRight: "-20px",
                    }}
                    name={coffee.name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      if (checkedItem.includes(e.target.name))
                        return setcheckedItem(
                          checkedItem.filter((item) => item !== e.target.name)
                        );
                      setcheckedItem([...checkedItem, e.target.name]);
                    }}
                  />
                }
                label={
                  <div>
                    <h2>{coffee.name}</h2>
                    <span
                      style={{ color: "#222222", opacity: 0.75, padding: 0 }}
                    >
                      {coffee?.date}
                      {coffee?.device_model ? `, ${coffee?.device_model}` : ""}
                    </span>
                  </div>
                }
                labelPlacement='end'
              />
            </div>
          ))}
        </OrderLists>
        <BottomIcons>
          <DoneAllIcon
            onClick={() => {
              checkedItem.length >= orders.length
                ? setcheckedItem([])
                : setcheckedItem(orders.map((item) => item.name));
            }}
          />
          <DeleteSweepIcon
            onClick={async () => {
              if (checkedItem.length === 0)
                return alert("삭제할 목록을 선택해주세요.");

              const isConfirmed = await openCustomModal(
                `선택하신 주문목록을 삭제하시겠습니까? `
              );
              if (isConfirmed) {
                const relatedObj = checkedItem.reduce(
                  (prev, curr) => [...prev, { name: curr }],
                  []
                );

                try {
                  await axios.delete("api/db/deleteMany", {
                    data: {
                      collection: "orders",
                      payload: { $or: relatedObj },
                    },
                  });

                  // openCustomModal("삭제를 완료했습니다.");
                  router.reload();
                  setcheckedItem([]);
                } catch (error) {
                  console.error(error);
                }
              }
            }}
          />
        </BottomIcons>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps() {
  const { db } = await connectToDatabase();

  const orders = await db
    .collection("orders")
    .find({})
    .sort({ date: 1 })
    .limit(20)
    .toArray();

  return {
    props: {
      orders: JSON.parse(JSON.stringify(orders)),
    },
  };
}
