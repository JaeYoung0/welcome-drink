/* eslint-disable @next/next/no-img-element */
import Layout from "src/layouts";
import FreeBreakfastIcon from "@material-ui/icons/FreeBreakfast";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { connectToDatabase } from "@lib/mongodb";
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { useEffect, useRef, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import parser from "ua-parser-js";

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

const MenuWrapper = styled.div`
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
`;

const Menus = styled.ul`
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
    padding: 15px;
    display: flex;
    align-items: center;
  }

  li span {
    font-size: 1.5rem;
    font-weight: bold;
    &:hover {
      color: #c3817f;
    }
  }

  li svg {
    font-size: 2rem;
    margin-left: 2rem;
  }
`;

const BottomIcons = styled.div`
  svg {
    font-size: 3rem;
    margin: 0 10px;
  }
  padding: 3rem;
`;

interface Props {
  coffees: {
    _id: number | string;
    name: string;
    // date: string;
  }[];
}

export default function Home({ coffees }: Props) {
  const [menu, setMenu] = useState("");
  const [editMode, setEditMode] = useState(false);
  const router = useRouter();
  const [addedMenu, setAddedMenu] = useState("");
  const target = useRef<string[]>([]);

  useEffect(() => {
    if (!menu) return;
    alert(`${menu} 주문이 완료되었습니다.`);
    router.push("/orders");
    setMenu("");
  }, [menu]);

  useEffect(() => {
    if (!addedMenu) return;
    axios
      .post("/api/db/insertOneToMongo", {
        payload: {
          name: addedMenu,
        },
        collection: "coffees",
      })
      .then(() => router.reload());
    setAddedMenu("");
  }, [addedMenu]);

  return (
    <Layout>
      <Container>
        <h1>Welcome Drink</h1>
        <MenuWrapper>
          <img src='/images/elegant_top.png' alt='cover' />
          <Menus>
            {coffees.map((coffee, idx) => (
              <>
                <li
                  style={{ cursor: "pointer", listStyle: "none" }}
                  key={coffee._id}
                  value={coffee.name}
                >
                  <span
                    ref={(el) => {
                      if (!el) return;
                      target.current[idx] = el?.innerText;
                    }}
                    onClick={(e) => {
                      const selectedMenu = e.currentTarget.innerText;
                      if (confirm(`${selectedMenu}로 하실래요?`)) {
                        try {
                          axios
                            .post("/api/db/insertOneToMongo", {
                              collection: "orders",
                              payload: {
                                name: selectedMenu,
                                date: new Date().toLocaleString(),
                                device_model: parser(window.navigator.userAgent)
                                  .device.model,
                              },
                            })
                            .then((res) => {
                              setMenu(res.data.name);
                            });
                        } catch (error) {
                          console.error(error);
                        }
                      }
                    }}
                  >
                    {coffee.name}
                  </span>
                  {editMode && (
                    <DeleteForeverIcon
                      onClick={() => {
                        if (
                          confirm(
                            `${target.current[idx]} - 메뉴에서 삭제하시겠습니까?`
                          )
                        ) {
                          try {
                            axios
                              .delete("api/db/deleteOne", {
                                data: {
                                  collection: "coffees",
                                  payload: {
                                    name: target.current[idx],
                                  },
                                },
                              })
                              .then(() => router.reload());
                          } catch (error) {
                            console.error(error);
                          }
                        }
                      }}
                      style={{ color: "red" }}
                    />
                  )}
                </li>
              </>
            ))}

            {editMode && (
              <AddIcon
                style={{ color: "gray", fontSize: "4rem" }}
                onClick={() => {
                  const newMenu = prompt("메뉴 이름을 적어주세요.");
                  if (!newMenu) return;
                  setAddedMenu(newMenu);
                }}
              />
            )}
          </Menus>

          <img src='/images/elegant_top.png' alt='cover' />
        </MenuWrapper>
        <BottomIcons>
          <FreeBreakfastIcon
            style={{ color: editMode ? "red" : "black" }}
            onClick={() => setEditMode(!editMode)}
          />
          <QueryBuilderIcon onClick={() => router.push("/orders")} />
        </BottomIcons>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps() {
  const { db } = await connectToDatabase();

  const coffees = await db
    .collection("coffees")
    .find({})
    .sort({ name: 1 })
    .limit(20)
    .toArray();

  return {
    props: {
      coffees: JSON.parse(JSON.stringify(coffees)),
    },
  };
}
