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
import { css, keyframes } from "@emotion/react";
import parser from "ua-parser-js";

import Loading from "@svgs/Loading";

const fadeIn = keyframes`
 from {
    transform: translateY(10px);
    opacity: 0;

  }
  to {
    transform: translateY(0px);
    opacity: 1;
  }
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

  strong {
    font-size: 1.25rem;
    margin-top: 2rem;
    /* color: #e83e8c; */
    color: #000000;
    /* opacity: 0.6; */
    animation: ${fadeIn} 1s ease-in-out;
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

  @media (min-width: 1024px) {
    img {
      max-width: 360px;
    }
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

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!menu) return;
    setIsLoading(false);
    alert(`${menu} 주문이 완료되었습니다.`);
    router.push("/orders");
    setMenu("");
  }, [menu]);

  useEffect(() => {
    if (!addedMenu) return;
    try {
      setEditMode(false);
      setIsLoading(true);
      axios
        .post("/api/db/insertOneToMongo", {
          payload: {
            name: addedMenu,
          },
          collection: "coffees",
        })
        .then(() => {
          setIsLoading(false);
          alert(`${addedMenu}가 메뉴에 추가되었습니다.`);
          setAddedMenu("");
          router.reload();
        });
    } catch (error) {
      console.error(error);
    }
  }, [addedMenu]);

  return (
    <Layout>
      <Container>
        <h1>Welcome Drink</h1>
        <strong>메뉴를 터치해주세요</strong>
        {isLoading && <Loading />}

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

                      if (confirm(`"${selectedMenu}"로 하실래요?`)) {
                        const device_model = parser(window.navigator.userAgent)
                          .device.model;

                        try {
                          setIsLoading(true);
                          axios
                            .post("/api/db/insertOneToMongo", {
                              collection: "orders",
                              payload: {
                                name: selectedMenu,
                                date: new Date().toLocaleString(),
                                device_model,
                              },
                            })
                            .then((res) => {
                              setMenu(res.data.name);
                            });
                          axios.post("/api/db/sendSMS", {
                            payload: {
                              name: selectedMenu,
                              device_model,
                            },
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
                        const willDeletedMenu = target.current[idx];
                        if (
                          confirm(
                            `${willDeletedMenu} - 메뉴에서 삭제하시겠습니까?`
                          )
                        ) {
                          try {
                            setEditMode(false);
                            setIsLoading(true);
                            axios
                              .delete("api/db/deleteOne", {
                                data: {
                                  collection: "coffees",
                                  payload: {
                                    name: willDeletedMenu,
                                  },
                                },
                              })
                              .then(() => {
                                alert(
                                  `${willDeletedMenu}가 메뉴에서 삭제되었습니다.`
                                );
                                setIsLoading(false);
                                router.reload();
                              });
                          } catch (error) {
                            console.error(error);
                          }
                        }
                      }}
                      style={{ color: "#e83e8c" }}
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
            style={{ color: editMode ? "#e83e8c" : "black" }}
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
