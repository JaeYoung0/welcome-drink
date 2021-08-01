import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { connectToDatabase } from "../lib/mongodb";
import Layout from "src/layouts";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

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
  padding: 1.5rem;
  border: 1px solid black;

  div {
    margin-bottom: 20px;
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
    padding: 15px;
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

  useEffect(() => {
    if (!menu) return;
    alert("제조 완료되어 주문목록에서 삭제되었습니다.");
    router.reload();
    setMenu("");
  }, [menu]);

  return (
    <Layout>
      <Container>
        <h1>Order List</h1>
        <OrderLists>
          {orders.length === 0 && <h2>주문 내역이 없습니다.</h2>}
          {orders.map((coffee, idx) => (
            <div key={coffee._id}>
              <li
                style={{ cursor: "pointer" }}
                value={coffee.name}
                onClick={async (e) => {
                  const selectedMenu = e.currentTarget.innerText;
                  if (confirm(`${selectedMenu} 제조 완료되었나요?`)) {
                    try {
                      axios
                        .delete("/api/db/deleteOne", {
                          data: {
                            collection: "orders",
                            payload: {
                              name: selectedMenu,
                            },
                          },
                        })
                        .then((res) => setMenu(res.data.name));
                    } catch (error) {
                      console.error(error);
                    }
                  }
                }}
              >
                <h2>{coffee.name}</h2>
              </li>
              <span style={{ color: "#222222", opacity: 0.75 }}>
                {coffee?.date}
                {coffee?.device_model ? `, ${coffee?.device_model}` : ""}
              </span>
            </div>
          ))}
        </OrderLists>
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
